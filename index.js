const d3 = require("d3")
const {parse, sectorValue, pieData }= require("./parse")
const raw = require("./companies2")
const handleClick = require('./handle')
// const topo = require("topojson-client")
// const geo = require("d3-geomap")
// const selection = require("d3-selection")
// const geojson = require("./countries.json")
// const curl = require("curl")
const fetch = require('node-fetch');
const Chart = require('chart.js')

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
            default:
                return "blue"
                break;
        }
    })
    .on("mouseover", function () {
        d3.select(this).attr("stroke", "rgb(0,0,0)")
        d3.select(this).attr("opacity", .5)
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
        handleClick(d)
    })
    .attr('cx', function (d) { return d.x; })
    .attr('cy', function (d) { return d.y; })
    .attr('r', function (d) { return d.r; })
    .attr("text-anchor", "middle")
    .append("title")
    .text(function(d){
        return d.data["name"]
    })

