import React from "react";
import PropTypes from "prop-types";
import Draggable from "react-draggable";
import actionCable from "actioncable";

const cableApp = {}

export default class Card extends React.Component {
  componentDidMount() {
    if(this.props.playerPos === 1) {
      cableApp.cable = actionCable.createConsumer()

      cableApp.cable.subscriptions.create({
        channel: 'CardGameChannel'
      }, {
        received: (data) => {
          console.log(data);

          if(
            (parseInt(data["player_pos"]) === this.props.playerPos) &&
            (parseInt(data["time"]) > this.state.time) &&
            (data["player_uuid"] !== this.props.playerUuid)
          ) {
            this.setState({ x_pos: parseInt(data["x_pos"]), y_pos: parseInt(data["y_pos"]), time: parseInt(data["time"]) });
          }
        }
      })
    }

  }

  static propTypes = {
    playerPos: PropTypes.number.isRequired,
    playerUuid: PropTypes.string.isRequired
  }

  state = {
    x_pos: 0,
    y_pos: 0,
    time: new Date().getTime(),
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
      this.updateXYPosition(60, 0, 0);
    } else if(nearSolitaire2) {
      this.updateXYPosition(120, 0, 0);
    } else if(nearSolitaire3) {
      this.updateXYPosition(180, 0, 0);
    } else if (nearSolitaire4) {
      this.updateXYPosition(240, 0, 0);
    } else {
      this.updateXYPosition(0, 0, 0);
    }
  }

  updateXYDelta = (event, ui) => {
    this.updateXYPosition(this.state.x_pos + ui.deltaX, this.state.y_pos + ui.deltaY, 8);
  }

  updateXYPosition = (new_x_pos, new_y_pos, delayTime) => {
    const previousTime = this.state.time;
    const currentTime = new Date().getTime();

    this.setState({ x_pos: new_x_pos, y_pos: new_y_pos, time: currentTime});

    if((currentTime - delayTime) > previousTime) {
      fetch('/card_game/update_position?' +
        'player_pos=' + this.props.playerPos +
        '&player_uuid=' + this.props.playerUuid +
        '&x_pos=' + new_x_pos +
        '&y_pos=' + new_y_pos +
        '&time=' + currentTime
       );
    }
   }

  render() {
    const color = this.state.highlightCard ? `HighlightColor` : `DefaultColor`
    const classes = `Card ${color}`

    return (
      <Draggable
        onDrag={this.updateXYDelta}
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
