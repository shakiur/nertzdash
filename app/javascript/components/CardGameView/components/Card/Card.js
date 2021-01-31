import React from "react";
import Draggable from "react-draggable";

const Card = ({ playerPos, playerUuid, xPos, yPos, broadcastTime, updatePlayerXYPos, broadcastPlayerXYPos}) => {
  const classes = `Card defaultColor`

  const updateXYDelta = (event, ui) => {
    updatePlayerXYPos(playerPos, xPos + ui.deltaX, yPos + ui.deltaY);

    const delay = 25
    const currentTime = new Date().getTime();
    const meetsDelayThreshold = (currentTime - delay) > broadcastTime

    if(meetsDelayThreshold) {
      broadcastPlayerXYPos(playerPos, playerUuid, xPos, yPos);
    }
  }

  const broadcastXYPos = (event) => {
    broadcastPlayerXYPos(playerPos, playerUuid, xPos, yPos);
  }

  return (
    <Draggable
      onDrag={updateXYDelta}
      onStop={broadcastXYPos}
      position={{x: xPos, y: yPos}}
    >
      <div className={classes}>
      </div>
    </Draggable>
  )

}

export default Card;

