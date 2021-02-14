import React, { useEffect } from "react";
import Draggable from "react-draggable";

const SolitaireWorkPileArea = ({
  playerPos,
  playerUuid,
  playerActive,
  broadcastPlayerUuid,
  setBroadcastPlayerUuid,
  broadcastTime,
  setBroadcastTime
}) => {
  return (
    <div className="SolitaireWorkPile">
      <div className={`solitaireWorkCard`}>
      </div>
    </div>
  )
}

export default SolitaireWorkPileArea
