const d3 = require("d3")
const {parse, sectorValue }= require("./parse")
const raw = require("./companies2")
// const topo = require("topojson-client")
// const geo = require("d3-geomap")
// const selection = require("d3-selection")
// const geojson = require("./countries.json")
// const curl = require("curl")
const fetch = require('node-fetch');

const root = d3.hierarchy(parse(raw))
// console.log(root)
const nodes = d3.pack();
nodes.size([600, 600]);
root.sum((el) => {
    return el.value;
});
nodes(root);
d3.select('.circles')
    .append('svg')
    .attr('transform', 'translate(0,50)')
    .attr('width', 600)
    .attr('height', 600)
    .selectAll('circle')
    .data(root.descendants())
    .enter()
    .append('circle')
    .style("opacity", 0.1)
    .attr("fill", (d) => {
        switch (d.data["name"]) {
            // case "Health Care":
            //     return "orange"
            // case "Industrials":
            //     return "red"
            // case "Information Technology":
            //     return "yellow"
            // case "Utilities":
            //     return "purple"
            // case "Real Estate":
            //     return "pink"
            // case "Energy":
            //     return "light green"
            // case "Materials":
            //     return "plum"
            // case "Consumer Discretionary":
            //     return "red"
            // case "Financials":
            //     return "gray"
            // case "S&P":
            //     return "red"
            default:
                return "blue"
                break;
        }
    })
    .on("mouseover", function () {
        d3.select(this).attr("stroke", "rgb(0,0,0)")
        d3.select(this).attr("opacity", .5)
        // d3.select(this).attr("fill", "red")
        d3.select(this).append("text")
            .text(function (d) {
                return d.children === undefined ? d.data.name : 'test';
         })
            .attr("font-size", 80)
            .attr("font-family", "sans-serif")
            .attr("text-anchor", "middle")
            .attr("fill", "black")
    })
    .on("mouseleave", function() {
        d3.select(this).attr("stroke", null)
    })
    .on("click", function(d){
        if(d.data["sector"]){
            document.querySelector(".sector").textContent = d.data["sector"] + ": " + d.data.name
            fetch(`https://financialmodelingprep.com/api/v3/company/profile/${d.data["symbol"]}`, {
                method: 'GET'
            }).then(function (res) {
                return res.json();
            }).then(function (json) {
                console.log(json)
                document.querySelector(".description").textContent = json["profile"]["description"]
                document.querySelector(".logo")["src"] = json["profile"]["image"]
                let value = "";
                for (let i = 0; i < json["profile"]["mktCap"].length - 3; i++) {
                    if (i % 3 === 0 && i) {
                        value += ","
                    }
                    value += json["profile"]["mktCap"][i]
                    
                }
                let marketShare = d.data["value"] / sectorValue(raw, d.data["sector"] )
                console.log(d.data)
                document.querySelector(".value").textContent = "Company Value: $" + value
                document.querySelector(".beta").textContent = "Market Beta: " + json["profile"]["beta"]
                document.querySelector(".ceo").textContent = "CEO: " + json["profile"]["ceo"]
                document.querySelector(".ceo").textContent = "Market Share: " + marketShare
       
            });
            let query = d.data["name"].split(" ").filter(el => el !== "Co." && el !== "Cos." ).map(el => {
                let newEl = '' 
                for (let i = 0; i < el.length; i++) {
                      if (el[i] === "&"){
                        newEl += '%26'
                      } else {
                          newEl += el[i]
                      }         
                }
                return newEl
            }).join("+")
        } else {
            document.querySelector(".sector").textContent = d.data.name
            document.querySelector(".description").textContent = ""
            document.querySelector(".ceo").textContent = ""
            document.querySelector(".beta").textContent = ""
            document.querySelector(".value").textContent = ""
            document.querySelector(".logo")["src"] = ""
        }
       
    })
    .attr('cx', function (d) { return d.x; })
    .attr('cy', function (d) { return d.y; })
    .attr('r', function (d) { return d.r; })
    .attr("text-anchor", "middle")
    .append("title")
    .text(function(d){
        return d.data["name"]
    })

