# [Markets Visualized](https://theo-browne.github.io/Markets-Visualized/)

------

### Tech Stack

* Javascript 
* D3.js v5.12.0
* Chart.js v2.8.0

------

Welcome to Markets Visualized.

Markets Visualized was designed to visualize the S&P 500 (a major US Stock index that includes most of the major public companies). The circle pack on the left of the page represents the companies, and sectors of the S&P 500 nested inside the largest circle representing the entire index. The innermost circles represent companies, with the size of the circle representing the market capitalization (value) of the company. The size of these company circles combine to dictate the size of the sector's circle. Together, these circles help users understand what how big these companies and sectors are in relation to each other as well as how they fit together to form the overall index. By clicking on different circles, users receive more information on that company/sector.


------

![Screenshots of Markets Visualized](https://user-images.githubusercontent.com/47790228/66791171-edea1180-eea7-11e9-8d74-8f2a465e35c2.png)




### How it Works

------

* Markets Visualized is created using D3.js, Chart.js, and Javascript.
* D3.js is used to create the large circle pack on the right of the screen .
* Chart.js is used to create the donut chart that represents the currently selected sector.
* The changes made to the site are done using vanilla Javascript DOM manipulation.

------

### Visualization Code Snippets

Donut Chart 
```
const chart = (sector) => {
    let canvas = document.getElementById("donut")
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
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem, data) {   
                            let label = data.labels[tooltipItem.index] || '';
                            let val = String(data.datasets[0].data[tooltipItem.index]).split("").reverse()
                            let mkt = []
                            for (let i = 0; i < val.length; i++) {
                                if (i % 3 === 0 && i) {
                                    mkt.push(',')
                                }
                                mkt.push(val[i])
                            }
                            let marketCap = mkt.reverse().join("")

                            return label + ": " + "$" + marketCap
                }
            }
        }
            }
        });
        ctx["chart"] = doughnutChart
    }
}


```
Circle Pack 
```
const root = d3.hierarchy(parse(raw))
const nodes = d3.pack();
nodes.size([550, 550]);
root.sum((el) => {
    return el.value;
});
nodes(root);
d3.select('.circles')
    .append('svg')
    .attr('transform', 'translate(-50,0)')
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
    .on("mouseover", function () {
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

```
