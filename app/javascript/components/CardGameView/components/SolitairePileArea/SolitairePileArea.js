import React, { useState, useEffect } from "react";
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
  solitaireWork2Pile,
  solitaireWork3Pile,
  solitaireWork4Pile,
  setSolitaireWork1Pile,
  setSolitaireWork2Pile,
  setSolitaireWork3Pile,
  setSolitaireWork4Pile,
  nertzSoliWorkPile1YPos,
  nertzSoliWorkPile2YPos,
  nertzSoliWorkPile3YPos,
  nertzSoliWorkPile4YPos
}) => {
  const [nertzSoliWorkPile1XPos, setNertzSoliWorkPile1XPos] = useState(60)
  const [nertzSoliWorkPile2XPos, setNertzSoliWorkPile2XPos] = useState(120)
  const [nertzSoliWorkPile3XPos, setNertzSoliWorkPile3XPos] = useState(180)
  const [nertzSoliWorkPile4XPos, setNertzSoliWorkPile4XPos] = useState(240)

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
    const movedCard = solitairePile[0]

    const workPile1Card = solitaireWork1Pile[0]
    const work1solitaireCriteria = solitaireCriteria(movedCard, workPile1Card)

    const nearWorkPile1XPos = solitaireXPos >= (nertzSoliWorkPile1XPos - 10) && solitaireXPos <= (nertzSoliWorkPile1XPos + 10)
    const nearWorkPile1YPos = solitaireYPos >= nertzSoliWorkPile1YPos && solitaireYPos <= (nertzSoliWorkPile1YPos + 20)

    if(nearWorkPile1XPos && nearWorkPile1YPos) {
      setSolitairePile(solitairePile.filter(card => movedCard['id'] !== card['id']))
      setSolitaireWork1Pile(solitaireWork1Pile => [movedCard, ...solitaireWork1Pile])
    }

    const workPile2Card = solitaireWork2Pile[0]
    const work2solitaireCriteria = solitaireCriteria(movedCard, workPile2Card)

    const nearWorkPile2XPos = solitaireXPos >= (nertzSoliWorkPile2XPos - 10) && solitaireXPos <= (nertzSoliWorkPile2XPos + 10)
    const nearWorkPile2YPos = solitaireYPos >= nertzSoliWorkPile2YPos && solitaireYPos <= (nertzSoliWorkPile2YPos + 20)

    if(nearWorkPile2XPos && nearWorkPile2YPos) {
      setSolitairePile(solitairePile.filter(card => movedCard['id'] !== card['id']))
      setSolitaireWork2Pile(solitaireWork2Pile => [movedCard, ...solitaireWork2Pile])
    }

    const workPile3Card = solitaireWork3Pile[0]
    const work3solitaireCriteria = solitaireCriteria(movedCard, workPile3Card)

    const nearWorkPile3XPos = solitaireXPos >= (nertzSoliWorkPile3XPos - 10) && solitaireXPos <= (nertzSoliWorkPile3XPos + 10)
    const nearWorkPile3YPos = solitaireYPos >= nertzSoliWorkPile3YPos && solitaireYPos <= (nertzSoliWorkPile3YPos + 20)

    if(nearWorkPile3XPos && nearWorkPile3YPos) {
      setSolitairePile(solitairePile.filter(card => movedCard['id'] !== card['id']))
      setSolitaireWork3Pile(solitaireWork3Pile => [movedCard, ...solitaireWork3Pile])
    }

    const workPile4Card = solitaireWork4Pile[0]
    const work4solitaireCriteria = solitaireCriteria(movedCard, workPile4Card)

    const nearWorkPile4XPos = solitaireXPos >= (nertzSoliWorkPile4XPos - 10) && solitaireXPos <= (nertzSoliWorkPile4XPos + 10)
    const nearWorkPile4YPos = solitaireYPos >= nertzSoliWorkPile4YPos && solitaireYPos <= (nertzSoliWorkPile4YPos + 20)

    if(nearWorkPile4XPos && nearWorkPile4YPos) {
      setSolitairePile(solitairePile.filter(card => movedCard['id'] !== card['id']))
      setSolitaireWork4Pile(solitaireWork4Pile => [movedCard, ...solitaireWork4Pile])
    }

    setBroadcastPlayerUuid(playerUuid)
    setSolitaireXPos(0)
    setSolitaireYPos(0)
  }

  function solitaireCriteria(movedCard, workPileCard) {
    if(!workPileCard) {
      return true
    }

    const movedCardNumber = parseInt(movedCard['number'])
    const workPileCardNumber = parseInt(workPileCard['number'])
    const oppositeColor = movedCard['color'] !== workPileCard['color']

    return oppositeColor && movedCardNumber == (workPileCardNumber - 1)
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
        disabled={!solitairePile[0]}
        onDrag={(event, ui) => updateSolitaireXYPos(event, ui)}
        onStop={(event, ui) => checkNearWorkPile(event, ui)}
        position={{x: solitaireXPos, y: solitaireYPos}}
        defaultClassNameDragging="zIndexTop"
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
