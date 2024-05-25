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


