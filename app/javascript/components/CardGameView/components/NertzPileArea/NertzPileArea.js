import React, { useState, useEffect } from "react";
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
  setNertzPileYPos,
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
  nertzSoliWorkPile4YPos,
  centerTablePile1,
  setCenterTablePile1
}) => {
  const [nertzSoliWorkPile1XPos, setNertzSoliWorkPile1XPos] = useState(120)
  const [nertzSoliWorkPile2XPos, setNertzSoliWorkPile2XPos] = useState(180)
  const [nertzSoliWorkPile3XPos, setNertzSoliWorkPile3XPos] = useState(240)
  const [nertzSoliWorkPile4XPos, setNertzSoliWorkPile4XPos] = useState(300)

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

  function checkNearPiles(event, ui) {
    const movedCard = nertzPile[0]

    checkNearWorkPile1(movedCard)
    checkNearWorkPile2(movedCard)
    checkNearWorkPile3(movedCard)
    checkNearWorkPile4(movedCard)

    checkNearCenterPile1(movedCard, playerPos)

    setBroadcastPlayerUuid(playerUuid)
    setNertzPileXPos(0)
    setNertzPileYPos(0)
  }

  function checkNearWorkPile1(movedCard) {
    const workPile1Card = solitaireWork1Pile[0]
    const work1solitaireCriteria = solitaireCriteria(movedCard, workPile1Card)

    const nearWorkPile1XPos = nertzPileXPos >= (nertzSoliWorkPile1XPos - 10) && nertzPileXPos <= (nertzSoliWorkPile1XPos + 10)
    const nearWorkPile1YPos = nertzPileYPos >= nertzSoliWorkPile1YPos && nertzPileYPos <= (nertzSoliWorkPile1YPos + 20)

    if(nearWorkPile1XPos && nearWorkPile1YPos) {
      setNertzPile(nertzPile.filter(card => movedCard['id'] !== card['id']))
      setSolitaireWork1Pile(solitaireWork1Pile => [movedCard, ...solitaireWork1Pile])
    }
  }

  function checkNearWorkPile2(movedCard) {
    const workPile2Card = solitaireWork2Pile[0]
    const work2solitaireCriteria = solitaireCriteria(movedCard, workPile2Card)

    const nearWorkPile2XPos = nertzPileXPos >= (nertzSoliWorkPile2XPos - 10) && nertzPileXPos <= (nertzSoliWorkPile2XPos + 10)
    const nearWorkPile2YPos = nertzPileYPos >= nertzSoliWorkPile2YPos && nertzPileYPos <= (nertzSoliWorkPile2YPos + 20)

    if(nearWorkPile2XPos && nearWorkPile2YPos) {
      setNertzPile(nertzPile.filter(card => movedCard['id'] !== card['id']))
      setSolitaireWork2Pile(solitaireWork2Pile => [movedCard, ...solitaireWork2Pile])
    }
  }

  function checkNearWorkPile3(movedCard) {
    const workPile3Card = solitaireWork3Pile[0]
    const work3solitaireCriteria = solitaireCriteria(movedCard, workPile3Card)

    const nearWorkPile3XPos = nertzPileXPos >= (nertzSoliWorkPile3XPos - 10) && nertzPileXPos <= (nertzSoliWorkPile3XPos + 10)
    const nearWorkPile3YPos = nertzPileYPos >= nertzSoliWorkPile3YPos && nertzPileYPos <= (nertzSoliWorkPile3YPos + 20)

    if(nearWorkPile3XPos && nearWorkPile3YPos) {
      setNertzPile(nertzPile.filter(card => movedCard['id'] !== card['id']))
      setSolitaireWork3Pile(solitaireWork3Pile => [movedCard, ...solitaireWork3Pile])
    }
  }

  function checkNearWorkPile4(movedCard) {
    const workPile4Card = solitaireWork4Pile[0]
    const work4solitaireCriteria = solitaireCriteria(movedCard, workPile4Card)

    const nearWorkPile4XPos = nertzPileXPos >= (nertzSoliWorkPile4XPos - 10) && nertzPileXPos <= (nertzSoliWorkPile4XPos + 10)
    const nearWorkPile4YPos = nertzPileYPos >= nertzSoliWorkPile4YPos && nertzPileYPos <= (nertzSoliWorkPile4YPos + 20)

    if(nearWorkPile4XPos && nearWorkPile4YPos) {
      setNertzPile(nertzPile.filter(card => movedCard['id'] !== card['id']))
      setSolitaireWork4Pile(solitaireWork4Pile => [movedCard, ...solitaireWork4Pile])
    }
  }

  function checkNearCenterPile1(movedCard, playerPos) {
    const centerPile1Card = centerTablePile1[0]
    const centerPile1SolitaireCriteria = solitaireCriteria(movedCard, centerPile1Card)

    const centerPile1XPos = getCenterPileXPos(playerPos)
    const centerPile1YPos = getCenterPileYPos(playerPos)

    const nearCenterPile1XPos = nertzPileXPos >= (centerPile1XPos - 10) && nertzPileXPos <= (centerPile1XPos + 10)
    const nearCenterPile1YPos = nertzPileYPos >= (centerPile1YPos - 10) && nertzPileYPos <= (centerPile1YPos + 10)

    if(nearCenterPile1XPos && nearCenterPile1YPos) {
      setNertzPile(nertzPile.filter(card => movedCard['id'] !== card['id']))
      setCenterTablePile1(centerTablePile1 => [movedCard, ...centerTablePile1])
    }
  }

  function getCenterPileXPos(playerPos) {
    switch(playerPos) {
      case 1:
        return 128
        break;
      case 2:
        return -316
        break;
      case 3:
        return 385
        break;
      case 4:
        return -515
        break;
      case 5:
        return 127
        break;
      case 6:
        return -258
        break;
      default:
        break;
    }
  }

  function getCenterPileYPos(playerPos) {
    switch(playerPos) {
      case 1:
        return 155
        break;
      case 2:
        return 155
        break;
      case 3:
        return -120
        break;
      case 4:
        return -120
        break;
      case 5:
        return -396
        break;
      case 6:
        return -396
        break;
      default:
        break;
    }
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

  function zIndexStyle(xPos, yPos) {
    if(xPos === 0 && yPos === 0) {
      return 'zIndexZero'
    } else {
      return 'zIndexOne'
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
      <Draggable
        disabled={!nertzPile[0]}
        onDrag={(event, ui) => updateNertzPileXYPos(event, ui)}
        onStop={(event, ui) => checkNearPiles(event, ui)}
        position={{x: nertzPileXPos, y: nertzPileYPos}}
      >
        <div className={`nertzPileBottomCard ${cardBorderStyle(nertzPile[0])} ${zIndexStyle(nertzPileXPos, nertzPileYPos)}`}>
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
