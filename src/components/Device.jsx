import React from "react";
import * as d3 from "d3";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateActuatorCoords } from "../stores/device/deviceActions";

import Image from "react-bootstrap/Image";

const mapStateToProps = (state) => ({
  deviceImage: state.device.deviceImage,
  actuators: state.device.actuators,
  actuators_coords: state.device.actuators_coords,
  setShow: state.gui.isInitialModalOpen,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ updateActuatorCoords }, dispatch);

let theobject = null;
class PatternEditor extends React.Component {
  dragged(d) {
    d3.select(this)
      .select("text")
      .attr("x", d3.event.x - d.radius / 4)
      .attr("y", d3.event.y + d.radius / 4);
    d3.select(this)
      .select("circle")
      .attr("cx", d3.event.x)
      .attr("cy", d3.event.y);
  }
  draggend(d, i) {
    console.log(i);
    let updatedDataset = theobject.props.actuators_coords;

    updatedDataset[i].cx = d3.event.x;
    updatedDataset[i].cy = d3.event.y;

    theobject.props.updateActuatorCoords(updatedDataset);
  }

  addActuators(dataset) {
    const svg = d3.select(this.refs.svg);

    let group = svg
      .selectAll("g")
      .data(dataset)
      .join(
        (enter) => enter.append("g"),
        (update) => update,
        (exit) => {
          svg.selectAll("circle").remove();
          svg.selectAll("text").remove();
          exit.remove();
        }
      )
      .call(d3.drag().on("drag", this.dragged).on("end", this.draggend));

    group
      .append("circle")
      .attr("cx", (d) => d.cx)
      .attr("cy", (d) => d.cy)
      .attr("r", (d) => d.radius)
      .attr("fill", "black")
      .attr("stroke", "black");

    group
      .append("text")
      .text((d) => d.id)
      .attr("x", (d) => d.cx - d.radius / 4)
      .attr("y", (d) => d.cy + d.radius / 4)
      .attr("fill", "white");
  }

  updateDataset() {
    const radius = 20;

    let dataset = [];
    let inicialSpacing = 0;

    for (let index = 0; index < this.props.actuators; index++) {
      dataset.push({
        cx: inicialSpacing + radius,
        cy: radius,
        radius: radius,
        id: index + 1,
      });
      inicialSpacing += radius * 2.5;
    }
    this.addActuators(dataset);
    this.props.updateActuatorCoords(dataset);
  }

  componentDidMount() {
    theobject = this;
    const svgContainer = this.refs.svgoverlay;
    const width = svgContainer.clientWidth;
    const height = svgContainer.clientHeight;

    d3.select(this.refs.svg).attr("width", width).attr("height", height);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.actuators !== this.props.actuators) {
      this.updateDataset();
    }
  }

  render() {
    let imagePreview;
    if (this.props.deviceImage && !this.props.setShow) {
      //let preview = URL.createObjectURL(this.props.deviceImage);
      imagePreview = <Image src={this.props.deviceImage} fluid />;
    }
    return (
      <div className="hardware-container bg-light border rounded">
        {this.props.deviceImage ? imagePreview : null}
        <div className="overlay-svg" ref={"svgoverlay"}>
          <svg ref={"svg"}></svg>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatternEditor);
