
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