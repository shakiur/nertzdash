import React, { useEffect } from "react";
import Draggable from "react-draggable";

const SolitairePileArea = ({
  playerPos,
  playerUuid,
  playerActive,
  broadcastPlayerUuid,
  setBroadcastPlayerUuid,
  broadcastTime,
  setBroadcastTime,
  solitairePile,
  setSolitairePile,
  solitaireXPos,
  solitaireYPos,
  setSolitaireXPos,
  setSolitaireYPos,
  solitaireWork1Pile,
  setSolitaireWork1Pile,
  workPile1XPos,
  workPile1YPos
}) => {
  useEffect(() => {
    if(playerActive && playerUuid == broadcastPlayerUuid) {
      broadcastPlayerSolitaireXYPos(
        playerPos,
        playerUuid,
        solitaireXPos,
        solitaireYPos
      )
    }
  }, [solitaireXPos, solitaireYPos])

  function broadcastPlayerSolitaireXYPos(playerPos, playerUuid, solitaireXPos, solitaireYPos) {
    const delay = 25
    const currentTime = new Date().getTime();
    const meetsDelayThreshold = (currentTime - delay) > broadcastTime
    const resetXYPos = solitaireXPos == 0 && solitaireYPos == 0

    if(meetsDelayThreshold || resetXYPos) {
      setBroadcastTime(currentTime)

      fetch('/card_game/broadcast_player_solitaire_x_y_pos?' +
        'data_type=' + 'player_solitaire_x_y_pos' +
        '&player_pos=' + playerPos +
        '&player_uuid=' + playerUuid +
        '&solitaire_x_pos=' + solitaireXPos +
        '&solitaire_y_pos=' + solitaireYPos +
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

  function cardColor(card) {
    if(card) {
      return card['color']
    }
  }

  function updateSolitaireXYPos(event, ui) {
    setBroadcastPlayerUuid(playerUuid)
    setSolitaireXPos(solitaireXPos + ui.deltaX)
    setSolitaireYPos(solitaireYPos + ui.deltaY)
  }

  function checkNearWorkPile(event, ui) {
    const nearWorkPile1XPos = solitaireXPos >= (workPile1XPos - 10) && solitaireXPos <= (workPile1XPos + 50 + 10)
    const nearWorkPile1YPos = solitaireYPos >= (workPile1YPos - 10) && solitaireYPos <= (workPile1YPos + 70 + 10)

    if(nearWorkPile1XPos && nearWorkPile1YPos) {
      console.log('Near Work Pile 1')
      let movedCard = solitairePile.shift()
      setSolitairePile(solitairePile.filter(card => movedCard['id'] !== card['id']))
      setSolitaireWork1Pile(solitaireWork1Pile => [movedCard, ...solitaireWork1Pile])
    }

    setBroadcastPlayerUuid(playerUuid)
    setSolitaireXPos(0)
    setSolitaireYPos(0)
    /*
    broadcastPlayerSolitaireXYPos(playerPos, playerUuid, 0, 0, 0)
    broadcastPlayerSolitaireXYPos(playerPos, playerUuid, 0, 0, 0)
    broadcastPlayerSolitaireXYPos(playerPos, playerUuid, 0, 0, 0)
    broadcastPlayerSolitaireXYPos(playerPos, playerUuid, 0, 0, 0)
    broadcastPlayerSolitaireXYPos(playerPos, playerUuid, 0, 0, 0)
    */
  }

  function previewBorderStyle(card) {
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

  return (
    <div className="ThreeCardHolder">
      <div className={`solitairePilePreview ${previewBorderStyle(solitairePile[2])}`}>
        <div className={`topNumSuit ${cardColor(solitairePile[2])}`}>
          {displayNumSuit(solitairePile[2])}
        </div>
      </div>
      <div className={`solitairePilePreview ${previewBorderStyle(solitairePile[1])}`}>
        <div className={`topNumSuit ${cardColor(solitairePile[1])}`}>
          {displayNumSuit(solitairePile[1])}
        </div>
      </div>
      <Draggable
        onDrag={(event, ui) => updateSolitaireXYPos(event, ui)}
        onStop={(event, ui) => checkNearWorkPile(event, ui)}
        position={{x: solitaireXPos, y: solitaireYPos}}
      >
        <div className={`bottomCard ${cardBorderStyle(solitairePile[0])}`}>
          <div className={`topNumSuit ${cardColor(solitairePile[0])}`}>
            {displayNumSuit(solitairePile[0])}
          </div>
          <div className={`middleSuit ${cardColor(solitairePile[0])}`}>
            {displaySuit(solitairePile[0])}
          </div>
          <div className={`bottomNumSuit ${cardColor(solitairePile[0])}`}>
            {displaySuitNum(solitairePile[0])}
          </div>
        </div>
      </Draggable>
    </div>
  )
}

export default SolitairePileArea
