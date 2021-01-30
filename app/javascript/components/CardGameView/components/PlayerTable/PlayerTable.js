import React from "react";
import PropTypes from "prop-types";
import Card from "../../components/Card/Card"
import CardHolder from "../../components/CardHolder/CardHolder"

const PlayerTable = ({ playerPos, playerUuid, xPos, yPos, setXPos, setYPos}) => {
  return (
    <div className="PlayerTable">
      <div className="CardDeckArea">
        <Card
          playerPos={playerPos}
          playerUuid={playerUuid}
          xPos={xPos}
          yPos={yPos}
          setXPos={setXPos}
          setYPos={setYPos}
        />
      </div>
      <div className="SolitaireArea">
        <CardHolder/>
      </div>
      <div className="SolitaireArea">
        <CardHolder/>
      </div>
      <div className="SolitaireArea">
        <CardHolder/>
      </div>
      <div className="SolitaireArea">
        <CardHolder/>
      </div>
    </div>
  )
}

export default PlayerTable;
