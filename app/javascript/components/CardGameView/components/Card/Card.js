import "./Card.scss"

import React from "react";
import PropTypes from "prop-types";
import Draggable from "react-draggable";

export default class Card extends React.Component {
  render() {
    return (
      <Draggable>
        <div className="Card">
        </div>
      </Draggable>
    )
  }
}
