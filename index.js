const d3 = require("d3")
const parse = require("./parse")
const raw = require("./companies2")
const topo = require("topojson-client")
const geo = require("d3-geomap")
const selection = require("d3-selection")
const geojson = require("./countries.json")

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
    .attr('transform', 'translate(50,50)')
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
        } else {
            document.querySelector(".sector").textContent = d.data.name
        }
    })
    .attr('cx', function (d) { return d.x; })
    .attr('cy', function (d) { return d.y; })
    .attr('r', function (d) { return d.r; })
    .append("text")
    .text(function(d){
        return "TEST"
    })
    
let data = [
    [10, 20, 30],
    [40, 60, 80],
    [100, 200, 300]
];
var correlation = d3.chord();
var links = correlation(data);
var ribbonGenerator = d3.ribbon().radius(100);

   console.log(links)
    d3.select(".info")
    .attr('width', "30vw")
    .attr('height', "30vh")
    .append("svg")
        .attr('width', "30vw")
        .attr('height', "30vh")
    .attr('transform', 'translate(50,-50)')
    .selectAll('path')
    .data(links)
    .enter()
    .append('path')
    .attr('d', ribbonGenerator)
    .attr('transform', 'translate(150,150)')
    .attr("fill", "blue")

const projection = d3.geoEquirectangular()
    .scale(50)
    .center([-3.0026, 16.7666])
    // .translate([480, 250])
    var geoGenerator = d3.geoPath()
    .projection(projection)

d3.select('#map')
    .append("svg")
    .attr("height", 400)
    .attr("width", 400)
    .selectAll('path')
    .data(geojson.features)
    .enter()
    .append('path')
    .attr('d', geoGenerator)
    .attr('transform', 'translate(-300,0)')