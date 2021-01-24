import React from "react";
import PropTypes from "prop-types";
import Draggable from "react-draggable";

export default class Card extends React.Component {
  static propTypes = {
    playerPos: PropTypes.number.isRequired
  }

  state = {
    x_pos: 0,
    y_pos: 0,
    highlightCard: false
  }

  handleHighlight = () => {
    this.setState({highlightCard: true})
  }

  handleSnapPosition = () => {
    let nearSolitaire1 = (
      (this.state.x_pos > 35 && this.state.x_pos < 85) &&
      (this.state.y_pos > 0 && this.state.y_pos < 35)
    )

    let nearSolitaire2 = (
      (this.state.x_pos > 95 && this.state.x_pos < 145) &&
      (this.state.y_pos > 0 && this.state.y_pos < 35)
    )

    let nearSolitaire3 = (
      (this.state.x_pos > 155 && this.state.x_pos < 205) &&
      (this.state.y_pos > 0 && this.state.y_pos < 35)
    )

    let nearSolitaire4 = (
      (this.state.x_pos > 215 && this.state.x_pos < 265) &&
      (this.state.y_pos > 0 && this.state.y_pos < 35)
    )

    if(nearSolitaire1) {
      this.setState({x_pos: 60, y_pos: 0, highlightCard: true});
    } else if(nearSolitaire2) {
      this.setState({x_pos: 120, y_pos: 0, highlightCard: true});
    } else if(nearSolitaire3) {
      this.setState({x_pos: 180, y_pos: 0, highlightCard: true});
    } else if (nearSolitaire4) {
      this.setState({x_pos: 240, y_pos: 0, highlightCard: true});
    } else {
      this.setState({x_pos: 0, y_pos: 0, highlightCard: false});
    }
  }

  updateXYPos = (event, ui) => {
    this.setState({
      x_pos: this.state.x_pos + ui.deltaX,
      y_pos: this.state.y_pos + ui.deltaY
    });

    let requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        x_pos: this.state.x_pos,
        y_pos: this.state.y_pos
      })
    };

    fetch('/card_game/update_position?player_pos='+this.props.playerPos+'&x_pos='+this.state.x_pos+'&y_pos='+this.state.y_pos);
  }

  render() {
    const color = this.state.highlightCard ? `HighlightColor` : `DefaultColor`
    const classes = `Card ${color}`

    return (
      <Draggable
        onDrag={this.updateXYPos}
        onStart={this.handleHighlight}
        onStop={this.handleSnapPosition}
        position={{x: this.state.x_pos, y: this.state.y_pos}}
      >
        <div className={classes}>
        </div>
      </Draggable>
    )
  }
}
