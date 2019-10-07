const d3 = require("d3")
const parse = require("./parse")
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
            document.querySelector(".sector").textContent = d.data["sector"] + " : " + d.data.name
            fetch(`https://financialmodelingprep.com/api/v3/company/profile/${d.data["symbol"]}`, {
                method: 'GET'
            }).then(function (res) {
                return res.json();
            }).then(function (json) {
                console.log(json)
                document.querySelector(".description").textContent = json["profile"]["description"]
                document.querySelector(".logo")["src"] = json["profile"]["image"]
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
            fetch(`https://kgsearch.googleapis.com/v1/entities:search?query=${query}&key=AIzaSyD1jqXFp1x1N3Skgh8hQrwG-TTMvjt7Ewo&limit=1&indent=True`, {
                method: 'GET'
            }).then(function (res) {
                return res.json();
            }).then(function (json) {
                console.log(json)

            });
        } else {
            document.querySelector(".sector").textContent = d.data.name
            document.querySelector(".description").textContent = ""
        }
       
    })
    .attr('cx', function (d) { return d.x; })
    .attr('cy', function (d) { return d.y; })
    .attr('r', function (d) { return d.r; })
    .attr("text-anchor", "middle")
    .append("title")
    // .attr('dx', function (d) { return "50%";})
    // .attr("stroke", "51c5cf")
    // .attr("stroke-width", "2px")
    .text(function(d){
        return d.data["name"]
    })
    // d3.json("https://company.bigpicture.io/v1/companies/find?domain=bigpicture.io&webhookUrl=https://requestb.in/wpyz2mwp&webhookId=12345").then(res => {
    //     console.log(res)
    // })
    
    // fetch("https://company.bigpicture.io/v1/companies/find?domain=bigpicture.io&webhookUrl=https://requestb.in/wpyz2mwp&webhookId=12345")

// let data = [
//     [10, 20, 30],
//     [40, 60, 80],
//     [100, 200, 300]
// ];
// var margin = {top: 20, right: 20, bottom: 20, left: 20},
//     width = 430 - margin.left - margin.right,
//     height = 430 - margin.top - margin.bottom

// // Create the svg area
// var svg = d3.select(".info")
//   .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_correlogram.csv").then(rows => {
//   var data = [];
//   rows.forEach(function(d) {
//     var x = d[""];
//     delete d[""];
//     for (prop in d) {
//       var y = prop,
//         value = d[prop];
//       data.push({
//         x: x,
//         y: y,
//         value: +value
//       });
//     }
//   });

//   // List of all variables and number of them
//   var domain = d3.set(data.map(function(d) { return d.x })).values()
//   var num = Math.sqrt(data.length)

//   // Create a color scale
//   var color = d3.scaleLinear()
//     .domain([-1, 0, 1])
//     .range(["#B22222", "#fff", "#000080"]);

//   // Create a size scale for bubbles on top right. Watch out: must be a rootscale!
//   var size = d3.scaleSqrt()
//     .domain([0, 1])
//     .range([0, 9]);

//   // X scale
//   var x = d3.scalePoint()
//     .range([0, width])
//     .domain(domain)

//   // Y scale
//   var y = d3.scalePoint()
//     .range([0, height])
//     .domain(domain)

//   // Create one 'g' element for each cell of the correlogram
//   var cor = svg.selectAll(".cor")
//     .data(data)
//     .enter()
//     .append("g")
//       .attr("class", "cor")
//       .attr("transform", function(d) {
//         return "translate(" + x(d.x) + "," + y(d.y) + ")";
//       });

//   // Low left part + Diagonal: Add the text with specific color
//   cor
//     .filter(function(d){
//       var ypos = domain.indexOf(d.y);
//       var xpos = domain.indexOf(d.x);
//       return xpos <= ypos;
//     })
//     .append("text")
//       .attr("y", 5)
//       .text(function(d) {
//         if (d.x === d.y) {
//           return d.x;
//         } else {
//           return d.value.toFixed(2);
//         }
//       })
//       .style("font-size", 11)
//       .style("text-align", "center")
//       .style("fill", function(d){
//         if (d.x === d.y) {
//           return "#000";
//         } else {
//           return color(d.value);
//         }
//       });


//   // Up right part: add circles
//   cor
//     .filter(function(d){
//       var ypos = domain.indexOf(d.y);
//       var xpos = domain.indexOf(d.x);
//       return xpos > ypos;
//     })
//     .append("circle")
//       .attr("r", function(d){ return size(Math.abs(d.value)) })
//       .style("fill", function(d){
//         if (d.x === d.y) {
//           return "#000";
//         } else {
//           return color(d.value);
//         }
//       })
//       .style("opacity", 0.8)

// }) 
// var correlation = d3.chord();
// var links = correlation(data);
// var ribbonGenerator = d3.ribbon().radius(100);

//    console.log(links)
//     d3.select(".info")
//     .attr('width', "35vw")
//     .attr('height', "35vh")
//     .append("svg")
//         .attr('width', "35vw")
//         .attr('height', "35vh")
//     // .attr('transform', 'translate(50,-50)')
//     .selectAll('path')
//     .data(links)
//     .enter()
//     .append('path')
//     .attr('d', ribbonGenerator)
//     .attr('transform', 'translate(150,100)')
//     .attr("fill", "blue")

// const projection = d3.geoEquirectangular()
//     .scale(50)
//     .center([-3.0026, 16.7666])
//     // .translate([480, 250])
//     var geoGenerator = d3.geoPath()
//     .projection(projection)

// d3.select('#map')
//     .append("svg")
//     .attr("height", 400)
//     .attr("width", 400)
//     .selectAll('path')
//     .data(geojson.features)
//     .enter()
//     .append('path')
//     .attr('d', geoGenerator)
//     .attr('transform', 'translate(-300, -100)')
