import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";

const SolitairePileArea = ({
  playerPos,
  playerUuid,
  playerActive,
  playerScore,
  setPlayerScore,
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
  nertzSoliWorkPile4YPos,
  centerTablePile1,
  centerTablePile2,
  centerTablePile3,
  centerTablePile4,
  centerTablePile5,
  centerTablePile6,
  centerTablePile7,
  centerTablePile8,
  centerTablePile9,
  centerTablePile10,
  centerTablePile11,
  centerTablePile12,
  centerTablePile13,
  centerTablePile14,
  centerTablePile15,
  centerTablePile16,
  centerTablePile17,
  centerTablePile18,
  centerTablePile19,
  centerTablePile20,
  centerTablePile21,
  centerTablePile22,
  centerTablePile23,
  centerTablePile24,
  setCenterTablePile1,
  setCenterTablePile2,
  setCenterTablePile3,
  setCenterTablePile4,
  setCenterTablePile5,
  setCenterTablePile6,
  setCenterTablePile7,
  setCenterTablePile8,
  setCenterTablePile9,
  setCenterTablePile10,
  setCenterTablePile11,
  setCenterTablePile12,
  setCenterTablePile13,
  setCenterTablePile14,
  setCenterTablePile15,
  setCenterTablePile16,
  setCenterTablePile17,
  setCenterTablePile18,
  setCenterTablePile19,
  setCenterTablePile20,
  setCenterTablePile21,
  setCenterTablePile22,
  setCenterTablePile23,
  setCenterTablePile24,
  centerPileBroadcastPlayerUuid,
  setCenterPileBroadcastPlayerUuid,
  nertzWinner
}) => {
  const [nertzSoliWorkPile1XPos, setNertzSoliWorkPile1XPos] = useState(60)
  const [nertzSoliWorkPile2XPos, setNertzSoliWorkPile2XPos] = useState(120)
  const [nertzSoliWorkPile3XPos, setNertzSoliWorkPile3XPos] = useState(180)
  const [nertzSoliWorkPile4XPos, setNertzSoliWorkPile4XPos] = useState(240)

  const enforceRules = true

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
    const delay = 75
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

    if(resetXYPos) {
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

  function displayNum(card) {
    if(card) {
      return card['value']
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

  function checkNearPiles(event, ui) {
    const movedCard = solitairePile[0]

    for(let tempWorkPileNum = 1; tempWorkPileNum < 5; tempWorkPileNum++) {
      let nearWorkPile = checkNearWorkPile(movedCard, tempWorkPileNum)

      if(nearWorkPile) {
        break
      }
    }

    for(let tempCenterPileNum = 1; tempCenterPileNum < 25; tempCenterPileNum++) {
      let nearCenterPile = checkNearCenterPile(movedCard, playerPos, tempCenterPileNum)

      if(nearCenterPile) {
        break
      }
    }

    setSolitaireXPos(0)
    setSolitaireYPos(0)
  }

  function checkNearWorkPile(movedCard, workPileNum) {
    const workPileCard = getTopWorkPileCard(workPileNum)
    const workSolitaireCriteria = solitaireCriteria(movedCard, workPileCard)

    const nertzSoliWorkXPos = getNertzSoliWorkPileXPos(workPileNum)
    const nertzSoliWorkYPos = getNertzSoliWorkPileYPos(workPileNum)

    const nearWorkPileXPos = solitaireXPos >= (nertzSoliWorkXPos - 40) && solitaireXPos <= (nertzSoliWorkXPos + 40)
    const nearWorkPileYPos = solitaireYPos >= (nertzSoliWorkYPos - 40) && solitaireYPos <= (nertzSoliWorkYPos + 40)

    if(nearWorkPileXPos && nearWorkPileYPos && workSolitaireCriteria) {
      setBroadcastPlayerUuid(playerUuid)
      setSolitairePile(solitairePile.filter(card => movedCard['id'] !== card['id']))
      setSolitaireWorkPile(movedCard, workPileNum)

      return true
    }

    return false
  }

  function getTopWorkPileCard(workPileNum) {
    switch(workPileNum) {
      case 1:
        return solitaireWork1Pile[0]
      case 2:
        return solitaireWork2Pile[0]
      case 3:
        return solitaireWork3Pile[0]
      case 4:
        return solitaireWork4Pile[0]
      default:
        break;
    }
  }

  function getNertzSoliWorkPileXPos(workPileNum) {
    switch(workPileNum) {
      case 1:
        return nertzSoliWorkPile1XPos
      case 2:
        return nertzSoliWorkPile2XPos
      case 3:
        return nertzSoliWorkPile3XPos
      case 4:
        return nertzSoliWorkPile4XPos
      default:
        break;
    }
  }

  function getNertzSoliWorkPileYPos(workPileNum) {
    switch(workPileNum) {
      case 1:
        return nertzSoliWorkPile1YPos
      case 2:
        return nertzSoliWorkPile2YPos
      case 3:
        return nertzSoliWorkPile3YPos
      case 4:
        return nertzSoliWorkPile4YPos
      default:
        break;
    }
  }

  function setSolitaireWorkPile(movedCard, workPileNum) {
    switch(workPileNum) {
      case 1:
        setSolitaireWork1Pile(solitaireWork1Pile => [movedCard, ...solitaireWork1Pile])
        break;
      case 2:
        setSolitaireWork2Pile(solitaireWork2Pile => [movedCard, ...solitaireWork2Pile])
        break;
      case 3:
        setSolitaireWork3Pile(solitaireWork3Pile => [movedCard, ...solitaireWork3Pile])
        break;
      case 4:
        setSolitaireWork4Pile(solitaireWork4Pile => [movedCard, ...solitaireWork4Pile])
        break;
      default:
        break;
    }
  }

  function checkNearCenterPile(movedCard, playerPos, centerPileNum) {
    const centerPileCard = getTopCenterPileCard(centerPileNum)
    const centerPileSpeedCriteria = speedCriteria(movedCard, centerPileCard)

    const centerPileXPos = getCenterPileXPos(playerPos, centerPileNum)
    const centerPileYPos = getCenterPileYPos(playerPos, centerPileNum)

    const nearCenterPileXPos = solitaireXPos >= (centerPileXPos - 40) && solitaireXPos <= (centerPileXPos + 40)
    const nearCenterPileYPos = solitaireYPos >= (centerPileYPos - 40) && solitaireYPos <= (centerPileYPos + 40)

    if(nearCenterPileXPos && nearCenterPileYPos && centerPileSpeedCriteria) {
      setCenterPileBroadcastPlayerUuid(playerUuid)
      setSolitairePile(solitairePile.filter(card => movedCard['id'] !== card['id']))
      updateCenterTablePile(movedCard, centerPileNum)
      setPlayerScore(playerScore + 1)

      return true
    }

    return false
  }

  function getTopCenterPileCard(centerPileNum) {
    switch(centerPileNum) {
      case 1:
        return centerTablePile1[0]
        break;
      case 2:
        return centerTablePile2[0]
        break;
      case 3:
        return centerTablePile3[0]
        break;
      case 4:
        return centerTablePile4[0]
        break;
      case 5:
        return centerTablePile5[0]
        break;
      case 6:
        return centerTablePile6[0]
        break;
      case 7:
        return centerTablePile7[0]
        break;
      case 8:
        return centerTablePile8[0]
        break;
      case 9:
        return centerTablePile9[0]
        break;
      case 10:
        return centerTablePile10[0]
        break;
      case 11:
        return centerTablePile11[0]
        break;
      case 12:
        return centerTablePile12[0]
        break;
      case 13:
        return centerTablePile13[0]
        break;
      case 14:
        return centerTablePile14[0]
        break;
      case 15:
        return centerTablePile15[0]
        break;
      case 16:
        return centerTablePile16[0]
        break;
      case 17:
        return centerTablePile17[0]
        break;
      case 18:
        return centerTablePile18[0]
        break;
      case 19:
        return centerTablePile19[0]
        break;
      case 20:
        return centerTablePile20[0]
        break;
      case 21:
        return centerTablePile21[0]
        break;
      case 22:
        return centerTablePile22[0]
        break;
      case 23:
        return centerTablePile23[0]
        break;
      case 24:
        return centerTablePile24[0]
        break;
      default:
        break;
    }
  }

  function speedCriteria(movedCard, centerPileCard) {
    if(!enforceRules) {
      return true
    }

    const movedCardNumber = parseInt(movedCard['number'])
    const emptyPileCriteria = !centerPileCard && movedCardNumber == 1

    if(emptyPileCriteria) {
      return true
    } else if(!centerPileCard) {
      return false
    } else {
      const centerPileCardNumber = parseInt(centerPileCard['number'])
      const sameSuit = movedCard['suit'] == centerPileCard['suit']

      return sameSuit && movedCardNumber == (centerPileCardNumber + 1)
    }
  }

  function getCenterPileXPos(playerPos, centerPileNum) {
    const xPosMultiplier = getXPosMultiplier(centerPileNum)

    switch(playerPos) {
      case 1:
        return 68 + (60 * xPosMultiplier)
        break;
      case 2:
        return -318 + (60 * xPosMultiplier)
        break;
      case 3:
        return 325 + (60 * xPosMultiplier)
        break;
      case 4:
        return -575 + (60 * xPosMultiplier)
        break;
      case 5:
        return 68 + (60 * xPosMultiplier)
        break;
      case 6:
        return -318 + (60 * xPosMultiplier)
        break;
      default:
        break;
    }
  }

  function getXPosMultiplier(centerPileNum) {
    switch(centerPileNum) {
      case 1:
      case 9:
      case 17:
        return 0
        break;
      case 2:
      case 10:
      case 18:
        return 1
        break;
      case 3:
      case 11:
      case 19:
        return 2
        break;
      case 4:
      case 12:
      case 20:
        return 3
        break;
      case 5:
      case 13:
      case 21:
        return 4
        break;
      case 6:
      case 14:
      case 22:
        return 5
        break;
      case 7:
      case 15:
      case 23:
        return 6
        break;
      case 8:
      case 16:
      case 24:
        return 7
        break;
      default:
        break;
    }
  }

  function getCenterPileYPos(playerPos, centerPileNum) {
    const yPosMultiplier = getYPosMultiplier(centerPileNum)

    switch(playerPos) {
      case 1:
        return 155 + (80 * yPosMultiplier)
        break;
      case 2:
        return 155 + (80 * yPosMultiplier)
        break;
      case 3:
        return -120 + (80 * yPosMultiplier)
        break;
      case 4:
        return -120 + (80 * yPosMultiplier)
        break;
      case 5:
        return -396 + (80 * yPosMultiplier)
        break;
      case 6:
        return -396 + (80 * yPosMultiplier)
        break;
      default:
        break;
    }
  }

  function getYPosMultiplier(centerPileNum) {
    switch(centerPileNum) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
        return 0
        break;
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
        return 1
        break;
      case 17:
      case 18:
      case 19:
      case 20:
      case 21:
      case 22:
      case 23:
      case 24:
        return 2
        break;
      default:
        break;
    }
  }

  function updateCenterTablePile(movedCard, centerPileNum) {
    switch(centerPileNum) {
      case 1:
        setCenterTablePile1(centerTablePile1 => [movedCard, ...centerTablePile1])
        break;
      case 2:
        setCenterTablePile2(centerTablePile2 => [movedCard, ...centerTablePile2])
        break;
      case 3:
        setCenterTablePile3(centerTablePile3 => [movedCard, ...centerTablePile3])
        break;
      case 4:
        setCenterTablePile4(centerTablePile4 => [movedCard, ...centerTablePile4])
        break;
      case 5:
        setCenterTablePile5(centerTablePile5 => [movedCard, ...centerTablePile5])
        break;
      case 6:
        setCenterTablePile6(centerTablePile6 => [movedCard, ...centerTablePile6])
        break;
      case 7:
        setCenterTablePile7(centerTablePile7 => [movedCard, ...centerTablePile7])
        break;
      case 8:
        setCenterTablePile8(centerTablePile8 => [movedCard, ...centerTablePile8])
        break;
      case 9:
        setCenterTablePile9(centerTablePile9 => [movedCard, ...centerTablePile9])
        break;
      case 10:
        setCenterTablePile10(centerTablePile10 => [movedCard, ...centerTablePile10])
        break;
      case 11:
        setCenterTablePile11(centerTablePile11 => [movedCard, ...centerTablePile11])
        break;
      case 12:
        setCenterTablePile12(centerTablePile12 => [movedCard, ...centerTablePile12])
        break;
      case 13:
        setCenterTablePile13(centerTablePile13 => [movedCard, ...centerTablePile13])
        break;
      case 14:
        setCenterTablePile14(centerTablePile14 => [movedCard, ...centerTablePile14])
        break;
      case 15:
        setCenterTablePile15(centerTablePile15 => [movedCard, ...centerTablePile15])
        break;
      case 16:
        setCenterTablePile16(centerTablePile16 => [movedCard, ...centerTablePile16])
        break;
      case 17:
        setCenterTablePile17(centerTablePile17 => [movedCard, ...centerTablePile17])
        break;
      case 18:
        setCenterTablePile18(centerTablePile18 => [movedCard, ...centerTablePile18])
        break;
      case 19:
        setCenterTablePile19(centerTablePile19 => [movedCard, ...centerTablePile19])
        break;
      case 20:
        setCenterTablePile20(centerTablePile20 => [movedCard, ...centerTablePile20])
        break;
      case 21:
        setCenterTablePile21(centerTablePile21 => [movedCard, ...centerTablePile21])
        break;
      case 22:
        setCenterTablePile22(centerTablePile22 => [movedCard, ...centerTablePile22])
        break;
      case 23:
        setCenterTablePile23(centerTablePile23 => [movedCard, ...centerTablePile23])
        break;
      case 24:
        setCenterTablePile24(centerTablePile24 => [movedCard, ...centerTablePile24])
        break;
      default:
        break;
    }
  }

  function solitaireCriteria(movedCard, workPileCard) {
    if(!enforceRules) {
      return true
    }

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

  function zIndexStyle(xPos, yPos) {
    if(xPos === 0 && yPos === 0) {
      return 'zIndexZero'
    } else {
      return 'zIndexOne'
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
        disabled={!solitairePile[0] || nertzWinner}
        onDrag={(event, ui) => updateSolitaireXYPos(event, ui)}
        onStop={(event, ui) => checkNearPiles(event, ui)}
        position={{x: solitaireXPos, y: solitaireYPos}}
      >
        <div className={`bottomCard ${cardBorderStyle(solitairePile[0])} ${zIndexStyle(solitaireXPos, solitaireYPos)}`}>
          <div className={`leftHalfNum ${cardColor(solitairePile[0])}`}>
            {displayNum(solitairePile[0])}
          </div>
          <div className={`rightHalfSuit ${cardColor(solitairePile[0])}`}>
            {displaySuit(solitairePile[0])}
          </div>
        </div>
      </Draggable>
    </div>
  )
}

export default SolitairePileArea
