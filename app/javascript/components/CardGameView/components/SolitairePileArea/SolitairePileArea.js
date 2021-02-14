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
  solitaireWork2Pile,
  setSolitaireWork2Pile,
  solitaireWork3Pile,
  setSolitaireWork3Pile,
  solitaireWork4Pile,
  setSolitaireWork4Pile,
  workPile1XPos,
  workPile1YPos,
  setWorkPile1XPos,
  setWorkPile1YPos,
  workPile2XPos,
  workPile2YPos,
  setWorkPile2XPos,
  setWorkPile2YPos,
  workPile3XPos,
  workPile3YPos,
  setWorkPile3XPos,
  setWorkPile3YPos,
  workPile4XPos,
  workPile4YPos,
  setWorkPile4XPos,
  setWorkPile4YPos
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
    const nearWorkPile1XPos = solitaireXPos >= (workPile1XPos - 10) && solitaireXPos <= (workPile1XPos + 10)
    const nearWorkPile1YPos = solitaireYPos >= workPile1YPos && solitaireYPos <= (workPile1YPos + 20)

    /*
    console.log('Solitaire X Pos: ' + solitaireXPos)
    console.log('Solitaire Y Pos: ' + solitaireYPos)
    console.log('Work Pile X Pos: ' + (workPile1XPos - 10) + ', ' + (workPile1XPos + 10))
    console.log('Work Pile Y Pos: ' + (workPile1YPos) + ', ' + (workPile1YPos + 20))
    */

    if(nearWorkPile1XPos && nearWorkPile1YPos) {
      let movedCard = solitairePile.shift()
      setSolitairePile(solitairePile.filter(card => movedCard['id'] !== card['id']))
      setSolitaireWork1Pile(solitaireWork1Pile => [movedCard, ...solitaireWork1Pile])
      setWorkPile1YPos(workPile1YPos + 15)
    }

    const nearWorkPile2XPos = solitaireXPos >= (workPile2XPos - 10) && solitaireXPos <= (workPile2XPos + 10)
    const nearWorkPile2YPos = solitaireYPos >= workPile2YPos && solitaireYPos <= (workPile2YPos + 20)

    if(nearWorkPile2XPos && nearWorkPile2YPos) {
      let movedCard = solitairePile.shift()
      setSolitairePile(solitairePile.filter(card => movedCard['id'] !== card['id']))
      setSolitaireWork2Pile(solitaireWork2Pile => [movedCard, ...solitaireWork2Pile])
      setWorkPile2YPos(workPile2YPos + 15)
    }

    const nearWorkPile3XPos = solitaireXPos >= (workPile3XPos - 10) && solitaireXPos <= (workPile3XPos + 10)
    const nearWorkPile3YPos = solitaireYPos >= workPile3YPos && solitaireYPos <= (workPile3YPos + 20)

    if(nearWorkPile3XPos && nearWorkPile3YPos) {
      let movedCard = solitairePile.shift()
      setSolitairePile(solitairePile.filter(card => movedCard['id'] !== card['id']))
      setSolitaireWork3Pile(solitaireWork3Pile => [movedCard, ...solitaireWork3Pile])
      setWorkPile3YPos(workPile3YPos + 15)
    }

    const nearWorkPile4XPos = solitaireXPos >= (workPile4XPos - 10) && solitaireXPos <= (workPile4XPos + 10)
    const nearWorkPile4YPos = solitaireYPos >= workPile4YPos && solitaireYPos <= (workPile4YPos + 20)

    if(nearWorkPile4XPos && nearWorkPile4YPos) {
      let movedCard = solitairePile.shift()
      setSolitairePile(solitairePile.filter(card => movedCard['id'] !== card['id']))
      setSolitaireWork4Pile(solitaireWork4Pile => [movedCard, ...solitaireWork4Pile])
      setWorkPile4YPos(workPile4YPos + 15)
    }

    setBroadcastPlayerUuid(playerUuid)
    setSolitaireXPos(0)
    setSolitaireYPos(0)
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
