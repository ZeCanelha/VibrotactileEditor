import React from "react";
import Display from "../DisplayPattern";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Draggable from "react-draggable";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faPlus } from "@fortawesome/free-solid-svg-icons";

//TODO: Initial position on the timeline. Add start time and end time according to X and end time according to max(time)%width container row
//TODO: If display == true verificar o selected

function isSelected(props, index) {
  console.log("not called");
  if (props.currentShowing === index && props.isPatternDisplayed)
    return "timeline-display selected";
  return "timeline-display";
}

const renderChannelItemsToTimeline = (props) => {
  return (pattern, index) => {
    const properties = {
      key: index,
      id: pattern.patternID,
      path: pattern.area,
    };

    let patternListIndex = pattern.index;
    let className = isSelected(props, patternListIndex);
    return (
      <Draggable
        key={index}
        axis="x"
        bounds="parent"
        handle=".timeline-display"
        defaultPosition={{ x: 0, y: 0 }}
        position={{ x: pattern.x, y: pattern.y }}
        grid={[5, 5]}
        scale={1}
        onStart={props.handleStart}
        onDrag={props.handleDrag}
        onStop={(event, data) => props.handleStop(event, data, index)}
      >
        <Col
          className={className}
          key={index}
          xs={6}
          md={4}
          onDoubleClick={() => props.openInEditor(patternListIndex)}
        >
          <div className="timeline-display-hover">
            <div className="channel-hover-info">
              <Button
                className="channel-hover-remove"
                variant="light"
                size="sm"
                onClick={() => props.removePattern(patternListIndex)}
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
  return props.patternList.map(renderChannelItemsToTimeline(props));
};
