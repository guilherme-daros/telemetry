const client = new Paho.MQTT.Client(brokerIp, brokerPort, username);

const warningColors = {
  red: "#ff0000",
  green: "#00ca00",
};

function updateCGraph() {
  interface.cGraph.data.labels.push(0);
  interface.cGraph.data.datasets[0].data.push(boatBattery.cPack);
  if (interface.cGraph.data.datasets[0].data.length > 100) {
    interface.cGraph.data.datasets[0].data[0] =
      interface.cGraph.data.datasets[0].data[1];
    interface.cGraph.data.datasets[0].data.splice(1, 1);
    interface.cGraph.data.labels.shift();
  }
  interface.cGraph.update();
}

function updateVGraph() {
  interface.vGraph.data.labels.push(0);
  interface.vGraph.data.datasets[0].data.push(boatBattery.vPack);

  if (interface.vGraph.data.datasets[0].data.length > 100) {
    interface.vGraph.data.datasets[0].data[0] =
      interface.vGraph.data.datasets[0].data[1];
    interface.vGraph.data.datasets[0].data.splice(1, 1);
    interface.vGraph.data.labels.shift();
  }
  interface.vGraph.update();
}

function updateTGraph() {
  interface.tGraph.data.labels.push(0);
  interface.tGraph.data.datasets[0].data.push(boatBattery.tPack);
  if (interface.tGraph.data.datasets[0].data.length > 100) {
    interface.tGraph.data.datasets[0].data[0] =
      interface.tGraph.data.datasets[0].data[1];
    interface.tGraph.data.datasets[0].data.splice(1, 1);
    interface.tGraph.data.labels.shift();
  }
  interface.tGraph.update();
}

const boatBattery = {
  warnings: {
    overTemperature: false,
    overCurrent: false,
    CHG: false,
    DSG: false,
    underVoltage: false,
    overVoltage: false,
  },
  power: 0,
  SoC: 0,
  cPack: 0,
  vPack: 0,
  tPack: 0,
  cellTemp: {
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

const defaultGraphOptions = {
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
        },
      ],
    },
    elements: {
      line: {
        borderWidth: 1,
        backgroundColor: "rgba(252,145,46,0.01)",
        borderColor: "rgb(252,145,46)",
      },
      point: {
        radius: 0,
      },
    },
  },
};
const defaultVGraphOptions = {
  ...defaultGraphOptions,
  options: {
    ...defaultGraphOptions.options,
    scales: {
      ...defaultGraphOptions.options.scales,
      yAxes: [
        {
          display: true,
          ticks: {
            min: 0,
            max: 300,
            stepSize: 20,
            callback: (value) => `${value / 10} V`,
          },
        },
      ],
    },
  },
};
const defaultCGraphOptions = {
  ...defaultGraphOptions,
  options: {
    ...defaultGraphOptions.options,
    scales: {
      ...defaultGraphOptions.options.scales,
      yAxes: [
        {
          display: true,
          ticks: {
            min: 0,
            max: 2000,
            stepSize: 400,
            callback: (value) => `${value / 10} A`,
          },
        },
      ],
    },
  },
};
const defaultTGraphOptions = {
  ...defaultGraphOptions,
  options: {
    ...defaultGraphOptions.options,
    scales: {
      ...defaultGraphOptions.options.scales,
      yAxes: [
        {
          display: true,
          ticks: {
            min: 200,
            max: 1000,
            stepSize: 200,
            callback: (value) => `${value / 10} °C`,
          },
        },
      ],
    },
  },
};

const warningIdList = [
  "overTemperature",
  "overCurrent",
  "CHG",
  "DSG",
  "underVoltage",
  "overVoltage",
];
const infoIdList = ["power", "SoC", "vPackInfo", "cPackInfo", "tPackInfo"];

let interface = {};

