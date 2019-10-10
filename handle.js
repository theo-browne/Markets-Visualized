const { parse, sectorValue, pieData, marketData } = require("./parse")
const raw = require("./companies2")

const handleClick = (d) => {
    if (d.data["sector"]) {
        fetch(`https://financialmodelingprep.com/api/v3/company/profile/${d.data["symbol"]}`, {
            method: 'GET'
        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            set(d, json)
            chart(d, d.data["sector"])
        });
    } else {
        let sector
        if (d.data["type"]) {
            sector = d.data["name"]
        } else {
            sector = "S&P"
        } 
        clear(d)
       chart(d, sector)
    }
}

const set = (d, json) => {
    let value = "";
    for (let i = 0; i < json["profile"]["mktCap"].length - 3; i++) {
        if (i % 3 === 0 && i) {
            value += ","
        }
        value += json["profile"]["mktCap"][i]

    }
    let marketShare = d.data["value"] / sectorValue(raw, d.data["sector"])
    marketShare = parseFloat(marketShare).toFixed(6).slice(2, 4) + "." + parseFloat(marketShare).toFixed(6).slice(4) + "%"
    if (marketShare[0] == "0") marketShare = marketShare.slice(1)
    document.querySelector(".description").textContent = json["profile"]["description"]
    document.querySelector(".logo")["src"] = json["profile"]["image"]
    document.querySelector(".value").textContent = "Company Value: $" + value
    document.querySelector(".beta").textContent = "Market Beta: " + json["profile"]["beta"]
    document.querySelector(".ceo").textContent = "CEO: " + json["profile"]["ceo"]
    document.querySelector(".market-share").textContent = "Market Share: " + marketShare
    document.querySelector(".sector").textContent = "Sector: " +  d.data["sector"] 
    document.querySelector(".company").textContent = "Company: " +  d.data["name"] 
}

const chart = (d, sector) => {
    let ctx = document.getElementById("donut").getContext("2d")
    // const ctx = 'donut'
    console.log(ctx["chart"])
    Chart.defaults.global.legend.display = false
    let pie = (sector === "S&P") ? marketData(raw, sector) : pieData(raw, sector)
    if(ctx["chart"]){
        ctx["chart"].data = pie
        ctx["chart"].update()
    } else {
        const doughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: pie
        });
        ctx["chart"] = doughnutChart
    }
    
}

const clear = (d) => {
    document.querySelector(".sector").textContent = d.data.name
    document.querySelector(".description").textContent = ""
    document.querySelector(".ceo").textContent = ""
    document.querySelector(".beta").textContent = ""
    document.querySelector(".value").textContent = ""
    document.querySelector(".logo")["src"] = ""
    document.querySelector(".company").textContent = ""
}

module.exports = handleClick

// function(d) {
//     if (d.data["sector"]) {
//         document.querySelector(".sector").textContent = d.data["sector"] + ": " + d.data.name
//         fetch(`https://financialmodelingprep.com/api/v3/company/profile/${d.data["symbol"]}`, {
//             method: 'GET'
//         }).then(function (res) {
//             return res.json();
//         }).then(function (json) {
//             

//             document.querySelector(".description").textContent = json["profile"]["description"]
//             document.querySelector(".logo")["src"] = json["profile"]["image"]
//             let value = "";
//             for (let i = 0; i < json["profile"]["mktCap"].length - 3; i++) {
//                 if (i % 3 === 0 && i) {
//                     value += ","
//                 }
//                 value += json["profile"]["mktCap"][i]

//             }

//             let marketShare = d.data["value"] / sectorValue(raw, d.data["sector"])
//             const ctx = 'donut'
//             Chart.defaults.global.legend.display = false
//             let pie = pieData(raw, d.data["sector"])
//             var doughnutChart = new Chart(ctx, {
//                 type: 'pie',
//                 data: pie
//             });
//             document.querySelector(".value").textContent = "Company Value: $" + value
//             document.querySelector(".beta").textContent = "Market Beta: " + json["profile"]["beta"]
//             document.querySelector(".ceo").textContent = "CEO: " + json["profile"]["ceo"]
//             document.querySelector(".ceo").textContent = "Market Share: " + marketShare

//         });
//         let query = d.data["name"].split(" ").filter(el => el !== "Co." && el !== "Cos.").map(el => {
//             let newEl = ''
//             for (let i = 0; i < el.length; i++) {
//                 if (el[i] === "&") {
//                     newEl += '%26'
//                 } else {
//                     newEl += el[i]
//                 }
//             }
//             return newEl
//         }).join("+")
//     } else {
//         document.querySelector(".sector").textContent = d.data.name
//         document.querySelector(".description").textContent = ""
//         document.querySelector(".ceo").textContent = ""
//         document.querySelector(".beta").textContent = ""
//         document.querySelector(".value").textContent = ""
//         document.querySelector(".logo")["src"] = ""
//     }

// }