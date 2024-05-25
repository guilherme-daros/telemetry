const warningColors = {
  red: "#ff0000",
  green: "#00ca00",
};

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

const warningIdList = [
  "overTemperature",
  "overCurrent",
  "CHG",
  "DSG",
  "underVoltage",
  "overVoltage",
];
const infoIdList = ["power", "SoC", "vPackInfo", "cPackInfo", "tPackInfo"];


