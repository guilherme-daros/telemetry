const ctx0 = document.getElementById("graph0").getContext("2d");
const ctx1 = document.getElementById("graph1").getContext("2d");
const ctx2 = document.getElementById("graph2").getContext("2d");
const ctx3 = document.getElementById("graph3").getContext("2d");

const chart0 = new Chart(ctx0, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            backgroundColor: "rgba(255,255,255,0)",
            borderColor: "rgba(28,29,104,1)",
            pointBackgroundColor: "rgba(0,0,0,0)",
            pointBorderColor: "rgba(0,0,0,0)",
            pointHoverBackgroundColor: "rgba(95,186,88,1)",
            pointHoverBorderColor: "rgba(95,186,88,1)",
            data: []
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'realtime'
            }]
        },
        plugins: {
            streaming: {
                onRefresh: function(chart) {
                chart.data.labels.push(Date.now());
                chart.data.datasets[0].data.push(
                    Math.random()*10
                );
                },
                delay: 2000
            }
        },
        legend: {
            display: false
        }
    }
});
const chart1 = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            backgroundColor: "rgba(255,255,255,0)",
            borderColor: "rgba(28,29,104,1)",
            pointBackgroundColor: "rgba(0,0,0,0)",
            pointBorderColor: "rgba(0,0,0,0)",
            pointHoverBackgroundColor: "rgba(95,186,88,1)",
            pointHoverBorderColor: "rgba(95,186,88,1)",
            data: []
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'realtime'
            }]
        },
        plugins: {
            streaming: {
                onRefresh: function(chart) {
                chart.data.labels.push(Date.now());
                chart.data.datasets[0].data.push(
                    Math.random() * 10
                );
                },
                delay: 2000
            }
        },
        legend: {
            display: false
        }
    }
});
const chart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            backgroundColor: "rgba(255,255,255,0)",
            borderColor: "rgba(28,29,104,1)",
            pointBackgroundColor: "rgba(0,0,0,0)",
            pointBorderColor: "rgba(0,0,0,0)",
            pointHoverBackgroundColor: "rgba(95,186,88,1)",
            pointHoverBorderColor: "rgba(95,186,88,1)",
            data: []
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'realtime'
            }]
        },
        plugins: {
            streaming: {
                onRefresh: function(chart) {
                chart.data.labels.push(Date.now());
                chart.data.datasets[0].data.push(
                    Math.random()*10
                );
                },
                delay: 2000
            }
        },
        legend: {
            display: false
        }
    }
});
const chart3 = new Chart(ctx3, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            backgroundColor: "rgba(255,255,255,0)",
            borderColor: "rgba(28,29,104,1)",
            pointBackgroundColor: "rgba(0,0,0,0)",
            pointBorderColor: "rgba(0,0,0,0)",
            pointHoverBackgroundColor: "rgba(95,186,88,1)",
            pointHoverBorderColor: "rgba(95,186,88,1)",
            data: []
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'realtime'
            }]
        },
        plugins: {
            streaming: {
                onRefresh: function(chart) {
                chart.data.labels.push(Date.now());
                chart.data.datasets[0].data.push(
                    Math.random()*10
                );
                },
                delay: 2000 
            }
        },
        legend: {
            display: false
        }
    }
});