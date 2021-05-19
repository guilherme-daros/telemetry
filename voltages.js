const brokerIp = "192.168.0.192";
const brokerPort = 9001;
const username = "";
const password = "";

var boatBattery = {
  power: 0,
  warnings: {
    overTemperature: false,
    overCurrent: false,
    CHG: false,
    DSG: false,
    underVoltage: false,
    overVoltage: false,
  },
  SoC: 0,
  current: 0,
  vPack: 0,
  cTemp: {
    cell1: 0,
    cell2: 0,
    cell3: 0,
    cell4: 0,
    cell5: 0,
    cell6: 0,
    cell7: 0,
    cell8: 0,
  },
  cVoltage: {
    cell1: 0,
    cell2: 0,
    cell3: 0,
    cell4: 0,
    cell5: 0,
    cell6: 0,
    cell7: 0,
    cell8: 0,
  },
};

const defaultVGraphOptions = {
  type: "line",
  data: {
    datasets: [
      {
        data: [3800],
      },
    ],
  },
  options: {
    animation: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{ display: false }],
      yAxes: [
        {
          display: true,
          ticks: {
            min: 22,
            max: 38,
            stepSize: 2,
            callback: (value) => value / 10 + " V",
          },
        },
      ],
    },
    elements: {
      line: {
        borderWidth: 1,
        backgroundColor: "rgba(252,145,46,0.01)",
        borderColor: "rgb(252,145,46)",
        // stepped : true
      },
      point: {
        radius: 0,
      },
    },
  },
};
var vGraphIdList = [
  "vCell1",
  "vCell2",
  "vCell3",
  "vCell4",
  "vCell5",
  "vCell6",
  "vCell7",
  "vCell8",
];
var vGraphList = {};

window.onload = () => {
  vGraphList = vGraphIdList.reduce(
    (accumulator, graphName) => (
      (accumulator[graphName] = new Chart(
        document.getElementById(graphName).getContext("2d"),
        defaultVGraphOptions
      )),
      accumulator
    ),
    {}
  );
  client.connect({
    onSuccess: () => {
      console.log("MQTT Connected Succesfully");
      client.subscribe("#");
    },
  });
};

const client = new Paho.MQTT.Client(brokerIp, brokerPort, username);

client.onConnectionLost = (responseObject) => {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
};

client.onMessageArrived = (message) => {
  const topic = message.destinationName;
  const data = message.payloadString.split(";");
  switch (topic) {
    case "0x186B55F4":
      boatBattery.cVoltage.cell4 = Number(data[3]);
      boatBattery.cVoltage.cell3 = Number(data[2]);
      boatBattery.cVoltage.cell2 = Number(data[1]);
      boatBattery.cVoltage.cell1 = Number(data[0]);
      break;
    case "0x186C55F4":
      boatBattery.cVoltage.cell8 = Number(data[3]);
      boatBattery.cVoltage.cell7 = Number(data[2]);
      boatBattery.cVoltage.cell6 = Number(data[1]);
      boatBattery.cVoltage.cell5 = Number(data[0]);
      break;
    default:
      break;
  }
  console.log(boatBattery);
  renderInfo();
};

function renderInfo() {
  console.log("Not Implemented Yet");
  // const graph = graphList["vCell1"]
  // graph.data.labels.push(0)
  // graph.data.datasets[0].data.push()

  // if (graph.data.datasets[0].data.length > 100){
  //     graph.data.datasets[0].data[0] = graph.data.datasets[0].data[1]
  //     graph.data.datasets[0].data.splice(1,1)
  //     graph.data.labels.shift()
  // }
  // graph.update();
}
