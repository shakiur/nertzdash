import "./CardGameView.scss";

import React from "react";
import PropTypes from "prop-types";

class CardGameView extends React.Component {
  state = {
    showSelectPlayers: false
  }

  showSelectPlayers() {
    this.setState({showSelectPlayers: true});
  }

  render () {
    return (
      <div className="CardGameView">
        <div className="TopRow">
          <div className="Player">
          </div>
          <div className="Player">
          </div>
        </div>

        <div className="SpaceRow">
        </div>

        <div className="MiddleRow">
          <div className="Player">
          </div>
          <div className="CenterTable">
          </div>
          <div className="Player">
          </div>
        </div>

        <div className="SpaceRow">
        </div>

        <div className="BottomRow">
          <div className="Player">
          </div>
          <div className="Player">
          </div>
        </div>
      </div>
    );
  }
}

export default CardGameView
