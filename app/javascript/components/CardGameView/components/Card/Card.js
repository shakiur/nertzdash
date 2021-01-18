import "./Card.scss"

import React from "react";
import PropTypes from "prop-types";
import Draggable from "react-draggable";

export default class Card extends React.Component {
  state = {
    clickedCard: false
  }

  render() {
    const color = this.state.clickedCard ? `HighlightColor` : `DefaultColor`
    const classes = `Card ${color}`

    return (
      <Draggable
        onStart={() => this.setState({clickedCard: true})}
        onStop={() => this.setState({clickedCard: false})}
      >
        <div className={classes}>
        </div>
      </Draggable>
    )
  }
}
