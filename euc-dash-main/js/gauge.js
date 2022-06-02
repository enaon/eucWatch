async function setupGauge() {
  var opts = {
    angle: -0.2, // The span of the gauge arc
    lineWidth: 0.2, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
      length: 0.6, // // Relative to gauge radius
      strokeWidth: 0.035, // The thickness
      color: '#000000' // Fill color
    },
    strokeColor: '#EEEEEE',
    generateGradient: true,
    highDpiSupport: true,     // High resolution support
    staticZones: [
      {strokeStyle: "#a9d70b", min: 0, max: 75},
      {strokeStyle: "#f9c802", min: 75, max: 80},
      {strokeStyle: "#ff0000", min: 80, max: 100}
    ],
    staticLabels: {
      font: "10px sans-serif",
      labels: [0, 75, 80, 100],  // Print labels at these values
      color: "#000000",  // Optional: Label text color
      fractionDigits: 0  // Optional: Numerical precision. 0=round off.
    },
    limitMax: true,     // If false, max value increases automatically if value > maxValue
    limitMin: true     // If true, the min value of the gauge will be fixed
  };
  var target = document.getElementById('gauge');
  gauge = new Gauge(target).setOptions(opts);
  gauge.animationSpeed = 15;
  gauge.minValue = 0
  gauge.maxValue = 100
  gauge.set(0.1)
  gauge.setTextField(document.getElementById('gauge-value'), 1);
}
