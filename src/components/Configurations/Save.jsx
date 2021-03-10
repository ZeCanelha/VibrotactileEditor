import React from "react";
import { saveAs } from "file-saver";
import audioEncoder from "audio-encoder";
import * as d3 from "d3";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  closeSaveModal,
  openSaveModal,
  showNotification,
} from "../../stores/gui/guiActions";
import {
  setSaveNotification,
  setAddWarningNotification,
} from "../../stores/notification/notificationAction";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Database from "../../utils/database";
import Form from "react-bootstrap/Form";

const mapStateToProps = (state) => ({
  setShow: state.gui.isSaveModalOpen,
  patternList: state.pattern.patterns,
  config: state.config,
  device: state.device,
  timeline: state.timeline,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      closeSaveModal,
      openSaveModal,
      showNotification,
      setSaveNotification,
      setAddWarningNotification,
    },
    dispatch
  );

class SaveModal extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      wavModal: false,
      samplingRate: 22000,
      fileName: "sound",
    };

    this.samplingRate = [22000, 24000, 32000, 44100];
    this.handleChangeFileName = this.handleChangeFileName.bind(this);
    this.handleWavModal = this.handleWavModal.bind(this);
    this.handleSamplingRateChange = this.handleSamplingRateChange.bind(this);
    this.isProjectSaving = this.isProjectSaving.bind(this);
    this.saveProjectConfigurations = this.saveProjectConfigurations.bind(this);
    this.exportProject = this.exportProject.bind(this);
    this.exportAsWavFile = this.exportAsWavFile.bind(this);
  }

  isProjectSaving() {
    this.setState({ isLoading: !this.state.isLoading });
  }
  handleWavModal() {
    this.setState({ wavModal: !this.state.wavModal });
  }

  handleSamplingRateChange(e) {
    this.setState({ samplingRate: e.target.value });
  }

  handleChangeFileName(e) {
    this.setState({ fileName: e.target.value });
  }

  exportProject(toWave = null) {
    this.isProjectSaving();

    const patterns = this.props.patternList;
    const channels = this.props.timeline.channel;
    const FPS = 5;
    const saveFilename = this.props.config.projectName + ".json";

    let timelineData = [];
    channels.forEach((channel) => {
      let channelPatterns = [];
      let channelActuators = [];

      channel.actuators.forEach((id) => {
        channelActuators.push(id);
      });

      patterns.forEach((pattern, i) => {
        if (pattern.channelID === channel._id) {
          channelPatterns.push({
            startingTime: pattern.x,
            duration: Math.max.apply(
              Math,
              pattern.datapoints.map((d) => d.time)
            ),
            datapoints: pattern.datapoints,
          });
        }
      });
      timelineData.push({
        patterns: channelPatterns,
        actuators: channelActuators,
      });
    });

    let exportFile = {
      samplingRate: FPS,
      numberOfActuators: this.props.device.actuators_coords.length,
      channels: timelineData,
    };

    if (toWave) {
      this.isProjectSaving();
      return exportFile;
    }
    let blob = new Blob([JSON.stringify(exportFile)], {
      type: "text/json;charset=utf-8",
    });
    saveAs(blob, saveFilename);

    this.isProjectSaving();
    this.props.closeSaveModal();
  }

  fillEmptyTime(startTime, lastPatternTime, fps) {
    let fillTime = startTime - lastPatternTime;

    let fillTimeSamples = Math.round(fillTime * (fps / 1000));

    let fillTimeArray = [];
    for (let index = 0; index < fillTimeSamples; index++) {
      fillTimeArray.push(0.01);
    }

    return fillTimeArray;
  }

  getPatternTime(pattern) {
    return Math.max.apply(
      Math,
      pattern.map((d) => d.time)
    );
  }

  interpolator(datapoints, samplingRate) {
    let fps = samplingRate / 1000;
    let interpolatedPoints = [];

    for (let index = 1; index < datapoints.length; index++) {
      const interpolator = d3.interpolate(
        datapoints[index - 1],
        datapoints[index]
      );
      let timeDiference = datapoints[index].time - datapoints[index - 1].time;

      timeDiference = Math.round(timeDiference * fps);

      for (let j = 1; j <= timeDiference; j++) {
        const element = interpolator(j * (1 / timeDiference));
        interpolatedPoints.push(element.intensity / 100);
      }
    }
    return interpolatedPoints;
  }

  exportAsWavFile() {
    const samplingRate = this.state.samplingRate;
    const getTimeline = this.exportProject(true);
    const vibrationData = getTimeline.channels;

    let time = 0; // In seconds
    let vibesArray = [];

    try {
      vibrationData.forEach((channel) => {
        let channelPatterns = [];
        let lastPatternTime = 0;

        channel.patterns.sort((a, b) => a.startingTime - b.startingTime);

        channel.patterns.forEach((pattern) => {
          let toInterpolatePoints = [];
          let interpolatedPoints = [];
          let fillTime = this.fillEmptyTime(
            pattern.startingTime,
            lastPatternTime,
            samplingRate
          );

          toInterpolatePoints = pattern.datapoints;
          lastPatternTime += this.getPatternTime(pattern.datapoints);
          if (lastPatternTime > time) time = lastPatternTime;
          interpolatedPoints = this.interpolator(
            toInterpolatePoints,
            samplingRate
          );

          channelPatterns = channelPatterns.concat(
            fillTime,
            interpolatedPoints
          );
        });
        vibesArray.push(channelPatterns);
      });
    } catch (error) {
      console.log(error);
    }

    // Convert to seconds

    time = time / 1000;

    let allCompleted = true;
    let errorMessage = "";

    for (let i = 0; i < this.props.timeline.channel.length; i++) {
      let audioContext = new AudioContext();
      let audioBuffer = audioContext.createBuffer(
        1,
        samplingRate * time,
        samplingRate
      );
      let nowBuffering = audioBuffer.getChannelData(0);
      for (let j = 0; j < nowBuffering.length; j++) {
        nowBuffering[j] = vibesArray[i][j];
      }

      let filename = this.state.fileName + "_channel_" + i + ".wav";
      try {
        audioEncoder(audioBuffer, 0, null, function onComplete(blob) {
          saveAs(blob, filename);
        });
      } catch (error) {
        console.log(error);
        errorMessage = error.message;
        allCompleted = false;
      }
    }

    if (allCompleted) {
      this.props.setAddWarningNotification("Project exported with success!");
      this.props.closeSaveModal();
      this.handleWavModal();
    } else {
      this.props.setAddWarningNotification(errorMessage);
      this.props.showNotification();
    }
  }

  saveProjectConfigurations() {
    this.isProjectSaving();

    let projectConfiguration = {
      projectName: this.props.config.projectName,
      device: this.props.device.hardwareDevice,
      nActuators: this.props.device.actuators_coords.length,
      actuatorCoords: this.props.device.actuators_coords,
      deviceImage: this.props.device.deviceImage,
      patternList: this.props.patternList,
    };

    Database.postData(
      "/configs",
      projectConfiguration,
      "PUT",
      "/" + this.props.config.dbInstance
    ).then((data) => {
      if (!data) {
        this.props.setAddWarningNotification(
          "Network Error! Could not save project settings. Try again later!"
        );
      } else {
        Database.postData(
          "/timeline",
          {
            channel: this.props.timeline.channel,
            timelineTime: this.props.timeline.timelineTime,
          },
          "PUT",
          "/" + this.props.timeline.timelineDbInstance
        )
          .then((data) => {
            if (!data) {
              this.props.setAddWarningNotification(
                "Network Error! Could not save project settings. Try again later!"
              );
            } else {
              this.props.setSaveNotification();
            }
          })
          .catch((error) => {
            this.props.setAddWarningNotification(
              "Network Error! Could not save project settings. Try again later!"
            );
          });
      }

      this.props.closeSaveModal();
      this.isProjectSaving();
      this.props.showNotification();
    });
  }
  render() {
    return (
      <React.Fragment>
        <Button
          className="sl-btn"
          variant="primary"
          size="sm"
          onClick={this.props.openSaveModal}
        >
          Save
        </Button>
        <Modal
          show={this.props.setShow}
          dialogClassName="modal-20vw"
          backdrop="static"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header>
            <Modal.Title id="example-custom-modal-styling-title">
              Save Options
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.wavModal ? (
              <Form className="export-wav">
                <Form.Group>
                  <Form.Label>File name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleChangeFileName}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Number of channels</Form.Label>
                  <Form.Control as="select">
                    <option>{this.props.timeline.channel.length}</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Sampling Rate</Form.Label>
                  <Form.Control
                    onChange={this.handleSamplingRateChange}
                    as="select"
                  >
                    {this.samplingRate.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form>
            ) : (
              <React.Fragment>
                <p>
                  Save or export project. Project can be exported to JSON format
                  or WAV Format. JSON allows to use with @Unity and @A-Frame
                  Components (See documentation).
                </p>
                <Button variant="primary" block onClick={this.exportProject}>
                  {this.state.isLoading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Export as JSON"
                  )}
                </Button>
                <Button variant="primary" block onClick={this.handleWavModal}>
                  {this.state.isLoading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Export as WAV"
                  )}
                </Button>
              </React.Fragment>
            )}
          </Modal.Body>
          <Modal.Footer>
            {this.state.wavModal ? (
              <React.Fragment>
                <Button variant="primary" block onClick={this.exportAsWavFile}>
                  Export
                </Button>
                <Button
                  variant="outline-primary"
                  block
                  onClick={this.handleWavModal}
                >
                  Back
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Button
                  variant="primary"
                  block
                  onClick={this.saveProjectConfigurations}
                >
                  {this.state.isLoading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Save Project"
                  )}
                </Button>
                <Button
                  variant="outline-primary"
                  block
                  onClick={this.props.closeSaveModal}
                >
                  Close
                </Button>
              </React.Fragment>
            )}
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveModal);
