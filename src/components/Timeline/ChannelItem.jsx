import React from "react";
import Display from "../DisplayPattern";
import Button from "react-bootstrap/Button";
import Draggable from "react-draggable";
import classNames from "classnames";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faPlus } from "@fortawesome/free-solid-svg-icons";

//TODO: Initial position on the timeline. Add start time and end time according to X and end time according to max(time)%width container row

function setPatternWidth(props, patternDuration) {
  const width =
    (patternDuration * props.timelineWidth) / props.timeline.timelineTime;

  return width;
}

function timeToPixels(props, startingTime) {
  const startingCoord =
    (startingTime * props.timelineWidth) / props.timeline.timelineTime;

  return startingCoord;
}

const renderChannelItemsToTimeline = (props) => {
  return (pattern, index) => {
    const properties = {
      key: index,
      id: pattern.patternID,
      path: pattern.area,
    };
    const patternListIndex = pattern.index;
    const patternDuration = Math.max.apply(
      Math,
      pattern.datapoints.map((d) => d.time)
    );
    const patternWidth = setPatternWidth(props, patternDuration);

    const className = classNames({
      "timeline-display": true,
      selected:
        props.currentShowing === patternListIndex && props.isPatternDisplayed,
    });

    const itemClass = classNames({
      "channel-hover-info": true,
      xs: patternWidth < 200,
      s: patternWidth < 400,
    });

    return (
      <Draggable
        key={index}
        axis="x"
        bounds="parent"
        handle=".timeline-display"
        position={{ x: timeToPixels(props, pattern.x), y: 0 }}
        offsetParent={props.parent}
        grid={[5, 5]}
        scale={1}
        onStart={props.handleStart}
        onDrag={props.handleDrag}
        onStop={(event, data) =>
          props.handleStop(event, data, patternListIndex, patternWidth)
        }
      >
        <div
          className={className}
          key={index}
          onDoubleClick={() => props.openInEditor(patternListIndex)}
          style={{ width: patternWidth }}
        >
          <div className="timeline-display-hover">
            <div className={itemClass}>
              <FontAwesomeIcon
                className="channel-hover-remove"
                variant="light"
                onClick={() => props.removePattern(patternListIndex)}
                icon={faTimesCircle}
              />

              <FontAwesomeIcon
                className="channel-add-pattern"
                size="2x"
                onClick={props.addNewPattern}
                icon={faPlus}
              ></FontAwesomeIcon>

              <span>Double click to edit</span>
            </div>
          </div>
          <Display {...properties}></Display>
        </div>
      </Draggable>
    );
  };
};

export default (props) => {
  return props.patternList.map(renderChannelItemsToTimeline(props));
};
