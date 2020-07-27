import React from "react";
import * as d3 from "d3";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateActuatorCoords } from "../stores/editor/editorActions";

import Image from "react-bootstrap/Image";

const mapStateToProps = (state) => ({
  deviceImage: state.config.deviceImage,
  actuators: state.config.actuators,
  actuators_coords: state.config.actuators_coords,
  setShow: state.gui.isInitialModalOpen,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ updateActuatorCoords }, dispatch);

let theobject = null;
class PatternEditor extends React.Component {
  dragged() {
    d3.select(this).attr("cx", d3.event.x).attr("cy", d3.event.y);
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
    svg
      .selectAll("circle")
      .data(dataset)
      .join(
        (enter) => enter.append("circle"),
        (update) => update,
        (exit) => exit.remove()
      )
      .attr("cx", (d) => d.cx)
      .attr("cy", (d) => d.cy)
      .attr("r", (d) => d.radius)
      .attr("fill", "#5bc0de")
      .attr("stroke", "black")
      .call(d3.drag().on("drag", this.dragged).on("end", this.draggend));
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
