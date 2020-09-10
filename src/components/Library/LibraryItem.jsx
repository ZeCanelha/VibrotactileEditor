import React from "react";
import Display from "../DisplayPattern";
import Col from "react-bootstrap/Col";

const renderPatternToLibrary = (props) => {
  return (object, index) => {
    const properties = {
      key: index,
      id: object.patternID,
      path: object.path,
    };

    return (
      <Col
        className="library-display"
        key={index}
        xs={6}
        md={4}
        onClick={() => props.openDetails(properties)}
      >
        <Display {...properties}></Display>
      </Col>
    );
  };
};

export default (props) => {
  return props.patterns.map(renderPatternToLibrary(props));
};
