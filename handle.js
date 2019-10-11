const { parse, sectorValue, pieData, marketData } = require("./parse")
const raw = require("./companies2")

const handleClick = (d) => {
    if (d.data["sector"]) {
        dataCall(d.data["symbol"], d)
    } else {
        let sector
        if (d.data["type"]) {
            sector = d.data["name"]
        } else {
            sector = "S&P"
        } 
        clear(d)
       chart(sector)
    }
}
const dataCall = (symbol, d) => {
    fetch(`https://financialmodelingprep.com/api/v3/company/profile/${symbol}`, {
        method: 'GET'
    }).then(function (res) {
        return res.json();
    }).then(function (json) {
        set(d, json)
        chart(d.data["sector"])
    });
}

const set = (d, json) => {
    let value = [];
    let mkt = json["profile"]["mktCap"].split("").reverse().slice(3)
    for (let i = 0; i < mkt.length ; i++) {
        if (i % 3 === 0 && i) {
            value.push(',')
        }
        value.push(mkt[i])
    }
    let marketCap = value.reverse().join("")

    let marketShare = d.data["value"] / sectorValue(raw, d.data["sector"])
    marketShare = parseFloat(marketShare).toFixed(6).slice(2, 4) + "." + parseFloat(marketShare).toFixed(6).slice(4) + "%"
    if (marketShare[0] == "0") marketShare = marketShare.slice(1)
    document.querySelector(".description").textContent = json["profile"]["description"]
    document.querySelector(".logo")["src"] = json["profile"]["image"]
    document.querySelector(".value").textContent = "Company Value: $" + marketCap
    document.querySelector(".beta").textContent = "Market Beta: " + json["profile"]["beta"]
    document.querySelector(".ceo").textContent = "CEO: " +  json["profile"]["ceo"]
    document.querySelector(".market-share").textContent = "Market Share: " + marketShare
    document.querySelector(".sector").textContent = "Sector: " +  d.data["sector"] 
    document.querySelector(".company").textContent = "Company: " +  d.data["name"] 
    document.querySelector(".sector-description").textContent = sectorDescription(d.data["sector"])
}

const chart = (sector) => {
    let canvas = document.getElementById("donut")
    // canvas.width = "30%"
    // canvas.height = "10%"
    let ctx = canvas.getContext("2d")

    Chart.defaults.global.legend.display = false
    let pie = (sector === "S&P") ? marketData(raw, sector) : pieData(raw, sector)
    if(ctx["chart"]){
        Chart.defaults.global.elements.arc.borderWidth = 2
        ctx["chart"].data = pie
        ctx["chart"].update()
    } else {
        document.querySelector(".chart-container").classList.add("show")
        const doughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: pie,
            options: {
                onClick: function(e, arr) {

                    getSymbol(raw, arr[0]["_model"]["label"])
                }
            }
        });
        ctx["chart"] = doughnutChart
    }
    
}

const clear = (d) => {
    document.querySelector(".sector-description").textContent = sectorDescription(d.data["name"])
    document.querySelector(".sector").textContent = d.data.name
    document.querySelector(".description").textContent = ""
    document.querySelector(".ceo").textContent = ""
    document.querySelector(".beta").textContent = ""
    document.querySelector(".value").textContent = ""
    document.querySelector(".logo")["src"] = ""
    document.querySelector(".company").textContent = ""
    document.querySelector(".market-share").textContent = ""
}

