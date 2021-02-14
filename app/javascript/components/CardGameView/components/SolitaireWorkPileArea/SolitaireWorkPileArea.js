import React, { useEffect } from "react";
import Draggable from "react-draggable";

const SolitaireWorkPileArea = ({
  playerPos,
  playerUuid,
  playerActive,
  broadcastPlayerUuid,
  setBroadcastPlayerUuid,
  broadcastTime,
  setBroadcastTime,
  solitaireWorkPile,
  setSolitaireWorkPile
}) => {
  function displayNumSuit(card) {
    if(card) {
      return `${card['value']}${card['suit']}`
    }
  }

  function displaySuit(card) {
    if(card) {
      return card['suit']
    }
  }

  function displaySuitNum(card) {
    if(card) {
      return `${card['suit']}${card['value']}`
    }
  }

  function cardColor(card) {
    if(card) {
      return card['color']
    }
  }

  function cardBorderStyle(card) {
    if(card) {
      return 'solidLineCard'
    } else {
      return 'dashedLineCard'
    }
  }

  return (
    <div className="SolitaireWorkPile">
      <div className={`solitaireWorkCard ${cardBorderStyle(solitaireWorkPile[0])}`}>
        <div className={`topNumSuit ${cardColor(solitaireWorkPile[0])}`}>
          {displayNumSuit(solitaireWorkPile[0])}
        </div>
        <div className={`middleSuit ${cardColor(solitaireWorkPile[0])}`}>
          {displaySuit(solitaireWorkPile[0])}
        </div>
        <div className={`bottomNumSuit ${cardColor(solitaireWorkPile[0])}`}>
          {displaySuitNum(solitaireWorkPile[0])}
        </div>
      </div>
    </div>
  )
}

export default SolitaireWorkPileArea
