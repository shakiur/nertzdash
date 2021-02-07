import React from "react";
import Draggable from "react-draggable";

const CardDeckHolder = ({
  playerPos,
  playerUuid,
  broadcastTime,
  solitaireDeck,
  solitairePile,
  leftoverSolitairePile,
  flipSolitaireCards,
  broadcastPlayerSolitaire,
  setBroadcastPlayerUuid
}) => {
  function handleSolitaireFlip() {
    flipSolitaireCards(solitaireDeck, solitairePile, leftoverSolitairePile)
    setBroadcastPlayerUuid(playerUuid)

    const delay = 25
    const currentTime = new Date().getTime();
    const meetsDelayThreshold = (currentTime - delay) > broadcastTime

    /*
    if(meetsDelayThreshold) {
      broadcastPlayerSolitaire(playerPos, playerUuid, solitaireDeck, solitairePile, leftoverSolitairePile);
    }
    */
  }
  return (
    <Draggable
    >
      <div
        className="CardDeckHolder"
        onClick={() => handleSolitaireFlip()}
      >
      </div>
    </Draggable>
  )
}

export default CardDeckHolder
