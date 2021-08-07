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
        data: [],
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
      client.subscribe("0x186B55F4");
      client.subscribe("0x186C55F4");
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
  console.log(data);
  switch (topic) {
    case "0x186B55F4":
      boatBattery.cVoltage.cell4 = Number(data[3]);
      boatBattery.cVoltage.cell3 = Number(data[2]);
      boatBattery.cVoltage.cell2 = Number(data[1]);
      boatBattery.cVoltage.cell1 = Number(data[0]);
      renderInfo1();
      break;
    case "0x186C55F4":
      boatBattery.cVoltage.cell8 = Number(data[3]);
      boatBattery.cVoltage.cell7 = Number(data[2]);
      boatBattery.cVoltage.cell6 = Number(data[1]);
      boatBattery.cVoltage.cell5 = Number(data[0]);
      renderInfo2();
      break;
    default:
      break;
  }
};

function renderInfo1() {
  vGraphList["vCell1"].data.labels.push(0);
  vGraphList["vCell1"].data.datasets[0].data.push(boatBattery.cVoltage.cell1);
  if (vGraphList["vCell1"].data.datasets[0].data.length > 100) {
    vGraphList["vCell1"].data.datasets[0].data[0] =
      vGraphList["vCell1"].data.datasets[0].data[1];
    vGraphList["vCell1"].data.datasets[0].data.splice(1, 1);
    vGraphList["vCell1"].data.labels.shift();
  }

  vGraphList["vCell2"].data.labels.push(0);
  vGraphList["vCell2"].data.datasets[0].data.push(boatBattery.cVoltage.cell2);
  if (vGraphList["vCell2"].data.datasets[0].data.length > 100) {
    vGraphList["vCell2"].data.datasets[0].data[0] =
      vGraphList["vCell2"].data.datasets[0].data[1];
    vGraphList["vCell2"].data.datasets[0].data.splice(1, 1);
    vGraphList["vCell2"].data.labels.shift();
  }

  vGraphList["vCell3"].data.labels.push(0);
  vGraphList["vCell3"].data.datasets[0].data.push(boatBattery.cVoltage.cell3);
  if (vGraphList["vCell3"].data.datasets[0].data.length > 100) {
    vGraphList["vCell3"].data.datasets[0].data[0] =
      vGraphList["vCell3"].data.datasets[0].data[1];
    vGraphList["vCell3"].data.datasets[0].data.splice(1, 1);
    vGraphList["vCell3"].data.labels.shift();
  }

  vGraphList["vCell4"].data.labels.push(0);
  vGraphList["vCell4"].data.datasets[0].data.push(boatBattery.cVoltage.cell4);
  if (vGraphList["vCell4"].data.datasets[0].data.length > 100) {
    vGraphList["vCell4"].data.datasets[0].data[0] =
      vGraphList["vCell4"].data.datasets[0].data[1];
    vGraphList["vCell4"].data.datasets[0].data.splice(1, 1);
    vGraphList["vCell4"].data.labels.shift();
  }
}

function renderInfo2() {
  vGraphList["vCell5"].data.labels.push(0);
  vGraphList["vCell5"].data.datasets[0].data.push(boatBattery.cVoltage.cell5);
  if (vGraphList["vCell5"].data.datasets[0].data.length > 100) {
    vGraphList["vCell5"].data.datasets[0].data[0] =
      vGraphList["vCell5"].data.datasets[0].data[1];
    vGraphList["vCell5"].data.datasets[0].data.splice(1, 1);
    vGraphList["vCell5"].data.labels.shift();
  }

  vGraphList["vCell6"].data.labels.push(0);
  vGraphList["vCell6"].data.datasets[0].data.push(boatBattery.cVoltage.cell6);
  if (vGraphList["vCell6"].data.datasets[0].data.length > 100) {
    vGraphList["vCell6"].data.datasets[0].data[0] =
      vGraphList["vCell6"].data.datasets[0].data[1];
    vGraphList["vCell6"].data.datasets[0].data.splice(1, 1);
    vGraphList["vCell6"].data.labels.shift();
  }

  vGraphList["vCell7"].data.labels.push(0);
  vGraphList["vCell7"].data.datasets[0].data.push(boatBattery.cVoltage.cell7);
  if (vGraphList["vCell7"].data.datasets[0].data.length > 100) {
    vGraphList["vCell7"].data.datasets[0].data[0] =
      vGraphList["vCell7"].data.datasets[0].data[1];
    vGraphList["vCell7"].data.datasets[0].data.splice(1, 1);
    vGraphList["vCell7"].data.labels.shift();
  }

  vGraphList["vCell8"].data.labels.push(0);
  vGraphList["vCell8"].data.datasets[0].data.push(boatBattery.cVoltage.cell8);
  if (vGraphList["vCell8"].data.datasets[0].data.length > 100) {
    vGraphList["vCell8"].data.datasets[0].data[0] =
      vGraphList["vCell8"].data.datasets[0].data[1];
    vGraphList["vCell8"].data.datasets[0].data.splice(1, 1);
    vGraphList["vCell8"].data.labels.shift();
  }

  vGraphList["vCell1"].update();
  vGraphList["vCell2"].update();
  vGraphList["vCell3"].update();
  vGraphList["vCell4"].update();
  vGraphList["vCell5"].update();
  vGraphList["vCell6"].update();
  vGraphList["vCell7"].update();
  vGraphList["vCell8"].update();
}
