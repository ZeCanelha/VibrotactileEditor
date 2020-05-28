import * as d3 from "d3";

const DEFAULT_MARGIN = {
  right: 0,
  top: 0,
  bottom: 0,
  left: 0,
};

class PatternUtils {
  static createScale(
    scaleType,
    width = 0,
    height = 0,
    margin = DEFAULT_MARGIN
  ) {
    switch (scaleType) {
      case "xScale":
        return d3.scaleLinear().range([margin.left, width - margin.right]);
      case "yScale":
        return d3.scaleLinear().range([margin.top, height - margin.bottom]);
      default:
        return "SCALE_TYPE_ERROR";
    }
  }

  static createAxis(axis, scale) {
    switch (axis) {
      case "y":
        return d3.axisLeft().scale(scale);
      case "x":
        return d3.axisBottom().scale(scale);
      default:
        return "AXIS_CREATION_ERROR";
    }
  }

  static createChart(
    chartType,
    datapoints,
    xScale,
    yScale,
    height = 0,
    margin = DEFAULT_MARGIN
  ) {
    switch (chartType) {
      case "line":
        let lineGenerator = d3.line();
        lineGenerator.x((d) => xScale(d.time));
        lineGenerator.y((d) => yScale(d.intensity));
        return lineGenerator(datapoints);
      case "area":
        let areaGenerator = d3.area();
        areaGenerator.x((d) => xScale(d.time));
        areaGenerator.y1((d) => yScale(d.intensity)); // Topline
        areaGenerator.y0(height - margin.bottom); // Baseline
        return areaGenerator(datapoints);
      default:
        return "AREA_TYPE_ERROR";
    }
  }
}

export default PatternUtils;
