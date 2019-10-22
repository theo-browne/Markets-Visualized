const d3 = require("d3")
const {parse, sectorValue, pieData }= require("./parse")
const raw = require("./companies2")
const handleClick = require('./handle')
const fetch = require('node-fetch');
const Chart = require('chart.js')
 
// let btn = document.getElementById("about-btn").addEventListener('click', (e)=> {
//     document.querySelector(".sector").textContent = ""
//     document.querySelector(".sector-description").textContent = "Welcome to Markets today! The circles represent the S&P 500 (one of the largest US stock market indexes). The outer bubbles represent sectors of the index while the inner bubbles represent individual companies. Click on the bubbles and explore!"
//     document.querySelector(".description").textContent = ""
//     document.querySelector(".ceo").textContent = ""
//     document.querySelector(".beta").textContent = ""
//     document.querySelector(".value").textContent = ""
//     document.querySelector(".logo")["src"] = ""
//     document.querySelector(".company").textContent = ""
//     document.querySelector(".market-share").textContent = ""
//     let canvas = document.getElementById("donut")
//     let ctx = canvas.getContext("2d")
//     if (ctx["chart"]) {
//         document.querySelector(".chart-container").classList.remove("show")
//         Chart.defaults.global.elements.arc.borderWidth = 0
//         ctx["chart"].update()
//         ctx["chart"] = false
//     }
// })


const root = d3.hierarchy(parse(raw))
const nodes = d3.pack();
nodes.size([550, 550]);
root.sum((el) => {
    return el.value;
});
nodes(root);
d3.select('.circles')
    .append('svg')
    .attr('transform', 'translate(-80,20)')
    .attr('width', 550)
    .attr('height', 550)
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
    .on("mouseover", function (d) {
        d3.select(this).attr("stroke", "rgb(0,0,0)")
        d3.select(this).attr("opacity", .5)
        d3.select(this).append("text")
            .text(function (d) {
                return d.children === undefined ? d.data.name : '';
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

