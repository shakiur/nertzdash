import React from "react";
import Draggable from "react-draggable";

const CardDeckHolder = ({
  playerPos,
  playerUuid,
  solitaireDeck,
  solitairePile,
  leftoverSolitairePile,
  flipSolitaireCards
}) => {
  return (
    <Draggable
    >
      <div
        className="CardDeckHolder"
        onClick={() => flipSolitaireCards(solitaireDeck, solitairePile, leftoverSolitairePile)}
      >
      </div>
    </Draggable>
  )
}

export default CardDeckHolder
