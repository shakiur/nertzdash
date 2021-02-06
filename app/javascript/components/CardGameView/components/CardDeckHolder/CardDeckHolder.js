import React from "react";
import Draggable from "react-draggable";

const CardDeckHolder = ({
  playerPos,
  playerUuid,
  cardDeck,
  threeCardArea,
  flipSolitaireCards
}) => {
  return (
    <Draggable
    >
      <div
        className="CardDeckHolder"
        onClick={() => flipSolitaireCards(cardDeck, threeCardArea)}
      >
      </div>
    </Draggable>
  )
}

export default CardDeckHolder
