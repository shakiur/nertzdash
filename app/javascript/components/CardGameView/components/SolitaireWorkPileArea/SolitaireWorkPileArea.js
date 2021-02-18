import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";

const SolitaireWorkPileArea = ({
  playerPos,
  playerUuid,
  playerActive,
  broadcastPlayerUuid,
  setBroadcastPlayerUuid,
  broadcastTime,
  setBroadcastTime,
  workPilePos,
  solitaireWorkPile,
  setSolitaireWorkPile
}) => {
  const [left3WorkPileXPos, setLeft3WorkPileXPos] = useState(-180)
  const [left2WorkPileXPos, setLeft2WorkPileXPos] = useState(-120)
  const [left1WorkPileXPos, setLeft1WorkPileXPos] = useState(-60)

  const [right1WorkPileXPos, setRight1WorkPileXPos] = useState(60)
  const [right2WorkPileXPos, setRight2WorkPileXPos] = useState(120)
  const [right3WorkPileXPos, setRight3WorkPileXPos] = useState(180)

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

  function previewBorderStyle(card) {
    if(card) {
      return 'solidLinePreview'
    } else {
      return 'dashedLinePreview'
    }
  }

  function PreviewCards() {
    return solitaireWorkPile.slice(1, solitaireWorkPile.length).reverse().map((card, index) =>
      <div
        key={parseInt(card['id'])}
        className={`solitaireWorkPreviewCard ${previewBorderStyle(card)}`}
      >
        <div className={`topNumSuit ${cardColor(card)}`}>
          {displayNumSuit(card)}
        </div>
      </div>
    )
  }

  return (
    <div className="SolitaireWorkPile">
      <PreviewCards />
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
