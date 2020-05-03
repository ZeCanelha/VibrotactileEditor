import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUndo,
  faRedo,
  faPlayCircle,
  faBackward,
  faForward,
} from "@fortawesome/free-solid-svg-icons";

export default function Toolbar() {
  return (
    <div className="border bg-light rounded w-50 ">
      <ButtonToolbar
        aria-label="Toolbar with button groups"
        className="justify-content-center align-items-center"
      >
        <ButtonGroup className="mr-2" aria-label="First group">
          <Button variant="light">
            <FontAwesomeIcon icon={faUndo} />
          </Button>
          <Button variant="light">
            <FontAwesomeIcon icon={faRedo} />
          </Button>
        </ButtonGroup>
        <ButtonGroup className="mr-2" aria-label="Second group">
          <Button variant="light">
            <FontAwesomeIcon icon={faBackward} />
          </Button>
          <Button variant="light">
            <FontAwesomeIcon size="2x" icon={faPlayCircle} />
          </Button>
          <Button variant="light">
            <FontAwesomeIcon icon={faForward} />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button size="sm" variant="light">
            Add Channel
          </Button>
          <Button size="sm" variant="light">
            Add Actuator
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
  );
}
