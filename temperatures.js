var boatBattery = {
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
};

const defaultTGraphOptions = {
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
            min: 200,
            max: 1000,
            stepSize: 200,
            callback: (value) => value / 10 + " °C",
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

var tGraphIdList = [
  "tCell1",
  "tCell2",
  "tCell3",
  "tCell4",
  "tCell5",
  "tCell6",
  "tCell7",
  "tCell8",
];
var tGraphList = {};

window.onload = () => {
  tGraphList = tGraphIdList.reduce(
    (accumulator, graphName) => (
      (accumulator[graphName] = new Chart(
        document.getElementById(graphName).getContext("2d"),
        defaultTGraphOptions
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
    case "0x186655F4":
      boatBattery.cTemp.cell4 = Number(data[3]);
      boatBattery.cTemp.cell3 = Number(data[2]);
      boatBattery.cTemp.cell2 = Number(data[1]);
      boatBattery.cTemp.cell1 = Number(data[0]);
      break;
    case "0x186755F4":
      boatBattery.cTemp.cell8 = Number(data[3]);
      boatBattery.cTemp.cell7 = Number(data[2]);
      boatBattery.cTemp.cell6 = Number(data[1]);
      boatBattery.cTemp.cell5 = Number(data[0]);
      break;
    default:
      break;
  }
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
