import React, { useEffect } from "react";
import Draggable from "react-draggable";

const CardDeckHolder = ({
  playerPos,
  playerUuid,
  playerName,
  playerActive,
  setPlayerActive,
  broadcastTime,
  setBroadcastTime,
  broadcastPlayerUuid,
  setBroadcastPlayerUuid,
  solitaireDeck,
  solitairePile,
  solitaireLeftoverPile,
  setSolitaireDeck,
  setSolitairePile,
  setSolitaireLeftoverPile,
  nertzWinner
}) => {

  function handleSolitaireFlip() {
    if(playerActive && !nertzWinner) {
      flipSolitaireCards()
      setBroadcastPlayerUuid(playerUuid)
    }
  }

  function flipSolitaireCards() {
    moveSolitairePileToLeftover()
    resetSolitaireIfEmpty()
    flipCardsToSolitairePile()
  }

  function moveSolitairePileToLeftover() {
    if(solitairePile.length > 0) {
      setSolitaireLeftoverPile(solitaireLeftoverPile => [...solitaireLeftoverPile, ...solitairePile.reverse()])
      setSolitairePile([])
    }
  }

  function resetSolitaireIfEmpty() {
    if(solitairePile.length == 0 && solitaireDeck.length == 0) {
      setSolitaireDeck(solitaireLeftoverPile)
      setSolitaireLeftoverPile([])
    }
  }

  function flipCardsToSolitairePile() {
    const numCardsToFlip = Math.min(solitaireDeck.length, 3)

    for(let flipCount = 0; flipCount < numCardsToFlip; flipCount++) {
      let cardFlipped = solitaireDeck.shift()

      setSolitaireDeck(solitaireDeck.filter(card => cardFlipped['id'] !== card['id']))
      setSolitairePile(solitairePile => [cardFlipped, ...solitairePile])
    }
  }

  function cardDeckClassNames() {
    let classNames = "CardDeckHolder"

    if(solitaireDeck.length > 0) {
      classNames += ' solidLine'
    } else {
      classNames += ' dashedLine'
    }

    return classNames
  }

  function cardBorderStyle(deckLength, stackWidth) {
    if(deckLength > 0) {
      switch(stackWidth) {
        case 1:
          return 'solidLineCardOne'
        case 2:
          return 'solidLineCardTwo'
        case 3:
          return 'solidLineCardThree'
        default:
          return ''
      }
    } else {
      return 'dashedLine'
    }
  }


  return (
    <div
      className={`CardDeckHolder ${cardBorderStyle(solitaireDeck.length, Math.floor(solitaireDeck.length/9))}`}
      onClick={() => handleSolitaireFlip()}
    >
    </div>
  )
}

export default CardDeckHolder
