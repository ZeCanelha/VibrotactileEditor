import React from "react";
import Display from "../DisplayPattern";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

// TODO: Pass function to remove pattern as prop.

const renderChannelItemsToTimeline = (props) => {
  return (object, index) => {
    const properties = {
      key: index,
      id: object.id,
      path: object.path,
    };
    return (
      <Col
        className="timeline-display"
        key={index}
        xs={6}
        md={4}
        onDoubleClick={() => props.openInEditor(index)}
      >
        <div className="channel-hover-items">
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

        <Display {...properties}></Display>
      </Col>
    );
  };
};

export default (props) => {
  return props.channel.map(renderChannelItemsToTimeline(props));
};
