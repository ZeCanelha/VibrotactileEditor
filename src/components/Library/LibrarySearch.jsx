import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const usage = ["Rehabilitation", "User Experience", "Haptics"];
const keywords = ["Vibration", "Strength", "Actuators", "ERM"];

export default (props) => {
  return (
    <Col className="library-search-form" xs={3}>
      <Form>
        <Form.Group controlId="patternName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Usage</Form.Label>
          {usage.map((item) => (
            <div className="flex-wrap m-1">
              <Form.Check
                inline
                type={"checkbox"}
                id={"default-checkbox"}
                label={item}
              ></Form.Check>
            </div>
          ))}
        </Form.Group>
        <Form.Group>
          <Form.Label>Keywords</Form.Label>
          {keywords.map((item) => (
            <div className="flex-wrap m-1">
              <Form.Check
                inline
                type={"checkbox"}
                id={"default-checkbox"}
                label={item}
              ></Form.Check>
            </div>
          ))}
        </Form.Group>

        <Form.Group controlId="patternDuration">
          <Form.Label>Pattern Duration</Form.Label>
          <Form.Control name="rangeInput" type="range" min="0" max="5000" />
        </Form.Group>
        <Button variant="primary" block>
          Search
        </Button>
      </Form>
    </Col>
  );
};