window.onload = () => {
  interface = {
    ...interface,
    vGraph: new Chart(
      document.getElementById("vPack").getContext("2d"),
      defaultVGraphOptions
    ),
    cGraph: new Chart(
      document.getElementById("cPack").getContext("2d"),
      defaultCGraphOptions
    ),
    tGraph: new Chart(
      document.getElementById("tPack").getContext("2d"),
      defaultTGraphOptions
    ),
    warningList: warningIdList.reduce((accumulator, currentId) => {
      accumulator[currentId] = document.getElementById(currentId);
      return accumulator;
    }, {}),
    infoList: infoIdList.reduce((accumulator, currentId) => {
      accumulator[currentId] = document.getElementById(currentId);
      return accumulator;
    }, {}),
  };

  client.connect({
    onSuccess: () => {
      console.log("MQTT Connected Succesfully");
      client.subscribe("0x186455F4");
      client.subscribe("0x186555F4");
      client.subscribe("0x186655F4");
      client.subscribe("0x186755F4");
    },
  });
};

client.onConnectionLost = (responseObject) => {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
};

client.onMessageArrived = (message) => {
  const topic = message.destinationName;
  const data = message.payloadString.split(";");
  console.log(topic);
  console.log(data);
  const { overTemperature, overCurrent, CHG, DSG, overVoltage, underVoltage } =
    interface.warningList;

  const { SoC, cPackInfo, vPackInfo, tPackInfo, power } = interface.infoList;

  const { red, green } = warningColors;

  switch (topic) {
    case "0x186455F4":
      boatBattery.power = Number(data[3]);
      power.innerHTML = `${boatBattery.power} W`;
      overTemperature.style.backgroundColor =
        data[2][0] == "1" || data[2][1] == "1" ? red : green;
      overCurrent.style.backgroundColor =
        data[2][2] == "1" || data[2][3] == "1" ? red : green;
      CHG.style.backgroundColor = data[2][4] == "1" ? red : green;
      DSG.style.backgroundColor = data[2][5] == "1" ? red : green;
      overVoltage.style.backgroundColor = data[2][6] == "1" ? red : green;
      underVoltage.style.backgroundColor = data[2][7] == "1" ? red : green;
      break;

    case "0x186555F4":
      boatBattery.SoC = parseInt(data[3]);
      SoC.innerHTML = `${boatBattery.SoC} %`;

      boatBattery.cPack = (parseInt(data[2]) + parseInt(data[1])) / 2;
      cPackInfo.innerHTML = `${boatBattery.cPack / 10} A`;
      updateCGraph();

      boatBattery.vPack = parseInt(data[0]);
      vPackInfo.innerHTML = `${boatBattery.vPack / 10} V`;
      updateVGraph();

      break;

    case "0x186655F4":
      boatBattery.cellTemp.cell4 = parseInt(data[3]);
      boatBattery.cellTemp.cell3 = parseInt(data[2]);
      boatBattery.cellTemp.cell2 = parseInt(data[1]);
      boatBattery.cellTemp.cell1 = parseInt(data[0]);
      boatBattery.tPack =
        Object.values(boatBattery.cellTemp).reduce((a, b) => a + b, 0) /
          Object.values(boatBattery.cellTemp).filter((val) => val !== 0)
            .length || 0;
      tPackInfo.innerHTML = `${boatBattery.tPack / 10} °C`;
      break;

    case "0x186755F4":
      boatBattery.cellTemp.cell8 = parseInt(data[3]);
      boatBattery.cellTemp.cell7 = parseInt(data[2]);
      boatBattery.cellTemp.cell6 = parseInt(data[1]);
      boatBattery.cellTemp.cell5 = parseInt(data[0]);
      boatBattery.tPack =
        Object.values(boatBattery.cellTemp).reduce((a, b) => a + b, 0) /
          Object.values(boatBattery.cellTemp).filter((val) => val !== 0)
            .length || 0;
      tPackInfo.innerHTML = `${boatBattery.tPack / 10} °C`;
      updateTGraph();
      break;

    default:
      break;
  }
};
