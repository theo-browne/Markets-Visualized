const d3 = require("d3")
const parse = require("./parse")
const raw = require("./companies2")



d3.select('body')
    .append('svg')
    .attr('width', 800)
    .attr('height', 800)
 
    .attr('transform', 'translate(50,50)')

const el = d3.select("svg")
 
const root = d3.hierarchy(parse(raw))
console.log(root)
const nodes = d3.pack();
nodes.size([800, 800]);
root.sum((el) => {
    return el.value;
});

nodes(root);
console.log(root.descendants())
d3.select('svg')
    .attr('width', 800)
    .attr('height', 800)
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
        d3.select(this).attr("opacity", 1)
        .append("text")
        .text(function (d) {
        return d.children === undefined ? d.data.name : 'test';
         })
    })
    .on("mouseleave", function() {
     
        d3.select(this).attr("stroke", null)
    })
    .on("click", function(d){
        if(d.data["sector"]){
        document.querySelector(".sector").textContent = d.data["sector"] + ": " + d.data.name
        } else {
            document.querySelector(".sector").textContent = d.data.name

        }
        
    })
    .attr('cx', function (d) { return d.x; })
    .attr('cy', function (d) { return d.y; })
    .attr('r', function (d) { return d.r; })
   
// var circles = d3.select('svg g')
//     .selectAll('g')
//     .data(root.descendants())
//     .enter()
//     .append('g')
//     .attr('transform', function (d) { return 'translate(' + [d.x, d.y] + ')' })
  

// circles
//     .append('circle')
//     .attr('r', function (d) { return d.r; })

// circles
//     .append('text')
//     .attr('dy', 4)
//     .text(function (d) {
//         return d.children === undefined ? d.data.name : '';
//     })

