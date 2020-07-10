
const d3 = require("d3")

const COLORS = [
    '37,111,115',
    '97,53,136',
    '208, 37, 117',
    '59,58,137',
    '86,174,210',
    '73,179,84',
    '228,116,63',
    '89,158,208',
    '90,158,124',
    '89,90,92',
    '228,175,64',
    '134,210,242',
    '202,216,75',
    '246, 201,178',
    '155,197,135',
    '220,235,200'
]
const parse = (data) => {
    let parsed = {

    }
    data.forEach(el => {
        if (!parsed[el["Sector"]]) {
            parsed[el["Sector"]] = []
        }
        parsed[el["Sector"]].push({
            "name" : el["Name"],
            "value": el["Market Cap"],
            "sector": el["Sector"],
            "symbol": el["Symbol"]
        })
    })
    let res = {
        "name": "S&P",
        "children": []
    }
    Object.keys(parsed).forEach(key => {
        res["children"].push({
            "name": key,
            "type": "sector",
            "children": parsed[key]
        })
    })
    return res
}

const sectorValue = (data, sector) => {
    let sectorVal = 0
    data.forEach(el => {
        if (el["Sector"]  === sector){
            sectorVal += el["Market Cap"]
        }
    })
    return sectorVal
}
const marketData = (data) => {
    let sectors = {}
    data.forEach((el) => {
        
        if (sectors[el["Sector"]]) {
            sectors[el["Sector"]] += el["Market Cap"]
        } else {
            sectors[el["Sector"]] = el["Market Cap"]
        }
    })
    let sectorData = Object.values(sectors).sort((a,b) => a-b).reverse()
   
    let backgroundColor = COLORS.concat('17,25,74').map(el => 'rgba(' + el + ',1)' )
    let res = {
        datasets: [{
            data: sectorData, 
            backgroundColor
        }],
        labels: Object.keys(sectors)
    }
    
    return res
}

const pieData = (data, sector) => {

    let res = {
        datasets: [{
             data: [],
            backgroundColor: [], 
            symbols: [],
            sectors: []
            }],
        labels: []
    }
    let pos = 0
    data = data.sort((a, b) => (a["Market Cap"] < b["Market Cap"]) ? 1 : -1)
 
    data.forEach((el) => {
        if (el["Sector"] === sector) {
            res.datasets[0].data.push(el["Market Cap"])
            res.datasets[0].sectors.push(el["Sector"])
            res.labels.push(el["Name"])
            let idx = pos %  COLORS.length 
            pos = (pos === COLORS.length -1 ) ? 0 : pos + 1
            
            res.datasets[0].backgroundColor.push('rgba(' + COLORS[pos] + ',1)')
        }
    })
   
    return res
} 

module.exports = {parse, sectorValue, pieData, marketData}

