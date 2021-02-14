import React from "react"
import Draggable from "react-draggable";

const NertzPileArea = ({
  playerPos,
  playerUuid,
  playerName,
  playerActive,
  nertzPile,
  setNertzPile
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

  function previewCardBorderStyle(card) {
    if(card) {
      return 'solidLinePreview'
    } else {
      return 'dashedLinePreview'
    }
  }

  function cardBorderStyle(card) {
    if(card) {
      return 'solidLineCard'
    } else {
      return 'dashedLineCard'
    }
  }

  function cardColor(card) {
    if(card) {
      return card['color']
    }
  }

  return (
    <div className="NertzPile">
      <div className={`nertzPilePreviewCard ${previewCardBorderStyle(nertzPile[12])}`}></div>
      <div className={`nertzPilePreviewCard ${previewCardBorderStyle(nertzPile[11])}`}></div>
      <div className={`nertzPilePreviewCard ${previewCardBorderStyle(nertzPile[10])}`}></div>
      <div className={`nertzPilePreviewCard ${previewCardBorderStyle(nertzPile[9])}`}></div>
      <div className={`nertzPilePreviewCard ${previewCardBorderStyle(nertzPile[8])}`}></div>
      <div className={`nertzPilePreviewCard ${previewCardBorderStyle(nertzPile[7])}`}></div>
      <div className={`nertzPilePreviewCard ${previewCardBorderStyle(nertzPile[6])}`}></div>
      <div className={`nertzPilePreviewCard ${previewCardBorderStyle(nertzPile[5])}`}></div>
      <div className={`nertzPilePreviewCard ${previewCardBorderStyle(nertzPile[4])}`}></div>
      <div className={`nertzPilePreviewCard ${previewCardBorderStyle(nertzPile[3])}`}></div>
      <div className={`nertzPilePreviewCard ${previewCardBorderStyle(nertzPile[2])}`}></div>
      <div className={`nertzPilePreviewCard ${previewCardBorderStyle(nertzPile[1])}`}></div>
      <div className={`nertzPileBottomCard ${cardBorderStyle(nertzPile[0])}`}>
        <div className={`topNumSuit ${cardColor(nertzPile[0])}`}>
          {displayNumSuit(nertzPile[0])}
        </div>
        <div className={`middleSuit ${cardColor(nertzPile[0])}`}>
          {displaySuit(nertzPile[0])}
        </div>
        <div className={`bottomNumSuit ${cardColor(nertzPile[0])}`}>
          {displaySuitNum(nertzPile[0])}
        </div>
      </div>
    </div>
  )
}

export default NertzPileArea
