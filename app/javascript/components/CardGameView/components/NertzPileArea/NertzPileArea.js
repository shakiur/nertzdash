import React from "react"
import Draggable from "react-draggable";

const NertzPileArea = ({
  playerPos,
  playerUuid,
}) => {
  return (
    <div className="NertzPile">
      <div className="cardPreviewSmall"></div>
      <div className="cardPreviewSmall"></div>
      <div className="cardPreviewSmall"></div>
      <div className="cardPreviewSmall"></div>
      <div className="cardPreviewSmall"></div>
      <div className="cardPreviewSmall"></div>
      <div className="cardPreviewSmall"></div>
      <div className="cardPreviewSmall"></div>
      <div className="cardPreviewSmall"></div>
      <div className="cardPreviewSmall"></div>
      <div className="cardPreviewSmall"></div>
      <div className="cardPreviewLarge"></div>
      <Draggable
      >
        <div className="bottomCard">
        </div>
      </Draggable>
    </div>
  )
}

export default NertzPileArea
