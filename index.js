const d3 = require("d3")
const {parse, sectorValue, pieData }= require("./parse")
const raw = require("./companies2")
const handleClick = require('./handle')
const fetch = require('node-fetch');
const Chart = require('chart.js')

const root = d3.hierarchy(parse(raw))
const nodes = d3.pack();
nodes.size([550, 550]);
root.sum((el) => {
    return el.value;
});
nodes(root);
d3.select('.circles')
    .append('svg')
    .attr('transform', 'translate(-80,60)')
    .attr('width', 550)
    .attr('height', 550)
    .selectAll('circle')
    .data(root.descendants())
    .enter()
    .append('circle')
    .style("opacity", 0.3)
    .attr("fill", (d) => {
        switch (d.data["name"]) {
            default:
                return "blue"
                break;
        }
    })
    .on("mouseover", function (d) {
        let cat = (d.data["type"] === 'sector') ? "Sector: " : "Company: "
        if (d.data.name === "S&P") cat = "Index: "
        let color;
        switch (cat) {
            case "Sector: ":
                color = 'red'
                break;
            case "Company: ":
                color = 'orange'
                break;
            case "Index: ":
                color = 'purple'
                break;


            default:
                break;
        }
        document.querySelector(".name").textContent = cat
        document.querySelector(".name").style.color = color
        document.querySelector(".inner-name").textContent = d.data.name
        d3.select(this).attr("stroke", "rgb(0,0,0)")
        d3.select(this).attr("opacity", 1)
        .attr('fill', color)
        d3.select(this).append("text")
            .text(function (d) {
                return d.children === undefined ? d.data.name : '';
         })
            .attr('x', function (d) { return d.x; })
            .attr('y', function (d) { return d.y; })
            .attr("font-size", 80)
            .attr("font-family", "sans-serif")
            .attr("text-anchor", "middle")
            .attr("fill", "black")     
            .attr('opacity', 1)
            .attr('z-index', 100)
        

    })
    .on("mouseleave", function() {
        d3.select(this).attr("stroke", null)
            .attr('fill', 'blue')
        document.querySelector(".name").textContent = ""
        document.querySelector(".inner-name").textContent = ""
    })
    .on("click", function(d){
        handleClick(d)
    })
    .attr('cx', function (d) { return d.x; })
    .attr('cy', function (d) { return d.y; })
    .attr('r', function (d) { return d.r; })
    .attr("text-anchor", "middle")

    

