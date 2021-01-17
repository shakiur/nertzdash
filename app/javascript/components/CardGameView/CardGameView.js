import "./CardGameView.scss";

import React from "react";
import PropTypes from "prop-types";
import PlayerTable from "./components/PlayerTable/PlayerTable"
import CenterTable from "./components/CenterTable/CenterTable"

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
          <PlayerTable/>
          <PlayerTable/>
        </div>

        <div className="SpaceRow">
        </div>

        <div className="MiddleRow">
          <PlayerTable/>
          <CenterTable/>
          <PlayerTable/>
        </div>

        <div className="SpaceRow">
        </div>

        <div className="BottomRow">
          <PlayerTable/>
          <PlayerTable/>
        </div>
      </div>
    );
  }
}

export default CardGameView
