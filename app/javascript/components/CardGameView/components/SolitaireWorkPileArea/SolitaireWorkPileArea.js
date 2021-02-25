import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";

const SolitaireWorkPileArea = ({
  playerPos,
  playerUuid,
  playerActive,
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
  absoluteWorkPile4YPos
}) => {
  const [left3WorkPileXPos, setLeft3WorkPileXPos] = useState(-180)
  const [left2WorkPileXPos, setLeft2WorkPileXPos] = useState(-120)
  const [left1WorkPileXPos, setLeft1WorkPileXPos] = useState(-60)

  const [right1WorkPileXPos, setRight1WorkPileXPos] = useState(60)
  const [right2WorkPileXPos, setRight2WorkPileXPos] = useState(120)
  const [right3WorkPileXPos, setRight3WorkPileXPos] = useState(180)

  useEffect(() => {
    if(playerActive && playerUuid == broadcastPlayerUuid) {
      /*
      broadcastPlayerWorkPileXYPos(
        playerPos,
        playerUuid,
        workPilePos,
        workPileXPos,
        workPileYPos
      )
      */
    }
  }, [workPileXPos, workPileYPos])

  function broadcastPlayerWorkPileXYPos(playerPos, playerUuid, workPilePos, workPileXPos, workPileYPos) {
    const delay = 25
    const currentTime = new Date().getTime();
    const meetsDelayThreshold = (currentTime - delay) > broadcastTime
    const resetXYPos = workPileXPos == 0 && workPileYPos == 0

    if(meetsDelayThreshold || resetXYPos) {
      setBroadcastTime(currentTime)

      fetch('/card_game/broadcast_player_work_pile_x_y_pos?' +
        'data_type=' + 'player_work_pile_x_y_pos' +
        '&player_pos=' + playerPos +
        '&player_uuid=' + playerUuid +
        '&work_pile_pos=' + workPilePos +
        '&work_pile_x_pos=' + workPileXPos +
        '&work_pile_y_pos=' + workPileYPos +
        '&time=' + broadcastTime
      );
    }
  }

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
    const delay = 25
    const currentTime = new Date().getTime();
    const meetsDelayThreshold = (currentTime - delay) > broadcastTime
    const resetXYPos = previewWorkPileXPos == 0 && previewWorkPileYPos == 0

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

  function cardBorderStyle(card) {
    if(card) {
      return 'solidLineCard'
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

  function checkNearWorkPile(event, ui) {
    switch(workPilePos) {
      case 1:
        checkNearWork1Piles()
        break;
      case 2:
        checkNearWork2Piles()
        break;
      case 3:
        checkNearWork3Piles()
        break;
      case 4:
        checkNearWork4Piles()
        break;
      default:
        break;
    }

    setBroadcastPlayerUuid(playerUuid)
    setWorkPileXPos(0)
    setWorkPileYPos(0)
  }

  function checkNearWork1Piles() {
    const movedCard = solitaireWorkPile[0]

    const workPile2Card = solitaireWork2Pile[0]
    const workPile2SolitaireCriteria = solitaireCriteria(movedCard, workPile2Card)

    const nearWorkPile2XPos = workPileXPos >= (right1WorkPileXPos - 10) && workPileXPos <= (right1WorkPileXPos + 10)
    const nearWorkPile2YPos = (workPileYPos + absoluteWorkPile1YPos) >= absoluteWorkPile2YPos && (workPileYPos + absoluteWorkPile1YPos) <= (absoluteWorkPile2YPos + 20)

    if(nearWorkPile2XPos && nearWorkPile2YPos) {
      setSolitaireWorkPile(solitaireWorkPile.filter(card => movedCard['id'] !== card['id']))
      setSolitaireWork2Pile(solitaireWork2Pile => [movedCard, ...solitaireWork2Pile])
    }

    const workPile3Card = solitaireWork3Pile[0]
    const workPile3SolitaireCriteria = solitaireCriteria(movedCard, workPile3Card)

    const nearWorkPile3XPos = workPileXPos >= (right2WorkPileXPos - 10) && workPileXPos <= (right2WorkPileXPos + 10)
    const nearWorkPile3YPos = (workPileYPos + absoluteWorkPile1YPos) >= absoluteWorkPile3YPos && (workPileYPos + absoluteWorkPile1YPos) <= (absoluteWorkPile3YPos + 20)

    if(nearWorkPile3XPos && nearWorkPile3YPos) {
      setSolitaireWorkPile(solitaireWorkPile.filter(card => movedCard['id'] !== card['id']))
      setSolitaireWork3Pile(solitaireWork3Pile => [movedCard, ...solitaireWork3Pile])
    }

    const workPile4Card = solitaireWork4Pile[0]
    const workPile4SolitaireCriteria = solitaireCriteria(movedCard, workPile4Card)

    const nearWorkPile4XPos = workPileXPos >= (right3WorkPileXPos - 10) && workPileXPos <= (right3WorkPileXPos + 10)
    const nearWorkPile4YPos = (workPileYPos + absoluteWorkPile1YPos) >= absoluteWorkPile4YPos && (workPileYPos + absoluteWorkPile1YPos) <= (absoluteWorkPile4YPos + 20)

    if(nearWorkPile4XPos && nearWorkPile4YPos) {
      setSolitaireWorkPile(solitaireWorkPile.filter(card => movedCard['id'] !== card['id']))
      setSolitaireWork4Pile(solitaireWork4Pile => [movedCard, ...solitaireWork4Pile])
    }
  }

  function checkNearWork2Piles() {
    const movedCard = solitaireWorkPile[0]

    const workPile1Card = solitaireWork1Pile[0]
    const workPile1SolitaireCriteria = solitaireCriteria(movedCard, workPile1Card)

    const nearWorkPile1XPos = workPileXPos >= (left1WorkPileXPos - 10) && workPileXPos <= (left1WorkPileXPos + 10)
    const nearWorkPile1YPos = (workPileYPos + absoluteWorkPile2YPos) >= absoluteWorkPile1YPos && (workPileYPos + absoluteWorkPile2YPos) <= (absoluteWorkPile1YPos + 20)

    if(nearWorkPile1XPos && nearWorkPile1YPos) {
      setSolitaireWorkPile(solitaireWorkPile.filter(card => movedCard['id'] !== card['id']))
      setSolitaireWork1Pile(solitaireWork1Pile => [movedCard, ...solitaireWork1Pile])
    }

    const workPile3Card = solitaireWork3Pile[0]
    const workPile3SolitaireCriteria = solitaireCriteria(movedCard, workPile3Card)

    const nearWorkPile3XPos = workPileXPos >= (right1WorkPileXPos - 10) && workPileXPos <= (right1WorkPileXPos + 10)
    const nearWorkPile3YPos = (workPileYPos + absoluteWorkPile2YPos) >= absoluteWorkPile3YPos && (workPileYPos + absoluteWorkPile2YPos) <= (absoluteWorkPile3YPos + 20)

    if(nearWorkPile3XPos && nearWorkPile3YPos) {
      setSolitaireWorkPile(solitaireWorkPile.filter(card => movedCard['id'] !== card['id']))
      setSolitaireWork3Pile(solitaireWork3Pile => [movedCard, ...solitaireWork3Pile])
    }

    const workPile4Card = solitaireWork4Pile[0]
    const workPile4SolitaireCriteria = solitaireCriteria(movedCard, workPile4Card)

    const nearWorkPile4XPos = workPileXPos >= (right2WorkPileXPos - 10) && workPileXPos <= (right2WorkPileXPos + 10)
    const nearWorkPile4YPos = (workPileYPos + absoluteWorkPile2YPos) >= absoluteWorkPile4YPos && (workPileYPos + absoluteWorkPile2YPos) <= (absoluteWorkPile4YPos + 20)

    if(nearWorkPile4XPos && nearWorkPile4YPos) {
      setSolitaireWorkPile(solitaireWorkPile.filter(card => movedCard['id'] !== card['id']))
      setSolitaireWork4Pile(solitaireWork4Pile => [movedCard, ...solitaireWork4Pile])
    }
  }

  function checkNearWork3Piles() {
    const movedCard = solitaireWorkPile[0]

    const workPile1Card = solitaireWork1Pile[0]
    const workPile1SolitaireCriteria = solitaireCriteria(movedCard, workPile1Card)

    const nearWorkPile1XPos = workPileXPos >= (left2WorkPileXPos - 10) && workPileXPos <= (left2WorkPileXPos + 10)
    const nearWorkPile1YPos = (workPileYPos + absoluteWorkPile3YPos) >= absoluteWorkPile1YPos && (workPileYPos + absoluteWorkPile3YPos) <= (absoluteWorkPile1YPos + 20)

    if(nearWorkPile1XPos && nearWorkPile1YPos) {
      setSolitaireWorkPile(solitaireWorkPile.filter(card => movedCard['id'] !== card['id']))
      setSolitaireWork1Pile(solitaireWork1Pile => [movedCard, ...solitaireWork1Pile])
    }

    const workPile2Card = solitaireWork2Pile[0]
    const workPile2SolitaireCriteria = solitaireCriteria(movedCard, workPile2Card)

    const nearWorkPile2XPos = workPileXPos >= (left1WorkPileXPos - 10) && workPileXPos <= (left1WorkPileXPos + 10)
    const nearWorkPile2YPos = (workPileYPos + absoluteWorkPile3YPos) >= absoluteWorkPile2YPos && (workPileYPos + absoluteWorkPile3YPos) <= (absoluteWorkPile2YPos + 20)

    if(nearWorkPile2XPos && nearWorkPile2YPos) {
      setSolitaireWorkPile(solitaireWorkPile.filter(card => movedCard['id'] !== card['id']))
      setSolitaireWork2Pile(solitaireWork2Pile => [movedCard, ...solitaireWork2Pile])
    }

    const workPile4Card = solitaireWork4Pile[0]
    const workPile4SolitaireCriteria = solitaireCriteria(movedCard, workPile4Card)

    const nearWorkPile4XPos = workPileXPos >= (right1WorkPileXPos - 10) && workPileXPos <= (right1WorkPileXPos + 10)
    const nearWorkPile4YPos = (workPileYPos + absoluteWorkPile3YPos) >= absoluteWorkPile4YPos && (workPileYPos + absoluteWorkPile3YPos) <= (absoluteWorkPile4YPos + 20)

    if(nearWorkPile4XPos && nearWorkPile4YPos) {
      setSolitaireWorkPile(solitaireWorkPile.filter(card => movedCard['id'] !== card['id']))
      setSolitaireWork4Pile(solitaireWork4Pile => [movedCard, ...solitaireWork4Pile])
    }
  }

  function checkNearWork4Piles() {
    const movedCard = solitaireWorkPile[0]

    const workPile1Card = solitaireWork1Pile[0]
    const workPile1SolitaireCriteria = solitaireCriteria(movedCard, workPile1Card)

    const nearWorkPile1XPos = workPileXPos >= (left3WorkPileXPos - 10) && workPileXPos <= (left3WorkPileXPos + 10)
    const nearWorkPile1YPos = (workPileYPos + absoluteWorkPile4YPos) >= absoluteWorkPile1YPos && (workPileYPos + absoluteWorkPile4YPos) <= (absoluteWorkPile1YPos + 20)

    if(nearWorkPile1XPos && nearWorkPile1YPos) {
      setSolitaireWorkPile(solitaireWorkPile.filter(card => movedCard['id'] !== card['id']))
      setSolitaireWork1Pile(solitaireWork1Pile => [movedCard, ...solitaireWork1Pile])
    }

    const workPile2Card = solitaireWork2Pile[0]
    const workPile2SolitaireCriteria = solitaireCriteria(movedCard, workPile2Card)

    const nearWorkPile2XPos = workPileXPos >= (left2WorkPileXPos - 10) && workPileXPos <= (left2WorkPileXPos + 10)
    const nearWorkPile2YPos = (workPileYPos + absoluteWorkPile4YPos) >= absoluteWorkPile2YPos && (workPileYPos + absoluteWorkPile4YPos) <= (absoluteWorkPile2YPos + 20)

    if(nearWorkPile2XPos && nearWorkPile2YPos) {
      setSolitaireWorkPile(solitaireWorkPile.filter(card => movedCard['id'] !== card['id']))
      setSolitaireWork2Pile(solitaireWork2Pile => [movedCard, ...solitaireWork2Pile])
    }

    const workPile3Card = solitaireWork3Pile[0]
    const workPile3SolitaireCriteria = solitaireCriteria(movedCard, workPile3Card)

    const nearWorkPile3XPos = workPileXPos >= (left1WorkPileXPos - 10) && workPileXPos <= (left1WorkPileXPos + 10)
    const nearWorkPile3YPos = (workPileYPos + absoluteWorkPile4YPos) >= absoluteWorkPile3YPos && (workPileYPos + absoluteWorkPile4YPos) <= (absoluteWorkPile3YPos + 20)

    if(nearWorkPile3XPos && nearWorkPile3YPos) {
      setSolitaireWorkPile(solitaireWorkPile.filter(card => movedCard['id'] !== card['id']))
      setSolitaireWork3Pile(solitaireWork3Pile => [movedCard, ...solitaireWork3Pile])
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

    setBroadcastPlayerUuid(playerUuid)

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

    const nearWorkPile2XPos = workPilePreviewXPos >= (right1WorkPileXPos - 10) && workPilePreviewXPos <= (right1WorkPileXPos + 10)
    const nearWorkPile2YPos = (absoluteWorkPile1YPos - yDistanceOfPreviewCards + workPilePreviewYPos) >= absoluteWorkPile2YPos && (absoluteWorkPile1YPos - yDistanceOfPreviewCards + workPilePreviewYPos) <= (absoluteWorkPile2YPos + 20)

    if(nearWorkPile2XPos && nearWorkPile2YPos) {
      const movedCards = solitaireWorkPile.filter((card, index) => index <= previewCardIndex)
      setSolitaireWorkPile(solitaireWorkPile.filter((card, index) => index > previewCardIndex))
      setSolitaireWork2Pile(solitaireWork2Pile => [movedCards, ...solitaireWork2Pile].flat())
    }

    const workPile3Card = solitaireWork3Pile[0]
    const workPile3SolitaireCriteria = solitaireCriteria(movedCard, workPile3Card)

    const nearWorkPile3XPos = workPilePreviewXPos >= (right2WorkPileXPos - 10) && workPilePreviewXPos <= (right2WorkPileXPos + 10)
    const nearWorkPile3YPos = (absoluteWorkPile1YPos - yDistanceOfPreviewCards + workPilePreviewYPos) >= absoluteWorkPile3YPos && (absoluteWorkPile1YPos - yDistanceOfPreviewCards + workPilePreviewYPos) <= (absoluteWorkPile3YPos + 20)

    if(nearWorkPile3XPos && nearWorkPile3YPos) {
      const movedCards = solitaireWorkPile.filter((card, index) => index <= previewCardIndex)
      setSolitaireWorkPile(solitaireWorkPile.filter((card, index) => index > previewCardIndex))
      setSolitaireWork3Pile(solitaireWork3Pile => [movedCards, ...solitaireWork3Pile].flat())
    }

    const workPile4Card = solitaireWork4Pile[0]
    const workPile4SolitaireCriteria = solitaireCriteria(movedCard, workPile4Card)

    const nearWorkPile4XPos = workPilePreviewXPos >= (right3WorkPileXPos - 10) && workPilePreviewXPos <= (right3WorkPileXPos + 10)
    const nearWorkPile4YPos = (absoluteWorkPile1YPos - yDistanceOfPreviewCards + workPilePreviewYPos) >= absoluteWorkPile4YPos && (absoluteWorkPile1YPos - yDistanceOfPreviewCards + workPilePreviewYPos) <= (absoluteWorkPile4YPos + 20)

    if(nearWorkPile4XPos && nearWorkPile4YPos) {
      const movedCards = solitaireWorkPile.filter((card, index) => index <= previewCardIndex)
      setSolitaireWorkPile(solitaireWorkPile.filter((card, index) => index > previewCardIndex))
      setSolitaireWork4Pile(solitaireWork4Pile => [movedCards, ...solitaireWork4Pile].flat())
    }
  }

  function checkPreviewNearWork2Piles(previewCardIndex) {
    const movedCard = solitaireWorkPile[previewCardIndex]
    const yDistanceOfPreviewCards = previewCardIndex * 15

    const workPile1Card = solitaireWork1Pile[0]
    const workPile1SolitaireCriteria = solitaireCriteria(movedCard, workPile1Card)

    const nearWorkPile1XPos = workPilePreviewXPos >= (left1WorkPileXPos - 10) && workPilePreviewXPos <= (left1WorkPileXPos + 10)
    const nearWorkPile1YPos = (absoluteWorkPile2YPos - yDistanceOfPreviewCards + workPilePreviewYPos) >= absoluteWorkPile1YPos && (absoluteWorkPile2YPos - yDistanceOfPreviewCards + workPilePreviewYPos) <= (absoluteWorkPile1YPos + 20)

    if(nearWorkPile1XPos && nearWorkPile1YPos) {
      const movedCards = solitaireWorkPile.filter((card, index) => index <= previewCardIndex)
      setSolitaireWorkPile(solitaireWorkPile.filter((card, index) => index > previewCardIndex))
      setSolitaireWork1Pile(solitaireWork1Pile => [movedCards, ...solitaireWork1Pile].flat())
    }

    const workPile3Card = solitaireWork3Pile[0]
    const workPile3SolitaireCriteria = solitaireCriteria(movedCard, workPile3Card)

    const nearWorkPile3XPos = workPilePreviewXPos >= (right1WorkPileXPos - 10) && workPilePreviewXPos <= (right1WorkPileXPos + 10)
    const nearWorkPile3YPos = (absoluteWorkPile2YPos - yDistanceOfPreviewCards + workPilePreviewYPos) >= absoluteWorkPile3YPos && (absoluteWorkPile2YPos - yDistanceOfPreviewCards + workPilePreviewYPos) <= (absoluteWorkPile3YPos + 20)

    if(nearWorkPile3XPos && nearWorkPile3YPos) {
      const movedCards = solitaireWorkPile.filter((card, index) => index <= previewCardIndex)
      setSolitaireWorkPile(solitaireWorkPile.filter((card, index) => index > previewCardIndex))
      setSolitaireWork3Pile(solitaireWork3Pile => [movedCards, ...solitaireWork3Pile].flat())
    }

    const workPile4Card = solitaireWork4Pile[0]
    const workPile4SolitaireCriteria = solitaireCriteria(movedCard, workPile4Card)

    const nearWorkPile4XPos = workPilePreviewXPos >= (right2WorkPileXPos - 10) && workPilePreviewXPos <= (right2WorkPileXPos + 10)
    const nearWorkPile4YPos = (absoluteWorkPile2YPos - yDistanceOfPreviewCards + workPilePreviewYPos) >= absoluteWorkPile4YPos && (absoluteWorkPile2YPos - yDistanceOfPreviewCards + workPilePreviewYPos) <= (absoluteWorkPile4YPos + 20)

    if(nearWorkPile4XPos && nearWorkPile4YPos) {
      const movedCards = solitaireWorkPile.filter((card, index) => index <= previewCardIndex)
      setSolitaireWorkPile(solitaireWorkPile.filter((card, index) => index > previewCardIndex))
      setSolitaireWork4Pile(solitaireWork4Pile => [movedCards, ...solitaireWork4Pile].flat())
    }
  }

  function checkPreviewNearWork3Piles(previewCardIndex) {
    const movedCard = solitaireWorkPile[previewCardIndex]
    const yDistanceOfPreviewCards = previewCardIndex * 15

    const workPile1Card = solitaireWork1Pile[0]
    const workPile1SolitaireCriteria = solitaireCriteria(movedCard, workPile1Card)

    const nearWorkPile1XPos = workPilePreviewXPos >= (left2WorkPileXPos - 10) && workPilePreviewXPos <= (left2WorkPileXPos + 10)
    const nearWorkPile1YPos = (absoluteWorkPile3YPos - yDistanceOfPreviewCards + workPilePreviewYPos) >= absoluteWorkPile1YPos && (absoluteWorkPile3YPos - yDistanceOfPreviewCards + workPilePreviewYPos) <= (absoluteWorkPile1YPos + 20)

    if(nearWorkPile1XPos && nearWorkPile1YPos) {
      const movedCards = solitaireWorkPile.filter((card, index) => index <= previewCardIndex)
      setSolitaireWorkPile(solitaireWorkPile.filter((card, index) => index > previewCardIndex))
      setSolitaireWork1Pile(solitaireWork1Pile => [movedCards, ...solitaireWork1Pile].flat())
    }

    const workPile2Card = solitaireWork2Pile[0]
    const workPile2SolitaireCriteria = solitaireCriteria(movedCard, workPile2Card)

    const nearWorkPile2XPos = workPilePreviewXPos >= (left1WorkPileXPos - 10) && workPilePreviewXPos <= (left1WorkPileXPos + 10)
    const nearWorkPile2YPos = (absoluteWorkPile3YPos - yDistanceOfPreviewCards + workPilePreviewYPos) >= absoluteWorkPile2YPos && (absoluteWorkPile3YPos - yDistanceOfPreviewCards + workPilePreviewYPos) <= (absoluteWorkPile2YPos + 20)

    if(nearWorkPile2XPos && nearWorkPile2YPos) {
      const movedCards = solitaireWorkPile.filter((card, index) => index <= previewCardIndex)
      setSolitaireWorkPile(solitaireWorkPile.filter((card, index) => index > previewCardIndex))
      setSolitaireWork2Pile(solitaireWork2Pile => [movedCards, ...solitaireWork2Pile].flat())
    }

    const workPile4Card = solitaireWork4Pile[0]
    const workPile4SolitaireCriteria = solitaireCriteria(movedCard, workPile4Card)

    const nearWorkPile4XPos = workPilePreviewXPos >= (right1WorkPileXPos - 10) && workPilePreviewXPos <= (right1WorkPileXPos + 10)
    const nearWorkPile4YPos = (absoluteWorkPile3YPos - yDistanceOfPreviewCards + workPilePreviewYPos) >= absoluteWorkPile4YPos && (absoluteWorkPile3YPos - yDistanceOfPreviewCards + workPilePreviewYPos) <= (absoluteWorkPile4YPos + 20)

    if(nearWorkPile4XPos && nearWorkPile4YPos) {
      const movedCards = solitaireWorkPile.filter((card, index) => index <= previewCardIndex)
      setSolitaireWorkPile(solitaireWorkPile.filter((card, index) => index > previewCardIndex))
      setSolitaireWork4Pile(solitaireWork4Pile => [movedCards, ...solitaireWork4Pile].flat())
    }
  }

  function checkPreviewNearWork4Piles(previewCardIndex) {
    const movedCard = solitaireWorkPile[previewCardIndex]
    const yDistanceOfPreviewCards = previewCardIndex * 15

    const workPile1Card = solitaireWork1Pile[0]
    const workPile1SolitaireCriteria = solitaireCriteria(movedCard, workPile1Card)

    const nearWorkPile1XPos = workPilePreviewXPos >= (left3WorkPileXPos - 10) && workPilePreviewXPos <= (left3WorkPileXPos + 10)
    const nearWorkPile1YPos = (absoluteWorkPile4YPos - yDistanceOfPreviewCards + workPilePreviewYPos) >= absoluteWorkPile1YPos && (absoluteWorkPile4YPos - yDistanceOfPreviewCards + workPilePreviewYPos) <= (absoluteWorkPile1YPos + 20)

    if(nearWorkPile1XPos && nearWorkPile1YPos) {
      const movedCards = solitaireWorkPile.filter((card, index) => index <= previewCardIndex)
      setSolitaireWorkPile(solitaireWorkPile.filter((card, index) => index > previewCardIndex))
      setSolitaireWork1Pile(solitaireWork1Pile => [movedCards, ...solitaireWork1Pile].flat())
    }

    const workPile2Card = solitaireWork2Pile[0]
    const workPile2SolitaireCriteria = solitaireCriteria(movedCard, workPile2Card)

    const nearWorkPile2XPos = workPilePreviewXPos >= (left2WorkPileXPos - 10) && workPilePreviewXPos <= (left2WorkPileXPos + 10)
    const nearWorkPile2YPos = (absoluteWorkPile4YPos - yDistanceOfPreviewCards + workPilePreviewYPos) >= absoluteWorkPile2YPos && (absoluteWorkPile4YPos - yDistanceOfPreviewCards + workPilePreviewYPos) <= (absoluteWorkPile2YPos + 20)

    if(nearWorkPile2XPos && nearWorkPile2YPos) {
      const movedCards = solitaireWorkPile.filter((card, index) => index <= previewCardIndex)
      setSolitaireWorkPile(solitaireWorkPile.filter((card, index) => index > previewCardIndex))
      setSolitaireWork2Pile(solitaireWork2Pile => [movedCards, ...solitaireWork2Pile].flat())
    }

    const workPile3Card = solitaireWork3Pile[0]
    const workPile3SolitaireCriteria = solitaireCriteria(movedCard, workPile3Card)

    const nearWorkPile3XPos = workPilePreviewXPos >= (left1WorkPileXPos - 10) && workPilePreviewXPos <= (left1WorkPileXPos + 10)
    const nearWorkPile3YPos = (absoluteWorkPile4YPos - yDistanceOfPreviewCards + workPilePreviewYPos) >= absoluteWorkPile3YPos && (absoluteWorkPile4YPos - yDistanceOfPreviewCards + workPilePreviewYPos) <= (absoluteWorkPile3YPos + 20)

    if(nearWorkPile3XPos && nearWorkPile3YPos) {
      const movedCards = solitaireWorkPile.filter((card, index) => index <= previewCardIndex)
      setSolitaireWorkPile(solitaireWorkPile.filter((card, index) => index > previewCardIndex))
      setSolitaireWork3Pile(solitaireWork3Pile => [movedCards, ...solitaireWork3Pile].flat())
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
          disabled={!solitaireWorkPile[12]}
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
          disabled={!solitaireWorkPile[11]}
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
          disabled={!solitaireWorkPile[10]}
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
          disabled={!solitaireWorkPile[9]}
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
          disabled={!solitaireWorkPile[8]}
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
          disabled={!solitaireWorkPile[7]}
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
          disabled={!solitaireWorkPile[6]}
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
          disabled={!solitaireWorkPile[5]}
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
          disabled={!solitaireWorkPile[4]}
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
          disabled={!solitaireWorkPile[3]}
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
          disabled={!solitaireWorkPile[2]}
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
          disabled={!solitaireWorkPile[1]}
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
        disabled={!solitaireWorkPile[0]}
        onDrag={(event, ui) => updateWorkPileXYPos(event, ui)}
        onStop={(event, ui) => checkNearWorkPile(event, ui)}
        position={{x: workPileXPos, y: workPileYPos}}
      >
        <div className={`solitaireWorkCard ${cardBorderStyle(solitaireWorkPile[0])} ${zIndexStyle(workPileXPos, workPileYPos)}`}>
          <div className={`topNumSuit ${cardColor(solitaireWorkPile[0])}`}>
            {displayNumSuit(solitaireWorkPile[0])}
          </div>
          <div className={`middleSuit ${cardColor(solitaireWorkPile[0])}`}>
            {displaySuit(solitaireWorkPile[0])}
          </div>
          <div className={`bottomNumSuit ${cardColor(solitaireWorkPile[0])}`}>
            {displaySuitNum(solitaireWorkPile[0])}
          </div>
        </div>
      </Draggable>
    </div>
  )
}

export default SolitaireWorkPileArea
