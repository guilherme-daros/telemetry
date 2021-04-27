const brokerIp = ""
const brokerPort = 9001
const username = ""
const password = ""

var boatBattery = {
    power,
    overTemperature: false,
    overCurrent: false,
    CHG: false,
    DSG: false,
    underVoltage: false,
    overVoltage: false,
    SoC,
    current,
    vPack: 0,
    cTemp: {
        cell1: 0,
        cell2: 0,
        cell3: 0,
        cell4: 0,
        cell5: 0,
        cell6: 0,
        cell7: 0,
        cell8: 0
    },
    cVoltage: {
        cell1: 0,
        cell2: 0,
        cell3: 0,
        cell4: 0,
        cell5: 0,
        cell6: 0,
        cell7: 0,
        cell8: 0
    }
}

const ctx0 = document.getElementById("graph0").getContext("2d");
const ctx1 = document.getElementById("graph1").getContext("2d");
const ctx2 = document.getElementById("graph2").getContext("2d");
const ctx3 = document.getElementById("graph3").getContext("2d");
const client = new Paho.MQTT.Client(brokerIp, brokerPort, username);

client.onConnectionLost = (responseObject) => {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:"+responseObject.errorMessage);
      }
};
client.onMessageArrived = (message) => {
    const topic = message.destinationName;
    if(topic = "0x186455F4"){
        document.getElementById("SoC").innerHTML = Number(message.payloadString.split(";")[3])
    }
};

client.connect({
    onSuccess: () => {
        console.log("Connected Succesfully");
        client.subscribe("#");

}});


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