const sectorDescription = (sector) => {
    let res = ''
    switch (sector) {
        case "Health Care":
            res += "Health care consists of medical supply companies, pharmaceutical companies, and scientific-based operations or services that aim to improve the human body or mind. Familiar names include Johnson & Johnson, a medical device and pharmaceutical company that owns Tylenol, and Abiomed, which manufacture medical implant devices"
        break
        case "Industrials":
        res += "Industrials include a wide range of companies from airlines and railroads companies to military weapons manufacturers. Since the range of companies is so large, the sector has 14 different industries. Some of the industries are Aerospace & Defense, Construction & Engineering, and Professional Services Industry. Best known names within this sector are Delta Air Lines and Southwest Airlines, FedEx Corporation, and Boeing Company."
        break
        case "Information Technology":
        res += "The informational technology sector consists of companies that develop or distribute technological items or services and include internet companies. Products that include technology is almost endless and includes computers, microprocessors, operating systems. Example of companies in this sector includes big names like Microsoft Corporation, Oracle Corp., and Mastercard Inc. This sector has seen a lot of change in recent years because of the rise in technology-based companies."
        break
        case "Utilities":
        res += "Utility companies provide or generate electricity, water, and gas to buildings and households. For example, Duke Energy generates and distributes electricity, and Southern Company provides gas and electricity. Many utility companies are also developing renewable solar, wind, and hydro facilities to be more environmentally friendly."
        break
        case "Real Estate":
        res += "As the name suggests, the newest addition to the S&P sectors includes all the Real Estate Investment Trusts (REITs) except for mortgage REITs. The real estate sector makes up 2.9% of the S&P 500. Companies in the sector include American Tower Corp., Boston Properties, and Equinix."
        break
        case "Energy":
        res += "The energy sector consists of all companies that play a part in the oil, gas, and consumable fuels business. This includes companies that find, drill, and extract the commodity. It also includes the companies that refine the material and companies that provide or manufacturer the equipment used in the process. Companies like Exxon Mobil and Chevron extract and refine gas, while companies like Kinder Morgan contain and transport the oil to gas stations."
        break
        case "Materials":
        res +=  "Companies within the materials sector provide the raw material needed for other sectors to function. This includes the mining companies that provide gold, zinc, and copper and forestry companies that provide logs. Companies that are not typically associated with materials but are in the sector are containers and packaging companies, such as the Intertape Polymer Group, a company that produces tapes."
        break
        case "Consumer Discretionary":
        res += "Discretionary consumer products are luxury items or experiences that are not necessary for survival. The demand for these items depends on the economic conditions and wealth of individuals. Products include cars, jewelry, sporting goods, and electronic devices. Luxury experiences include trips, stays at hotels, or dining in a posh restaurant. Most companies in this sector are easily recognized. Some examples include Starbucks, Best Buy, and Amazon."
        break
        case "Financials":
        res +=  "The financial sector includes all companies that revolve around the movement of money. It includes banks, credit card issuers, credit unions, insurance companies, and mortgage real estate investment trusts (REITs). Companies within this sector are relatively stable as they are mostly matured and already established. Banks in this sector include Bank of America Corp, JPMorgan Chase & Co., and Goldman Sachs. Other names include American Express, and Aon plc."
        break
        case "S&P":
        res += "The S&P 500 index – the first stock market index to be published daily- was launched in 1957. It is a leading indicator of the health of the American stock market, despite the fact that it only includes large-cap companies, because it includes a large part of the total worth of publicly-traded American companies."
        break
        case "Telecommunication Services":
        res += "The telecommunication services sector consists of companies that keep people connected. This includes internet providers and phone plan providers. "
        break
        case "Consumer Staples":
        res += "Consumer staples companies provide all the necessities of life. This includes food and beverage companies, household product providers, and personal product providers. Consumer staple companies are well known since people see it in stores regularly or in their surroundings. For example, Procter & Gamble is a famous company within this sector and produces bleach and laundry detergent under brand names such as Dawn and Tide. Another example is Kroger, which is the largest supermarket chain in the U.S. and distributes food, beverages, and household products."
        break
        default:
            res += "NONE"
            break;
    }
    
    res += ' -Corporate Finance Insitute'

    return res
}

const getSymbol = (data, name) => {
    data.forEach(el => {
        if (el["Name"] === name){
            let d = {
                data: {
                "name": el["Name"],
                "value": el["Market Cap"],
                "sector": el["Sector"],
                "symbol": el["Symbol"]
                }
            }
            fetch(`https://financialmodelingprep.com/api/v3/company/profile/${el["Symbol"]}`, {
                method: 'GET'
            }).then(function (res) {
                return res.json();
            }).then(function (json) {
                
                set(d,json)
            });
        }
    })
    
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