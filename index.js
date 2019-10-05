const d3 = require("d3")
const parse = require("./parse")
const raw = require("./companies2")
const topo = require("topojson-client")
const geo = require("d3-geomap")
const selection = require("d3-selection")


d3.select('body')
    .append('svg')
    .attr('width', 800)
    .attr('height', 800)
 
    .attr('transform', 'translate(50,50)')

const el = d3.select("svg")
 
const root = d3.hierarchy(parse(raw))
// console.log(root)
const nodes = d3.pack();
nodes.size([800, 800]);
root.sum((el) => {
    return el.value;
});

nodes(root);
// console.log(root.descendants())
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

let data = [
    [10, 20, 30],
    [40, 60, 80],
    [100, 200, 300]
];
var correlation = d3.chord();
var links = correlation(data);
var ribbonGenerator = d3.ribbon().radius(100);

   console.log(links)
    let ele = d3.select(".info")
    .attr('width', "20vw")
    .attr('height', "20vh")
    .append("svg")
    .attr('width', "10vw")
    .attr('height', "10vh")
    // d3.select('')
    .selectAll('path')
    .data(links)
    .enter()
    .append('path')
    .attr('d', ribbonGenerator)
    // .attr("margin-left", "100px")
        .attr('cx', function (d) { 
            // console.log(d)
            return d.x; })
        .attr('cy', function (d) { return d.y; })

// let projection = d3.geoEqualEarth()
// let path = d3.geoPath(projection)
// let map = d3.map()
// var projection = d3.geoAzimuthalEqualArea()
//     .scale(300)
//     .center([-3.0026, 16.7666])
//     .translate([480, 250])
// let world = d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json").then(res => {
//     let countries = topo.feature(res, res.objects.countries)
//     let path = d3.geoPath(projection)
//     let projection = d3.geoEqualEarth()
//     let map = new Map
//     d3.select(".map")
//     .attr('width', "20vw")
//     .attr('height', "20vh")
//     .append("svg")
//     .attr('width', "10vw")
//     .attr('height', "10vh")
//     .selectAll("path")
//     .data(countries.features)
//     .join("path")
// })
// let countries = topo.feature(world, world.objects.countries)
// debugger
// let path = d3.geoPath(projection)
// let projection = d3.geoEqualEarth()
// let map = new Map

// d3.select(".map")
//     .attr('width', "20vw")
//     .attr('height', "20vh")
//     .append("svg")
//     .attr('width', "10vw")
//     .attr('height', "10vh")
//     .selectAll("path")
//     .data(countries.features)
//     .join("path")
        


// const worldMap = geo.geomap();
// worldMap.geofile('./node_modules/d3-geomap/src/world/countries.json');
// // worldMap.draw()
// worldMap.draw(selection.select('#map'))

// var format = function (d) {
//     d = d / 1000000;
//     return d3.format(',.02f')(d) + 'M';
// }

// var map = d3.choropleth()
//     .geofile('/d3-geomap/topojson/world/countries.json')
//     .colors(d3.schemeYlGnBu[9])
//     .column('YR2010')
//     .format(format)
//     .legend(true)
//     .unitId('iso3');

// d3.csv('/data/sp.pop.totl.csv').then(data => {
//     var selection = d3.select('#map').datum(data);
//     map.draw(selection);
// });