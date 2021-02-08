import React from "react";
import Draggable from "react-draggable";

const CardDeckHolder = ({
  playerPos,
  playerUuid,
  broadcastTime,
  solitaireDeck,
  solitairePile,
  solitaireLeftoverPile,
  flipSolitaireCards,
  broadcastPlayerSolitaire,
  setBroadcastPlayerUuid
}) => {
  function handleSolitaireFlip() {
    flipSolitaireCards(solitaireDeck, solitairePile, solitaireLeftoverPile)
    setBroadcastPlayerUuid(playerUuid)

    const delay = 25
    const currentTime = new Date().getTime();
    const meetsDelayThreshold = (currentTime - delay) > broadcastTime

    /*
    if(meetsDelayThreshold) {
      broadcastPlayerSolitaire(playerPos, playerUuid, solitaireDeck, solitairePile, solitaireLeftoverPile);
    }
    */
  }
  return (
    <div
      className="CardDeckHolder"
      onClick={() => handleSolitaireFlip()}
    >
    </div>
  )
}

export default CardDeckHolder
