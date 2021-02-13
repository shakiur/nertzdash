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

export default NertzPileArea
