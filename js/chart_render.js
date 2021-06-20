
// data: [{x:'2016-12-25', y:20}, {x:'2016-12-26', y:10}]
// Chart.defaults.datasets.line.showLine = false;
const SCOPE_PRICE = 30
const API_URL_KOLOB = `https://wax.simplemarket.io/api/v2/market?skip=0&limit=${SCOPE_PRICE}&&authors=ilovekolobok&asset.mdata.health.raw=100&sortOrder=1&isVerifiedOnly=true`
const API_URL_COMMON_PRICE = `https://wax.simplemarket.io/api/v2/market?skip=0&limit=${SCOPE_PRICE}&&authors=ilovekolobok&categories=prize&asset.idata.class.raw=common&sortOrder=1&isVerifiedOnly=true`
const API_URL_UNCOMMON_PRICE = `https://wax.simplemarket.io/api/v2/market?skip=0&limit=${SCOPE_PRICE}&&authors=ilovekolobok&categories=prize&asset.idata.class.raw=uncommon&sortOrder=1&isVerifiedOnly=true`
const API_URL_RARE_PRICE = `https://wax.simplemarket.io/api/v2/market?skip=0&limit=${SCOPE_PRICE}&&authors=ilovekolobok&categories=prize&asset.idata.class.raw=rare&sortOrder=1&isVerifiedOnly=true`
const API_URL_EPIC_PRICE = `https://wax.simplemarket.io/api/v2/market?skip=0&limit=${SCOPE_PRICE}&&authors=ilovekolobok&categories=prize&asset.idata.class.raw=epic&sortOrder=1&isVerifiedOnly=true`

const API_LIST = [
    API_URL_KOLOB,
    API_URL_COMMON_PRICE,
    API_URL_UNCOMMON_PRICE,
    API_URL_RARE_PRICE,
    API_URL_EPIC_PRICE,
]
var l = new Array;

// API_LIST.forEach(
//     async function (URL) { 
//         let info = await makeRequest(URL)
//         l.push(info)
//         }
//     )

async function returnMarketPrices() {
    // Make requests to API and return the selling prices
    API_LIST.forEach(
        async function (URL) { 
            let info = await makeRequest(URL)
            render(info);
            // l.push(info)
         }
        )
    // return l
}


async function makeRequest(url) {
    return fetch(url, { method: "get" })
        .then(resp => {
            if (resp.status === 200) {
                return resp.json()
            } else {
                console.log("Status: " + resp.status)
                return Promise.reject("server")
            }
        })
        .then(dataJson => {
            let items = dataJson.items.filter(item => item.cryptoPrice > 0);
            // console.log(items)
            return items
        })
        .catch(err => {
            console.log('Err', err)
            if (err === "server") return console.log(err)
        })
}


async function render(data){
    var category = data[0].category
    if (category == 'prize') {
        category = data[0].idata.class
    }
    var ctx = document.getElementById(category);

    p = [] // Represent array of prices
    data.forEach(function(i) {
        p.push(i.cryptoPrice);
    })
    var sum = p.reduce((a, b) => a + b, 0);
    var avg = (sum / p.length) || 0;
    var min = Math.min.apply(Math, p)
    p = p.slice(0, 20)
    label = category+' min: '+ min.toFixed(4) + ' median: ' + String(avg.toFixed(4))
    var text_field = document.getElementsByName(category);
    text_field[0].textContent = label
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: p,
        datasets: [{
            label: label,
            data: p,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1,
            tension: 0.3
        }]
    },
    options: {
        scales: {
            // x: {
            //     type: 'time'
            // },
            // time: {
            //     // Luxon format string
            //     tooltipFormat: 'T'
            // },
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 15
                    }
                }
            }
        }
    }
});
}

async function test() {
    await returnMarketPrices();
}
test();