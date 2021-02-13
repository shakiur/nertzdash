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
  function NertzPile() {
    if(playerActive) {
      return emptyNertzPile()
    } else {
      return emptyNertzPile()
    }
  }

  function emptyNertzPile() {
    return (
      <div className="NertzPile">
        <div className="cardPreview"></div>
        <div className="cardPreview"></div>
        <div className="cardPreview"></div>
        <div className="cardPreview"></div>
        <div className="cardPreview"></div>
        <div className="cardPreview"></div>
        <div className="cardPreview"></div>
        <div className="cardPreview"></div>
        <div className="cardPreview"></div>
        <div className="cardPreview"></div>
        <div className="cardPreview"></div>
        <div className="cardPreview"></div>
        <div className="bottomCard"></div>
      </div>
    )
  }

  function displayNertzPile() {
  }

  return (
    <NertzPile />
  )
}

export default NertzPileArea
