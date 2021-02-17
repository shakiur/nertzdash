import React, { useEffect } from "react";
import Draggable from "react-draggable";

const NertzPileArea = ({
  playerPos,
  playerUuid,
  playerName,
  playerActive,
  broadcastTime,
  setBroadcastTime,
  broadcastPlayerUuid,
  setBroadcastPlayerUuid,
  nertzPile,
  setNertzPile,
  nertzPileXPos,
  nertzPileYPos,
  setNertzPileXPos,
  setNertzPileYPos
}) => {
  useEffect(() => {
    if(playerActive && playerUuid == broadcastPlayerUuid) {
      broadcastPlayerNertzPileXYPos(
        playerPos,
        playerUuid,
        nertzPileXPos,
        nertzPileYPos
      )
    }
  }, [nertzPileXPos, nertzPileYPos])

  function broadcastPlayerNertzPileXYPos(playerPos, playerUuid, nertzPileXPos, nertzPileYPos) {
    const delay = 25
    const currentTime = new Date().getTime();
    const meetsDelayThreshold = (currentTime - delay) > broadcastTime
    const resetXYPos = nertzPileXPos == 0 && nertzPileYPos == 0

    if(meetsDelayThreshold || resetXYPos) {
      setBroadcastTime(currentTime)

      fetch('/card_game/broadcast_player_nertz_pile_x_y_pos?' +
        'data_type=' + 'player_nertz_pile_x_y_pos' +
        '&player_pos=' + playerPos +
        '&player_uuid=' + playerUuid +
        '&nertz_pile_x_pos=' + nertzPileXPos +
        '&nertz_pile_y_pos=' + nertzPileYPos +
        '&time=' + broadcastTime
      );
    }
  }
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

  function updateNertzPileXYPos(event, ui) {
    setBroadcastPlayerUuid(playerUuid)
    setNertzPileXPos(nertzPileXPos + ui.deltaX)
    setNertzPileYPos(nertzPileYPos + ui.deltaY)
  }

  function checkNearWorkPile(event, ui) {
    setNertzPileXPos(0)
    setNertzPileYPos(0)
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
      <Draggable
        onDrag={(event, ui) => updateNertzPileXYPos(event, ui)}
        onStop={(event, ui) => checkNearWorkPile(event, ui)}
        position={{x: nertzPileXPos, y: nertzPileYPos}}
      >
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
      </Draggable>
    </div>
  )
}

export default NertzPileArea
