import React from "react";
import PropTypes from "prop-types";
import Card from "../../components/Card/Card"
import CardHolder from "../../components/CardHolder/CardHolder"
import CardDeckHolder from "../../components/CardDeckHolder/CardDeckHolder"
import ThreeCardHolder from "../../components/ThreeCardHolder/ThreeCardHolder"

const PlayerTableNew = ({
  playerPos,
  playerUuid,
  xPos,
  yPos,
  broadcastTime,
  updatePlayerXYPos,
  broadcastPlayerXYPos,
  solitaireDeck,
  solitairePile,
  leftoverSolitairePile,
  flipSolitaireCards
}) => {
  return (
    <div className="PlayerTableNew">
      <div className="CardDeckArea">
        <CardDeckHolder
          playerPos={playerPos}
          playerUuid={playerUuid}
          solitaireDeck={solitaireDeck}
          solitairePile={solitairePile}
          leftoverSolitairePile={leftoverSolitairePile}
          flipSolitaireCards={flipSolitaireCards}
        />
        <ThreeCardHolder
          playerPos={playerPos}
          playerUuid={playerUuid}
          solitaireDeck={solitaireDeck}
          solitairePile={solitairePile}
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

export default PlayerTableNew;
