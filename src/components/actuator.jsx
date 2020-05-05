import React from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrochip } from "@fortawesome/free-solid-svg-icons";

const actuator = (props) => {
  return (
    <div className="actuator">
      <Button variant="outline-dark">
        <FontAwesomeIcon icon={faMicrochip} />
      </Button>
    </div>
  );
};

export default actuator;
