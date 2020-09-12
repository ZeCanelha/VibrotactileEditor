import React from "react";
import Display from "../DisplayPattern";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Draggable from "react-draggable";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faPlus } from "@fortawesome/free-solid-svg-icons";

//TODO: Initial position on the timeline. Add start time and end time according to X and end time according to max(time)%width container row

const renderChannelItemsToTimeline = (props) => {
  return (object, index) => {
    const properties = {
      key: index,
      id: object.id,
      path: object.path,
    };
    return (
      <Draggable
        key={index}
        axis="x"
        bounds="parent"
        handle=".timeline-display"
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        grid={[5, 5]}
        scale={1}
        onStart={props.handleStart}
        onDrag={props.handleDrag}
        onStop={props.handleStop}
      >
        <Col
          className="timeline-display"
          key={index}
          xs={6}
          md={4}
          onDoubleClick={() => props.openInEditor(index)}
        >
          <div className="timeline-display-hover">
            <div className="channel-hover-info">
              <Button
                className="channel-hover-remove"
                variant="light"
                size="sm"
                onClick={() => props.removePattern(index)}
              >
                <FontAwesomeIcon icon={faTimesCircle} />
              </Button>
              <span>Double click to edit</span>
            </div>
            <div className="channel-hover-add">
              <Button variant="outline-dark" onClick={props.addNewPattern}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </div>
          </div>

          <Display {...properties}></Display>
        </Col>
      </Draggable>
    );
  };
};

export default (props) => {
  return props.channel.map(renderChannelItemsToTimeline(props));
};
