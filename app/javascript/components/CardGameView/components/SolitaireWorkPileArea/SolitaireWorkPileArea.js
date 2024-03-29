import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";

const SolitaireWorkPileArea = ({
  playerPos,
  playerUuid,
  playerActive,
  playerScore,
  setPlayerScore,
  broadcastPlayerUuid,
  setBroadcastPlayerUuid,
  broadcastTime,
  setBroadcastTime,
  workPilePos,
  workPileXPos,
  workPileYPos,
  setWorkPileXPos,
  setWorkPileYPos,
  workPilePreviewXPos,
  workPilePreviewYPos,
  setWorkPilePreviewXPos,
  setWorkPilePreviewYPos,
  previewIndex,
  setPreviewIndex,
  solitaireWorkPile,
  setSolitaireWorkPile,
  solitaireWork1Pile,
  solitaireWork2Pile,
  solitaireWork3Pile,
  solitaireWork4Pile,
  setSolitaireWork1Pile,
  setSolitaireWork2Pile,
  setSolitaireWork3Pile,
  setSolitaireWork4Pile,
  absoluteWorkPile1YPos,
  absoluteWorkPile2YPos,
  absoluteWorkPile3YPos,
  absoluteWorkPile4YPos,
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
  activeViewersCount,
  setActiveViewersCount,
  nertzWinner
}) => {
  const [left3WorkPileXPos, setLeft3WorkPileXPos] = useState(-180)
  const [left2WorkPileXPos, setLeft2WorkPileXPos] = useState(-120)
  const [left1WorkPileXPos, setLeft1WorkPileXPos] = useState(-60)

  const [right1WorkPileXPos, setRight1WorkPileXPos] = useState(60)
  const [right2WorkPileXPos, setRight2WorkPileXPos] = useState(120)
  const [right3WorkPileXPos, setRight3WorkPileXPos] = useState(180)

  const enforceRules = true

  useEffect(() => {
    if(playerActive && playerUuid == broadcastPlayerUuid) {
      broadcastPlayerPreviewWorkPileXYPos(
        playerPos,
        playerUuid,
        workPilePos,
        previewIndex,
        workPilePreviewXPos,
        workPilePreviewYPos,
        workPileXPos,
        workPileYPos
      )
    }
  }, [workPilePreviewXPos, workPilePreviewYPos, workPileXPos, workPileYPos])

  function broadcastPlayerPreviewWorkPileXYPos(playerPos, playerUuid, workPilePos, previewIndex, previewWorkPileXPos, previewWorkPileYPos, workPileXPos, workPileYPos) {
    const delay = 75
    const currentTime = new Date().getTime();
    const meetsDelayThreshold = (currentTime - delay) > broadcastTime
    const resetXYPos = (previewWorkPileXPos == 0 && previewWorkPileYPos == 0 && workPileXPos == 0 && workPileYPos == 0)

    if(meetsDelayThreshold || resetXYPos) {
      setBroadcastTime(currentTime)

      fetch('/card_game/broadcast_player_preview_work_pile_x_y_pos?' +
        'data_type=' + 'player_preview_work_pile_x_y_pos' +
        '&player_pos=' + playerPos +
        '&player_uuid=' + playerUuid +
        '&work_pile_pos=' + workPilePos +
        '&preview_index=' + previewIndex +
        '&preview_work_pile_x_pos=' + previewWorkPileXPos +
        '&preview_work_pile_y_pos=' + previewWorkPileYPos +
        '&work_pile_x_pos=' + workPileXPos +
        '&work_pile_y_pos=' + workPileYPos +
        '&time=' + broadcastTime
      );
    }

    if(resetXYPos) {
      setBroadcastTime(currentTime)

      fetch('/card_game/broadcast_player_preview_work_pile_x_y_pos?' +
        'data_type=' + 'player_preview_work_pile_x_y_pos' +
        '&player_pos=' + playerPos +
        '&player_uuid=' + playerUuid +
        '&work_pile_pos=' + workPilePos +
        '&preview_index=' + previewIndex +
        '&preview_work_pile_x_pos=' + previewWorkPileXPos +
        '&preview_work_pile_y_pos=' + previewWorkPileYPos +
        '&work_pile_x_pos=' + workPileXPos +
        '&work_pile_y_pos=' + workPileYPos +
        '&time=' + broadcastTime
      );
    }
  }

  useEffect(() => {
    if(playerActive && playerUuid == broadcastPlayerUuid) {
      broadcastPlayerSolitaireWorkPile(
        playerPos,
        playerUuid,
        workPilePos,
        solitaireWorkPile
      );
    }
  }, [solitaireWorkPile])

  function broadcastPlayerSolitaireWorkPile(
    playerPos,
    playerUuid,
    workPilePos,
    solitaireWorkPile
  ) {
    const currentTime = new Date().getTime();
    setBroadcastTime(currentTime)

    fetch('/card_game/broadcast_player_solitaire_work_pile?' +
      'data_type=' + 'player_solitaire_work_pile' +
      '&player_pos=' + playerPos +
      '&player_uuid=' + playerUuid +
      '&work_pile_pos=' + workPilePos +
      '&solitaire_work_pile=' + JSON.stringify(solitaireWorkPile) +
      '&time=' + broadcastTime
    );
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

  function cardBorderStyle(card) {
    if(card) {
      if((workPileXPos == 0 && workPileYPos == 0) || (workPilePreviewXPos != 0 && workPilePreviewYPos != 0)) {
        return 'solidLineCard'
      } else {
        return `${card['deckColor']}BoldSolidLineCard`
      }
    } else {
      return 'dashedLineCard'
    }
  }

  function updateWorkPileXYPos(event, ui) {
    setBroadcastPlayerUuid(playerUuid)
    setWorkPileXPos(workPileXPos + ui.deltaX)
    setWorkPileYPos(workPileYPos + ui.deltaY)
  }

  function updateWorkPilePreviewXYPos(event, ui, selectedPreviewIndex) {
    setBroadcastPlayerUuid(playerUuid)
    setPreviewIndex(selectedPreviewIndex)

    setWorkPilePreviewXPos(workPilePreviewXPos + ui.deltaX)
    setWorkPilePreviewYPos(workPilePreviewYPos + ui.deltaY)

    setWorkPileXPos(workPileXPos + ui.deltaX)
    setWorkPileYPos(workPileYPos + ui.deltaY)
  }

  function checkNearPiles(event, ui) {
    const movedCard = solitaireWorkPile[0]

    for(let tempWorkPileNum = 1; tempWorkPileNum < 5; tempWorkPileNum++) {
      let nearWorkPile = checkNearWorkPile(movedCard, workPilePos, tempWorkPileNum)

      if(nearWorkPile) {
        break
      }
    }

    for(let tempCenterPileNum = 1; tempCenterPileNum < 25; tempCenterPileNum++) {
      let nearCenterPile = checkNearCenterPile(movedCard, playerPos, workPilePos, tempCenterPileNum)

      if(nearCenterPile) {
        break
      }
    }

    setWorkPileXPos(0)
    setWorkPileYPos(0)
  }

  function checkNearWorkPile(movedCard, workPilePos, workPileNum) {
    if(workPilePos == workPileNum){
      return false
    }

    const workPileCard = getTopWorkPileCard(workPileNum)
    const workSolitaireCriteria = solitaireCriteria(movedCard, workPileCard)

    const currentWorkPileXPos = getCurrentWorkPileXPos()
    const currentWorkPileYPos = getCurrentWorkPileYPos(workPilePos)

    const workPileRelativeXPos = getWorkPileRelativeXPos(workPilePos, workPileNum)
    const workPileRelativeYPos = getAbsoluteWorkPileYPos(workPileNum)

    const nearWorkPileXPos = currentWorkPileXPos >= (workPileRelativeXPos - 40) && currentWorkPileXPos <= (workPileRelativeXPos + 40)
    const nearWorkPileYPos = currentWorkPileYPos >= (workPileRelativeYPos - 40) && currentWorkPileYPos <= (workPileRelativeYPos + 40)

    if(nearWorkPileXPos && nearWorkPileYPos && workSolitaireCriteria) {
      setBroadcastPlayerUuid(playerUuid)
      setSolitaireWorkPile(solitaireWorkPile.filter(card => movedCard['id'] !== card['id']))
      addCardToSolitaireWorkPile(movedCard, workPileNum)

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

  function getWorkPileRelativeXPos(workPilePos, workPileNum) {
    switch(workPilePos) {
      case 1:
        return getWorkPile1XPos(workPileNum)
      case 2:
        return getWorkPile2XPos(workPileNum)
      case 3:
        return getWorkPile3XPos(workPileNum)
      case 4:
        return getWorkPile4XPos(workPileNum)
      default:
        break;
    }
  }

  function getWorkPile1XPos(workPileNum) {
    switch(workPileNum) {
      case 2:
        return right1WorkPileXPos
      case 3:
        return right2WorkPileXPos
      case 4:
        return right3WorkPileXPos
      default:
        break;
    }
  }

  function getWorkPile2XPos(workPileNum) {
    switch(workPileNum) {
      case 1:
        return left1WorkPileXPos
      case 3:
        return right1WorkPileXPos
      case 4:
        return right2WorkPileXPos
      default:
        break;
    }
  }

  function getWorkPile3XPos(workPileNum) {
    switch(workPileNum) {
      case 1:
        return left2WorkPileXPos
      case 2:
        return left1WorkPileXPos
      case 4:
        return right1WorkPileXPos
      default:
        break;
    }
  }

  function getWorkPile4XPos(workPileNum) {
    switch(workPileNum) {
      case 1:
        return left3WorkPileXPos
      case 2:
        return left2WorkPileXPos
      case 3:
        return left1WorkPileXPos
      default:
        break;
    }
  }

  function getWorkPileRelativeYPos(workPilePos) {
    switch(workPilePos) {
      case 1:
        return workPileYPos + absoluteWorkPile1YPos
      case 2:
        return workPileYPos + absoluteWorkPile2YPos
      case 3:
        return workPileYPos + absoluteWorkPile3YPos
      case 4:
        return workPileYPos + absoluteWorkPile4YPos
      default:
        break;
    }
  }

  function getAbsoluteWorkPileYPos(workPilePos) {
    switch(workPilePos) {
      case 1:
        return absoluteWorkPile1YPos
      case 2:
        return absoluteWorkPile2YPos
      case 3:
        return absoluteWorkPile3YPos
      case 4:
        return absoluteWorkPile4YPos
      default:
        break;
    }
  }

  function getCurrentWorkPileXPos() {
    return workPileXPos
  }

  function getCurrentWorkPileYPos(workPilePos) {
    switch(workPilePos) {
      case 1:
        return workPileYPos + absoluteWorkPile1YPos
        break;
      case 2:
        return workPileYPos + absoluteWorkPile2YPos
        break;
      case 3:
        return workPileYPos + absoluteWorkPile3YPos
        break;
      case 4:
        return workPileYPos + absoluteWorkPile4YPos
        break;
      default:
        break;
    }
  }

  function addCardToSolitaireWorkPile(movedCard, workPileNum) {
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

  function checkNearCenterPile(movedCard, playerPos, workPilePos, centerPileNum) {
    const centerPileCard = getTopCenterPileCard(centerPileNum)
    const centerPileSpeedCriteria = speedCriteria(movedCard, centerPileCard)

    const currentWorkPileXPos = getCurrentWorkPileXPos()
    const currentWorkPileYPos = getCurrentWorkPileYPos(workPilePos)

    const centerPileXPos = getCenterPileXPos(playerPos, centerPileNum, workPilePos)
    const centerPileYPos = getCenterPileYPos(playerPos, centerPileNum)

    const nearCenterPileXPos = currentWorkPileXPos >= (centerPileXPos - 40) && currentWorkPileXPos <= (centerPileXPos + 40)
    const nearCenterPileYPos = currentWorkPileYPos >= (centerPileYPos - 40) && currentWorkPileYPos <= (centerPileYPos + 40)

    if(nearCenterPileXPos && nearCenterPileYPos && centerPileSpeedCriteria) {
      setCenterPileBroadcastPlayerUuid(playerUuid)
      setSolitaireWorkPile(solitaireWorkPile.filter(card => movedCard['id'] !== card['id']))
      updateCenterTablePile(movedCard, centerPileNum)
      setPlayerScore(playerScore + 1)

      return true
    }

    return false
  }

  function getCenterPileXPos(playerPos, centerPileNum, workPilePos) {
    const workXPosMultipier = getWorkPileXPosMultiplier(workPilePos)
    const centerXPosMultiplier = getCenterPileXPosMultiplier(centerPileNum)

    switch(playerPos) {
      case 1:
        return 8 + (60 * centerXPosMultiplier) - (60 * workXPosMultipier)
        break;
      case 2:
        return -378 + (60 * centerXPosMultiplier) - (60 * workXPosMultipier)
        break;
      case 3:
        return 265 + (60 * centerXPosMultiplier) - (60 * workXPosMultipier)
        break;
      case 4:
        return -635 + (60 * centerXPosMultiplier) - (60 * workXPosMultipier)
        break;
      case 5:
        return 8 + (60 * centerXPosMultiplier) - (60 * workXPosMultipier)
        break;
      case 6:
        return -378 + (60 * centerXPosMultiplier) - (60 * workXPosMultipier)
        break;
      default:
        break;
    }
  }

  function getCenterPileXPosMultiplier(centerPileNum) {
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

  function getWorkPileXPosMultiplier(workPilePos) {
    switch(workPilePos) {
      case 1:
        return 0
      case 2:
        return 1
      case 3:
        return 2
      case 4:
        return 3
      default:
        break;
    }
  }

  function getCenterPileYPos(playerPos, centerPileNum) {
    const yPosMultiplier = getYPosMultiplier(centerPileNum)

    switch(playerPos) {
      case 1:
        return 275 + (80 * yPosMultiplier)
        break;
      case 2:
        return 275 + (80 * yPosMultiplier)
        break;
      case 3:
        return 0 + (80 * yPosMultiplier)
        break;
      case 4:
        return 0 + (80 * yPosMultiplier)
        break;
      case 5:
        return -275 + (80 * yPosMultiplier)
        break;
      case 6:
        return -275 + (80 * yPosMultiplier)
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

  function checkPreviewNearWorkPile(event, ui, previewCardIndex) {
    switch(workPilePos) {
      case 1:
        checkPreviewNearWork1Piles(previewCardIndex)
        break;
      case 2:
        checkPreviewNearWork2Piles(previewCardIndex)
        break;
      case 3:
        checkPreviewNearWork3Piles(previewCardIndex)
        break;
      case 4:
        checkPreviewNearWork4Piles(previewCardIndex)
        break;
      default:
        break;
    }


    setWorkPilePreviewXPos(0)
    setWorkPilePreviewYPos(0)

    setWorkPileXPos(0)
    setWorkPileYPos(0)
  }

  function checkPreviewNearWork1Piles(previewCardIndex) {
    const movedCard = solitaireWorkPile[previewCardIndex]
    const yDistanceOfPreviewCards = previewCardIndex * 15

    const workPile2Card = solitaireWork2Pile[0]
    const workPile2SolitaireCriteria = solitaireCriteria(movedCard, workPile2Card)

    const nearWorkPile2XPos = workPilePreviewXPos >= (right1WorkPileXPos - 40) && workPilePreviewXPos <= (right1WorkPileXPos + 40)
    const nearWorkPile2YPos = (absoluteWorkPile1YPos - yDistanceOfPreviewCards + workPilePreviewYPos) >= (absoluteWorkPile2YPos - 40) && (absoluteWorkPile1YPos - yDistanceOfPreviewCards + workPilePreviewYPos) <= (absoluteWorkPile2YPos + 40)

    if(nearWorkPile2XPos && nearWorkPile2YPos && workPile2SolitaireCriteria) {
      setBroadcastPlayerUuid(playerUuid)
      const movedCards = solitaireWorkPile.filter((card, index) => index <= previewCardIndex)
      setSolitaireWorkPile(solitaireWorkPile.filter((card, index) => index > previewCardIndex))
      setSolitaireWork2Pile(solitaireWork2Pile => [movedCards, ...solitaireWork2Pile].flat())

      return
    }

    const workPile3Card = solitaireWork3Pile[0]
    const workPile3SolitaireCriteria = solitaireCriteria(movedCard, workPile3Card)

    const nearWorkPile3XPos = workPilePreviewXPos >= (right2WorkPileXPos - 40) && workPilePreviewXPos <= (right2WorkPileXPos + 40)
    const nearWorkPile3YPos = (absoluteWorkPile1YPos - yDistanceOfPreviewCards + workPilePreviewYPos) >= (absoluteWorkPile3YPos - 40) && (absoluteWorkPile1YPos - yDistanceOfPreviewCards + workPilePreviewYPos) <= (absoluteWorkPile3YPos + 40)

    if(nearWorkPile3XPos && nearWorkPile3YPos && workPile3SolitaireCriteria) {
      setBroadcastPlayerUuid(playerUuid)
      const movedCards = solitaireWorkPile.filter((card, index) => index <= previewCardIndex)
      setSolitaireWorkPile(solitaireWorkPile.filter((card, index) => index > previewCardIndex))
      setSolitaireWork3Pile(solitaireWork3Pile => [movedCards, ...solitaireWork3Pile].flat())

      return
    }

    const workPile4Card = solitaireWork4Pile[0]
    const workPile4SolitaireCriteria = solitaireCriteria(movedCard, workPile4Card)

    const nearWorkPile4XPos = workPilePreviewXPos >= (right3WorkPileXPos - 40) && workPilePreviewXPos <= (right3WorkPileXPos + 40)
    const nearWorkPile4YPos = (absoluteWorkPile1YPos - yDistanceOfPreviewCards + workPilePreviewYPos) >= (absoluteWorkPile4YPos - 40) && (absoluteWorkPile1YPos - yDistanceOfPreviewCards + workPilePreviewYPos) <= (absoluteWorkPile4YPos + 40)

    if(nearWorkPile4XPos && nearWorkPile4YPos && workPile4SolitaireCriteria) {
      setBroadcastPlayerUuid(playerUuid)
      const movedCards = solitaireWorkPile.filter((card, index) => index <= previewCardIndex)
      setSolitaireWorkPile(solitaireWorkPile.filter((card, index) => index > previewCardIndex))
      setSolitaireWork4Pile(solitaireWork4Pile => [movedCards, ...solitaireWork4Pile].flat())

      return
    }
  }

  function checkPreviewNearWork2Piles(previewCardIndex) {
    const movedCard = solitaireWorkPile[previewCardIndex]
    const yDistanceOfPreviewCards = previewCardIndex * 15

    const workPile1Card = solitaireWork1Pile[0]
    const workPile1SolitaireCriteria = solitaireCriteria(movedCard, workPile1Card)

    const nearWorkPile1XPos = workPilePreviewXPos >= (left1WorkPileXPos - 40) && workPilePreviewXPos <= (left1WorkPileXPos + 40)
    const nearWorkPile1YPos = (absoluteWorkPile2YPos - yDistanceOfPreviewCards + workPilePreviewYPos) >= (absoluteWorkPile1YPos - 40) && (absoluteWorkPile2YPos - yDistanceOfPreviewCards + workPilePreviewYPos) <= (absoluteWorkPile1YPos + 40)

    if(nearWorkPile1XPos && nearWorkPile1YPos && workPile1SolitaireCriteria) {
      setBroadcastPlayerUuid(playerUuid)
      const movedCards = solitaireWorkPile.filter((card, index) => index <= previewCardIndex)
      setSolitaireWorkPile(solitaireWorkPile.filter((card, index) => index > previewCardIndex))
      setSolitaireWork1Pile(solitaireWork1Pile => [movedCards, ...solitaireWork1Pile].flat())

      return
    }

    const workPile3Card = solitaireWork3Pile[0]
    const workPile3SolitaireCriteria = solitaireCriteria(movedCard, workPile3Card)

    const nearWorkPile3XPos = workPilePreviewXPos >= (right1WorkPileXPos - 40) && workPilePreviewXPos <= (right1WorkPileXPos + 40)
    const nearWorkPile3YPos = (absoluteWorkPile2YPos - yDistanceOfPreviewCards + workPilePreviewYPos) >= (absoluteWorkPile3YPos - 40) && (absoluteWorkPile2YPos - yDistanceOfPreviewCards + workPilePreviewYPos) <= (absoluteWorkPile3YPos + 40)

    if(nearWorkPile3XPos && nearWorkPile3YPos && workPile3SolitaireCriteria) {
      setBroadcastPlayerUuid(playerUuid)
      const movedCards = solitaireWorkPile.filter((card, index) => index <= previewCardIndex)
      setSolitaireWorkPile(solitaireWorkPile.filter((card, index) => index > previewCardIndex))
      setSolitaireWork3Pile(solitaireWork3Pile => [movedCards, ...solitaireWork3Pile].flat())

      return
    }

    const workPile4Card = solitaireWork4Pile[0]
    const workPile4SolitaireCriteria = solitaireCriteria(movedCard, workPile4Card)

    const nearWorkPile4XPos = workPilePreviewXPos >= (right2WorkPileXPos - 40) && workPilePreviewXPos <= (right2WorkPileXPos + 40)
    const nearWorkPile4YPos = (absoluteWorkPile2YPos - yDistanceOfPreviewCards + workPilePreviewYPos) >= (absoluteWorkPile4YPos - 40) && (absoluteWorkPile2YPos - yDistanceOfPreviewCards + workPilePreviewYPos) <= (absoluteWorkPile4YPos + 40)

    if(nearWorkPile4XPos && nearWorkPile4YPos && workPile4SolitaireCriteria) {
      setBroadcastPlayerUuid(playerUuid)
      const movedCards = solitaireWorkPile.filter((card, index) => index <= previewCardIndex)
      setSolitaireWorkPile(solitaireWorkPile.filter((card, index) => index > previewCardIndex))
      setSolitaireWork4Pile(solitaireWork4Pile => [movedCards, ...solitaireWork4Pile].flat())

      return
    }
  }

  function checkPreviewNearWork3Piles(previewCardIndex) {
    const movedCard = solitaireWorkPile[previewCardIndex]
    const yDistanceOfPreviewCards = previewCardIndex * 15

    const workPile1Card = solitaireWork1Pile[0]
    const workPile1SolitaireCriteria = solitaireCriteria(movedCard, workPile1Card)

    const nearWorkPile1XPos = workPilePreviewXPos >= (left2WorkPileXPos - 40) && workPilePreviewXPos <= (left2WorkPileXPos + 40)
    const nearWorkPile1YPos = (absoluteWorkPile3YPos - yDistanceOfPreviewCards + workPilePreviewYPos) >= (absoluteWorkPile1YPos - 40) && (absoluteWorkPile3YPos - yDistanceOfPreviewCards + workPilePreviewYPos) <= (absoluteWorkPile1YPos + 40)

    if(nearWorkPile1XPos && nearWorkPile1YPos && workPile1SolitaireCriteria) {
      setBroadcastPlayerUuid(playerUuid)
      const movedCards = solitaireWorkPile.filter((card, index) => index <= previewCardIndex)
      setSolitaireWorkPile(solitaireWorkPile.filter((card, index) => index > previewCardIndex))
      setSolitaireWork1Pile(solitaireWork1Pile => [movedCards, ...solitaireWork1Pile].flat())

      return
    }

    const workPile2Card = solitaireWork2Pile[0]
    const workPile2SolitaireCriteria = solitaireCriteria(movedCard, workPile2Card)

    const nearWorkPile2XPos = workPilePreviewXPos >= (left1WorkPileXPos - 40) && workPilePreviewXPos <= (left1WorkPileXPos + 40)
    const nearWorkPile2YPos = (absoluteWorkPile3YPos - yDistanceOfPreviewCards + workPilePreviewYPos) >= (absoluteWorkPile2YPos - 40) && (absoluteWorkPile3YPos - yDistanceOfPreviewCards + workPilePreviewYPos) <= (absoluteWorkPile2YPos + 40)

    if(nearWorkPile2XPos && nearWorkPile2YPos && workPile2SolitaireCriteria) {
      setBroadcastPlayerUuid(playerUuid)
      const movedCards = solitaireWorkPile.filter((card, index) => index <= previewCardIndex)
      setSolitaireWorkPile(solitaireWorkPile.filter((card, index) => index > previewCardIndex))
      setSolitaireWork2Pile(solitaireWork2Pile => [movedCards, ...solitaireWork2Pile].flat())

      return
    }

    const workPile4Card = solitaireWork4Pile[0]
    const workPile4SolitaireCriteria = solitaireCriteria(movedCard, workPile4Card)

    const nearWorkPile4XPos = workPilePreviewXPos >= (right1WorkPileXPos - 40) && workPilePreviewXPos <= (right1WorkPileXPos + 40)
    const nearWorkPile4YPos = (absoluteWorkPile3YPos - yDistanceOfPreviewCards + workPilePreviewYPos) >= (absoluteWorkPile4YPos - 40) && (absoluteWorkPile3YPos - yDistanceOfPreviewCards + workPilePreviewYPos) <= (absoluteWorkPile4YPos + 40)

    if(nearWorkPile4XPos && nearWorkPile4YPos && workPile4SolitaireCriteria) {
      setBroadcastPlayerUuid(playerUuid)
      const movedCards = solitaireWorkPile.filter((card, index) => index <= previewCardIndex)
      setSolitaireWorkPile(solitaireWorkPile.filter((card, index) => index > previewCardIndex))
      setSolitaireWork4Pile(solitaireWork4Pile => [movedCards, ...solitaireWork4Pile].flat())

      return
    }
  }

  function checkPreviewNearWork4Piles(previewCardIndex) {
    const movedCard = solitaireWorkPile[previewCardIndex]
    const yDistanceOfPreviewCards = previewCardIndex * 15

    const workPile1Card = solitaireWork1Pile[0]
    const workPile1SolitaireCriteria = solitaireCriteria(movedCard, workPile1Card)

    const nearWorkPile1XPos = workPilePreviewXPos >= (left3WorkPileXPos - 40) && workPilePreviewXPos <= (left3WorkPileXPos + 40)
    const nearWorkPile1YPos = (absoluteWorkPile4YPos - yDistanceOfPreviewCards + workPilePreviewYPos) >= (absoluteWorkPile1YPos - 40) && (absoluteWorkPile4YPos - yDistanceOfPreviewCards + workPilePreviewYPos) <= (absoluteWorkPile1YPos + 40)

    if(nearWorkPile1XPos && nearWorkPile1YPos && workPile1SolitaireCriteria) {
      setBroadcastPlayerUuid(playerUuid)
      const movedCards = solitaireWorkPile.filter((card, index) => index <= previewCardIndex)
      setSolitaireWorkPile(solitaireWorkPile.filter((card, index) => index > previewCardIndex))
      setSolitaireWork1Pile(solitaireWork1Pile => [movedCards, ...solitaireWork1Pile].flat())

      return
    }

    const workPile2Card = solitaireWork2Pile[0]
    const workPile2SolitaireCriteria = solitaireCriteria(movedCard, workPile2Card)

    const nearWorkPile2XPos = workPilePreviewXPos >= (left2WorkPileXPos - 40) && workPilePreviewXPos <= (left2WorkPileXPos + 40)
    const nearWorkPile2YPos = (absoluteWorkPile4YPos - yDistanceOfPreviewCards + workPilePreviewYPos) >= (absoluteWorkPile2YPos - 40) && (absoluteWorkPile4YPos - yDistanceOfPreviewCards + workPilePreviewYPos) <= (absoluteWorkPile2YPos + 40)

    if(nearWorkPile2XPos && nearWorkPile2YPos && workPile2SolitaireCriteria) {
      setBroadcastPlayerUuid(playerUuid)
      const movedCards = solitaireWorkPile.filter((card, index) => index <= previewCardIndex)
      setSolitaireWorkPile(solitaireWorkPile.filter((card, index) => index > previewCardIndex))
      setSolitaireWork2Pile(solitaireWork2Pile => [movedCards, ...solitaireWork2Pile].flat())

      return
    }

    const workPile3Card = solitaireWork3Pile[0]
    const workPile3SolitaireCriteria = solitaireCriteria(movedCard, workPile3Card)

    const nearWorkPile3XPos = workPilePreviewXPos >= (left1WorkPileXPos - 40) && workPilePreviewXPos <= (left1WorkPileXPos + 40)
    const nearWorkPile3YPos = (absoluteWorkPile4YPos - yDistanceOfPreviewCards + workPilePreviewYPos) >= (absoluteWorkPile3YPos - 40) && (absoluteWorkPile4YPos - yDistanceOfPreviewCards + workPilePreviewYPos) <= (absoluteWorkPile3YPos + 40)

    if(nearWorkPile3XPos && nearWorkPile3YPos && workPile3SolitaireCriteria) {
      setBroadcastPlayerUuid(playerUuid)
      const movedCards = solitaireWorkPile.filter((card, index) => index <= previewCardIndex)
      setSolitaireWorkPile(solitaireWorkPile.filter((card, index) => index > previewCardIndex))
      setSolitaireWork3Pile(solitaireWork3Pile => [movedCards, ...solitaireWork3Pile].flat())

      return
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

  function zIndexStyle(xPos, yPos) {
    if(xPos === 0 && yPos === 0) {
      return 'zIndexZero'
    } else {
      return 'zIndexOne'
    }
  }

  function determinePreviewXPos(previewWorkPileIndex) {
    if(previewWorkPileIndex > previewIndex) {
      return 0
    } else {
      return workPilePreviewXPos
    }
  }

  function determinePreviewYPos(previewWorkPileIndex) {
    if(previewWorkPileIndex > previewIndex) {
      return 0
    } else {
      return workPilePreviewYPos
    }
  }

  return (
    <div className="SolitaireWorkPile">
      {
        solitaireWorkPile[12] &&
        <Draggable
          disabled={!solitaireWorkPile[12] || nertzWinner}
          onDrag={(event, ui) => updateWorkPilePreviewXYPos(event, ui, 12)}
          onStop={(event, ui) => checkPreviewNearWorkPile(event, ui, 12)}
          position={{x: determinePreviewXPos(12), y: determinePreviewYPos(12)}}
        >
          <div className={`solitaireWorkPreviewCard ${zIndexStyle(workPilePreviewXPos, workPilePreviewYPos)}`}>
            <div className={`topNumSuit ${cardColor(solitaireWorkPile[12])}`}>
              {displayNumSuit(solitaireWorkPile[12])}
            </div>
          </div>
        </Draggable>
      }
      {
        solitaireWorkPile[11] &&
        <Draggable
          disabled={!solitaireWorkPile[11] || nertzWinner}
          onDrag={(event, ui) => updateWorkPilePreviewXYPos(event, ui, 11)}
          onStop={(event, ui) => checkPreviewNearWorkPile(event, ui, 11)}
          position={{x: determinePreviewXPos(11), y: determinePreviewYPos(11)}}
        >
          <div className={`solitaireWorkPreviewCard ${zIndexStyle(workPilePreviewXPos, workPilePreviewYPos)}`}>
            <div className={`topNumSuit ${cardColor(solitaireWorkPile[11])}`}>
              {displayNumSuit(solitaireWorkPile[11])}
            </div>
          </div>
        </Draggable>
      }
      {
        solitaireWorkPile[10] &&
        <Draggable
          disabled={!solitaireWorkPile[10] || nertzWinner}
          onDrag={(event, ui) => updateWorkPilePreviewXYPos(event, ui, 10)}
          onStop={(event, ui) => checkPreviewNearWorkPile(event, ui, 10)}
          position={{x: determinePreviewXPos(10), y: determinePreviewYPos(10)}}
        >
          <div className={`solitaireWorkPreviewCard ${zIndexStyle(workPilePreviewXPos, workPilePreviewYPos)}`}>
            <div className={`topNumSuit ${cardColor(solitaireWorkPile[10])}`}>
              {displayNumSuit(solitaireWorkPile[10])}
            </div>
          </div>
        </Draggable>
      }
      {
        solitaireWorkPile[9] &&
        <Draggable
          disabled={!solitaireWorkPile[9] || nertzWinner}
          onDrag={(event, ui) => updateWorkPilePreviewXYPos(event, ui, 9)}
          onStop={(event, ui) => checkPreviewNearWorkPile(event, ui, 9)}
          position={{x: determinePreviewXPos(9), y: determinePreviewYPos(9)}}
        >
          <div className={`solitaireWorkPreviewCard ${zIndexStyle(workPilePreviewXPos, workPilePreviewYPos)}`}>
            <div className={`topNumSuit ${cardColor(solitaireWorkPile[9])}`}>
              {displayNumSuit(solitaireWorkPile[9])}
            </div>
          </div>
        </Draggable>
      }
      {
        solitaireWorkPile[8] &&
        <Draggable
          disabled={!solitaireWorkPile[8] || nertzWinner}
          onDrag={(event, ui) => updateWorkPilePreviewXYPos(event, ui, 8)}
          onStop={(event, ui) => checkPreviewNearWorkPile(event, ui, 8)}
          position={{x: determinePreviewXPos(8), y: determinePreviewYPos(8)}}
        >
          <div className={`solitaireWorkPreviewCard ${zIndexStyle(workPilePreviewXPos, workPilePreviewYPos)}`}>
            <div className={`topNumSuit ${cardColor(solitaireWorkPile[8])}`}>
              {displayNumSuit(solitaireWorkPile[8])}
            </div>
          </div>
        </Draggable>
      }
      {
        solitaireWorkPile[7] &&
        <Draggable
          disabled={!solitaireWorkPile[7] || nertzWinner}
          onDrag={(event, ui) => updateWorkPilePreviewXYPos(event, ui, 7)}
          onStop={(event, ui) => checkPreviewNearWorkPile(event, ui, 7)}
          position={{x: determinePreviewXPos(7), y: determinePreviewYPos(7)}}
        >
          <div className={`solitaireWorkPreviewCard ${zIndexStyle(workPilePreviewXPos, workPilePreviewYPos)}`}>
            <div className={`topNumSuit ${cardColor(solitaireWorkPile[7])}`}>
              {displayNumSuit(solitaireWorkPile[7])}
            </div>
          </div>
        </Draggable>
      }
      {
        solitaireWorkPile[6] &&
        <Draggable
          disabled={!solitaireWorkPile[6] || nertzWinner}
          onDrag={(event, ui) => updateWorkPilePreviewXYPos(event, ui, 6)}
          onStop={(event, ui) => checkPreviewNearWorkPile(event, ui, 6)}
          position={{x: determinePreviewXPos(6), y: determinePreviewYPos(6)}}
        >
          <div className={`solitaireWorkPreviewCard ${zIndexStyle(workPilePreviewXPos, workPilePreviewYPos)}`}>
            <div className={`topNumSuit ${cardColor(solitaireWorkPile[6])}`}>
              {displayNumSuit(solitaireWorkPile[6])}
            </div>
          </div>
        </Draggable>
      }
      {
        solitaireWorkPile[5] &&
        <Draggable
          disabled={!solitaireWorkPile[5] || nertzWinner}
          onDrag={(event, ui) => updateWorkPilePreviewXYPos(event, ui, 5)}
          onStop={(event, ui) => checkPreviewNearWorkPile(event, ui, 5)}
          position={{x: determinePreviewXPos(5), y: determinePreviewYPos(5)}}
        >
          <div className={`solitaireWorkPreviewCard ${zIndexStyle(workPilePreviewXPos, workPilePreviewYPos)}`}>
            <div className={`topNumSuit ${cardColor(solitaireWorkPile[5])}`}>
              {displayNumSuit(solitaireWorkPile[5])}
            </div>
          </div>
        </Draggable>
      }
      {
        solitaireWorkPile[4] &&
        <Draggable
          disabled={!solitaireWorkPile[4] || nertzWinner}
          onDrag={(event, ui) => updateWorkPilePreviewXYPos(event, ui, 4)}
          onStop={(event, ui) => checkPreviewNearWorkPile(event, ui, 4)}
          position={{x: determinePreviewXPos(4), y: determinePreviewYPos(4)}}
        >
          <div className={`solitaireWorkPreviewCard ${zIndexStyle(workPilePreviewXPos, workPilePreviewYPos)}`}>
            <div className={`topNumSuit ${cardColor(solitaireWorkPile[4])}`}>
              {displayNumSuit(solitaireWorkPile[4])}
            </div>
          </div>
        </Draggable>
      }
      {
        solitaireWorkPile[3] &&
        <Draggable
          disabled={!solitaireWorkPile[3] || nertzWinner}
          onDrag={(event, ui) => updateWorkPilePreviewXYPos(event, ui, 3)}
          onStop={(event, ui) => checkPreviewNearWorkPile(event, ui, 3)}
          position={{x: determinePreviewXPos(3), y: determinePreviewYPos(3)}}
        >
          <div className={`solitaireWorkPreviewCard ${zIndexStyle(workPilePreviewXPos, workPilePreviewYPos)}`}>
            <div className={`topNumSuit ${cardColor(solitaireWorkPile[3])}`}>
              {displayNumSuit(solitaireWorkPile[3])}
            </div>
          </div>
        </Draggable>
      }
      {
        solitaireWorkPile[2] &&
        <Draggable
          disabled={!solitaireWorkPile[2] || nertzWinner}
          onDrag={(event, ui) => updateWorkPilePreviewXYPos(event, ui, 2)}
          onStop={(event, ui) => checkPreviewNearWorkPile(event, ui, 2)}
          position={{x: determinePreviewXPos(2), y: determinePreviewYPos(2)}}
        >
          <div className={`solitaireWorkPreviewCard ${zIndexStyle(workPilePreviewXPos, workPilePreviewYPos)}`}>
            <div className={`topNumSuit ${cardColor(solitaireWorkPile[2])}`}>
              {displayNumSuit(solitaireWorkPile[2])}
            </div>
          </div>
        </Draggable>
      }
      {
        solitaireWorkPile[1] &&
        <Draggable
          disabled={!solitaireWorkPile[1] || nertzWinner}
          onDrag={(event, ui) => updateWorkPilePreviewXYPos(event, ui, 1)}
          onStop={(event, ui) => checkPreviewNearWorkPile(event, ui, 1)}
          position={{x: determinePreviewXPos(1), y: determinePreviewYPos(1)}}
        >
          <div className={`solitaireWorkPreviewCard ${zIndexStyle(workPilePreviewXPos, workPilePreviewYPos)}`}>
            <div className={`topNumSuit ${cardColor(solitaireWorkPile[1])}`}>
              {displayNumSuit(solitaireWorkPile[1])}
            </div>
          </div>
        </Draggable>
      }
      <Draggable
        disabled={!solitaireWorkPile[0] || nertzWinner}
        onDrag={(event, ui) => updateWorkPileXYPos(event, ui)}
        onStop={(event, ui) => checkNearPiles(event, ui)}
        position={{x: workPileXPos, y: workPileYPos}}
      >
        <div className={`solitaireWorkCard ${cardBorderStyle(solitaireWorkPile[0])} ${zIndexStyle(workPileXPos, workPileYPos)}`}>
          <div className={`leftHalfNum ${cardColor(solitaireWorkPile[0])}`}>
            {displayNum(solitaireWorkPile[0])}
          </div>
          <div className={`rightHalfSuit ${cardColor(solitaireWorkPile[0])}`}>
            {displaySuit(solitaireWorkPile[0])}
          </div>
        </div>
      </Draggable>
    </div>
  )
}

export default SolitaireWorkPileArea
