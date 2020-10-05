import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";

const usage = ["Rehabilitation", "User Experience", "Haptics"];
const keywords = ["Vibration", "Strength", "Actuators", "ERM"];

export default (props) => {
  return (
    <div className="library-search-form">
      <Formik
        enableReinitialize
        initialValues={{
          patternName: "",
          rangeInput: 300,
        }}
        onSubmit={props.handleSearch}
        onReset={props.handleReset}
      >
        {({ handleSubmit, handleChange, handleReset, values }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="patternName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="patternName"
                onChange={handleChange}
                placeholder="Search ..."
                value={values.patternName || ""}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Usage</Form.Label>
              {usage.map((item, index) => (
                <div key={index} className="flex-wrap m-1">
                  <Form.Check
                    name={item}
                    onChange={handleChange}
                    inline
                    value=""
                    type={"checkbox"}
                    id={"default-checkbox"}
                    label={item}
                  ></Form.Check>
                </div>
              ))}
            </Form.Group>
            <Form.Group>
              <Form.Label>Keywords</Form.Label>
              {keywords.map((item, index) => (
                <div key={index} className="flex-wrap m-1">
                  <Form.Check
                    name={item}
                    onChange={handleChange}
                    inline
                    value=""
                    type={"checkbox"}
                    id={"default-checkbox"}
                    label={item}
                  ></Form.Check>
                </div>
              ))}
            </Form.Group>

            <Form.Group controlId="patternDuration">
              <Form.Label>Pattern Duration</Form.Label>
              <span>: {props.rangeValue}</span>
              <Form.Control
                name="rangeInput"
                type="range"
                min="0"
                value={props.rangeValue}
                max="700"
                onChange={props.handleChangeRange}
              />
            </Form.Group>
            <Button variant="primary" block type="submit">
              Search
            </Button>
            <Button variant="outline-primary" block onClick={handleReset}>
              Reset form
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
