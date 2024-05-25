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
