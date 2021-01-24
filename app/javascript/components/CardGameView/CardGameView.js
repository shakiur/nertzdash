import React from "react";
import PropTypes from "prop-types";
import PlayerTable from "./components/PlayerTable/PlayerTable"
import CenterTable from "./components/CenterTable/CenterTable"

class CardGameView extends React.Component {
  render () {
    return (
      <section className="CardGameView">
        <section className="TopRow">
          <PlayerTable playerPos={1} />
          <PlayerTable playerPos={2} />
        </section>

        <section className="MiddleRow">
          <PlayerTable playerPos={3} />
          <CenterTable/>
          <PlayerTable playerPos={4}/>
        </section>

        <section className="BottomRow">
          <PlayerTable playerPos={5} />
          <PlayerTable playerPos={6} />
        </section>
      </section>
    );
  }
}

export default CardGameView
