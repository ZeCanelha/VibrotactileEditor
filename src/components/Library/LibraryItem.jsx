import React from "react";
import Display from "../DisplayPattern";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

//TODO: add to timeline

const renderPatternToLibrary = (props) => {
  return (object, index) => {
    console.log(object);
    const properties = {
      key: index,
      id: object.patternID,
      path: object.path,
    };
    return (
      <Card className="card-item" key={index}>
        <Card.Header>
          {object.name}
          <div className="library-pattern-display">
            <Display {...properties}></Display>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">Description</Card.Subtitle>
          <Card.Text>{object.description}</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">Usages</Card.Subtitle>
          <Card.Text>{object.usage}</Card.Text>
          <DropdownButton
            variant={"outline-info"}
            id="dropdown-item-button"
            title="Add to channel"
            size="sm"
          >
            <Dropdown.Item size="sm" eventKey={"1"} as="button">
              Channel 1
            </Dropdown.Item>
            <Dropdown.Item size="sm" eventKey={"2"} as="button">
              Channel 2
            </Dropdown.Item>
          </DropdownButton>
        </Card.Body>
      </Card>
    );
  };
};

export default (props) => {
  return props.patterns.map(renderPatternToLibrary(props));
};
