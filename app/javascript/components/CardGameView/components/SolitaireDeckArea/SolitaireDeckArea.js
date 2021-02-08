import React from "react";
import Draggable from "react-draggable";

const CardDeckHolder = ({
  playerPos,
  playerUuid,
  broadcastTime,
  solitaireDeck,
  solitairePile,
  solitaireLeftoverPile,
  setSolitaireDeck,
  setSolitairePile,
  setSolitaireLeftoverPile,
  setBroadcastPlayerUuid
}) => {
  function handleSolitaireFlip() {
    /*flipSolitaireCards(solitaireDeck, solitairePile, solitaireLeftoverPile)*/
    flipSolitaireCards2()
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

  function flipSolitaireCards2() {
    if(solitairePile.length > 0) {
      setSolitaireLeftoverPile(solitaireLeftoverPile => [...solitaireLeftoverPile, ...solitairePile.reverse()])
      setSolitairePile([])
    }

    if(solitairePile.length == 0 && solitaireDeck.length == 0) {
      setSolitaireDeck(solitaireLeftoverPile)
      setSolitaireLeftoverPile([])
    }

    const numCardsToFlip = Math.min(solitaireDeck.length, 3)

    for(let flipCount = 0; flipCount < numCardsToFlip; flipCount++) {
      let cardFlipped = solitaireDeck.shift()

      setSolitaireDeck(solitaireDeck.filter(card => cardFlipped['id'] !== card['id']))
      setSolitairePile(solitairePile => [cardFlipped, ...solitairePile])
    }
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
