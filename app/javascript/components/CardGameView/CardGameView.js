import React from "react";
import PropTypes from "prop-types";
import PlayerTable from "./components/PlayerTable/PlayerTable"
import CenterTable from "./components/CenterTable/CenterTable"

const playerUuid = Math.random().toString(36).substring(7);

class CardGameView extends React.Component {
  render () {
    return (
      <section className="CardGameView">
        <section className="TopRow">
          <PlayerTable playerPos={1} playerUuid={playerUuid} />
          <PlayerTable playerPos={2} playerUuid={playerUuid} />
        </section>

        <section className="MiddleRow">
          <PlayerTable playerPos={3} playerUuid={playerUuid} />
          <CenterTable />
          <PlayerTable playerPos={4} playerUuid={playerUuid} />
        </section>

        <section className="BottomRow">
          <PlayerTable playerPos={5} playerUuid={playerUuid} />
          <PlayerTable playerPos={6} playerUuid={playerUuid} />
        </section>
      </section>
    );
  }
}

export default CardGameView
