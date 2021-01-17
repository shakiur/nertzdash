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
      <section className="CardGameView">
        <section className="TopRow">
          <PlayerTable/>
          <PlayerTable/>
        </section>

        <div className="SpaceRow">
        </div>

        <section className="MiddleRow">
          <PlayerTable/>
          <CenterTable/>
          <PlayerTable/>
        </section>

        <div className="SpaceRow">
        </div>

        <section className="BottomRow">
          <PlayerTable/>
          <PlayerTable/>
        </section>
      </section>
    );
  }
}

export default CardGameView
