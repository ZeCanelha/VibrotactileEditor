import * as d3 from "d3";

const DEFAULT_MARGIN = { top: 10, right: 30, bottom: 30, left: 40 };

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

  static getInsertionPoint(datapoints, time) {
    let bisect = d3.bisector((d) => d.time).right;
    return bisect(datapoints, time);
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
        return lineGenerator;
      case "area":
        let areaGenerator = d3.area();
        areaGenerator.x((d) => xScale(d.time));
        areaGenerator.y1((d) => yScale(d.intensity)); // Topline
        areaGenerator.y0(height - margin.bottom); // Baseline
        return areaGenerator;
      default:
        return "AREA_TYPE_ERROR";
    }
  }
}

export default PatternUtils;
