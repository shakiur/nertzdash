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
      broadcastPlayerWorkPileXYPos(
        playerPos,
        playerUuid,
        workPilePos,
        workPileXPos,
        workPileYPos
      )
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

  function previewCardStyle(card) {
    if(card) {
      return 'previewCardFull'
    } else {
      return 'previewCardHidden'
    }
  }

  function PreviewCards() {
    return solitaireWorkPile.slice(1, solitaireWorkPile.length).reverse().map((card, index) =>
      <Draggable
        disabled={!card}
        onDrag={(event, ui) => updateWorkPilePreviewXYPos(event, ui)}
        position={{x: workPilePreviewXPos, y: workPilePreviewYPos}}
        key={parseInt(card['id'])}
      >
        <div
          key={parseInt(card['id'])}
          className={`solitaireWorkPreviewCard ${previewBorderStyle(card)}`}
        >
          <div className={`topNumSuit ${cardColor(card)}`}>
            {displayNumSuit(card)}
          </div>
        </div>
      </Draggable>
    )
  }

  function updateWorkPileXYPos(event, ui) {
    setBroadcastPlayerUuid(playerUuid)
    setWorkPileXPos(workPileXPos + ui.deltaX)
    setWorkPileYPos(workPileYPos + ui.deltaY)
  }

  function updateWorkPilePreviewXYPos(event, ui) {
    setBroadcastPlayerUuid(playerUuid)

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

  function checkPreviewNearWorkPile(event, ui, card) {
    switch(workPilePos) {
      case 1:
        /*
        checkPreviewNearWork1Piles()
        */
        break;
      case 2:
        /*
        checkPreviewNearWork2Piles()
        */
        break;
      case 3:
        /*
        checkPreviewNearWork3Piles()
        */
        break;
      case 4:
        /*
        checkPreviewNearWork4Piles()
        */
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
    <div className="SolitaireWorkPile">
      <Draggable
        disabled={!solitaireWorkPile[12]}
        onDrag={(event, ui) => updateWorkPilePreviewXYPos(event, ui)}
        onStop={(event, ui) => checkPreviewNearWorkPile(event, ui, solitaireWorkPile[12])}
        position={{x: workPilePreviewXPos, y: workPilePreviewYPos}}
      >
        <div className={`solitaireWorkPreviewCard ${previewCardStyle(solitaireWorkPile[12])} ${zIndexStyle(workPilePreviewXPos, workPilePreviewYPos)}`}>
          <div className={`topNumSuit ${cardColor(solitaireWorkPile[12])}`}>
            {displayNumSuit(solitaireWorkPile[12])}
          </div>
        </div>
      </Draggable>
      <Draggable
        disabled={!solitaireWorkPile[11]}
        onDrag={(event, ui) => updateWorkPilePreviewXYPos(event, ui)}
        onStop={(event, ui) => checkPreviewNearWorkPile(event, ui, solitaireWorkPile[11])}
        position={{x: workPilePreviewXPos, y: workPilePreviewYPos}}
      >
        <div className={`solitaireWorkPreviewCard ${previewCardStyle(solitaireWorkPile[11])} ${zIndexStyle(workPilePreviewXPos, workPilePreviewYPos)}`}>
          <div className={`topNumSuit ${cardColor(solitaireWorkPile[11])}`}>
            {displayNumSuit(solitaireWorkPile[11])}
          </div>
        </div>
      </Draggable>
      <Draggable
        disabled={!solitaireWorkPile[10]}
        onDrag={(event, ui) => updateWorkPilePreviewXYPos(event, ui)}
        onStop={(event, ui) => checkPreviewNearWorkPile(event, ui, solitaireWorkPile[10])}
        position={{x: workPilePreviewXPos, y: workPilePreviewYPos}}
      >
        <div className={`solitaireWorkPreviewCard ${previewCardStyle(solitaireWorkPile[10])} ${zIndexStyle(workPilePreviewXPos, workPilePreviewYPos)}`}>
          <div className={`topNumSuit ${cardColor(solitaireWorkPile[10])}`}>
            {displayNumSuit(solitaireWorkPile[10])}
          </div>
        </div>
      </Draggable>
      <Draggable
        disabled={!solitaireWorkPile[9]}
        onDrag={(event, ui) => updateWorkPilePreviewXYPos(event, ui)}
        onStop={(event, ui) => checkPreviewNearWorkPile(event, ui, solitaireWorkPile[9])}
        position={{x: workPilePreviewXPos, y: workPilePreviewYPos}}
      >
        <div className={`solitaireWorkPreviewCard ${previewCardStyle(solitaireWorkPile[9])} ${zIndexStyle(workPilePreviewXPos, workPilePreviewYPos)}`}>
          <div className={`topNumSuit ${cardColor(solitaireWorkPile[9])}`}>
            {displayNumSuit(solitaireWorkPile[9])}
          </div>
        </div>
      </Draggable>
      <Draggable
        disabled={!solitaireWorkPile[8]}
        onDrag={(event, ui) => updateWorkPilePreviewXYPos(event, ui)}
        onStop={(event, ui) => checkPreviewNearWorkPile(event, ui, solitaireWorkPile[8])}
        position={{x: workPilePreviewXPos, y: workPilePreviewYPos}}
      >
        <div className={`solitaireWorkPreviewCard ${previewCardStyle(solitaireWorkPile[8])} ${zIndexStyle(workPilePreviewXPos, workPilePreviewYPos)}`}>
          <div className={`topNumSuit ${cardColor(solitaireWorkPile[8])}`}>
            {displayNumSuit(solitaireWorkPile[8])}
          </div>
        </div>
      </Draggable>
      <Draggable
        disabled={!solitaireWorkPile[7]}
        onDrag={(event, ui) => updateWorkPilePreviewXYPos(event, ui)}
        onStop={(event, ui) => checkPreviewNearWorkPile(event, ui, solitaireWorkPile[7])}
        position={{x: workPilePreviewXPos, y: workPilePreviewYPos}}
      >
        <div className={`solitaireWorkPreviewCard ${previewCardStyle(solitaireWorkPile[7])} ${zIndexStyle(workPilePreviewXPos, workPilePreviewYPos)}`}>
          <div className={`topNumSuit ${cardColor(solitaireWorkPile[7])}`}>
            {displayNumSuit(solitaireWorkPile[7])}
          </div>
        </div>
      </Draggable>
      <Draggable
        disabled={!solitaireWorkPile[6]}
        onDrag={(event, ui) => updateWorkPilePreviewXYPos(event, ui)}
        onStop={(event, ui) => checkPreviewNearWorkPile(event, ui, solitaireWorkPile[6])}
        position={{x: workPilePreviewXPos, y: workPilePreviewYPos}}
      >
        <div className={`solitaireWorkPreviewCard ${previewCardStyle(solitaireWorkPile[6])} ${zIndexStyle(workPilePreviewXPos, workPilePreviewYPos)}`}>
          <div className={`topNumSuit ${cardColor(solitaireWorkPile[6])}`}>
            {displayNumSuit(solitaireWorkPile[6])}
          </div>
        </div>
      </Draggable>
      <Draggable
        disabled={!solitaireWorkPile[5]}
        onDrag={(event, ui) => updateWorkPilePreviewXYPos(event, ui)}
        onStop={(event, ui) => checkPreviewNearWorkPile(event, ui, solitaireWorkPile[5])}
        position={{x: workPilePreviewXPos, y: workPilePreviewYPos}}
      >
        <div className={`solitaireWorkPreviewCard ${previewCardStyle(solitaireWorkPile[5])} ${zIndexStyle(workPilePreviewXPos, workPilePreviewYPos)}`}>
          <div className={`topNumSuit ${cardColor(solitaireWorkPile[5])}`}>
            {displayNumSuit(solitaireWorkPile[5])}
          </div>
        </div>
      </Draggable>
      <Draggable
        disabled={!solitaireWorkPile[4]}
        onDrag={(event, ui) => updateWorkPilePreviewXYPos(event, ui)}
        onStop={(event, ui) => checkPreviewNearWorkPile(event, ui, solitaireWorkPile[4])}
        position={{x: workPilePreviewXPos, y: workPilePreviewYPos}}
      >
        <div className={`solitaireWorkPreviewCard ${previewCardStyle(solitaireWorkPile[4])} ${zIndexStyle(workPilePreviewXPos, workPilePreviewYPos)}`}>
          <div className={`topNumSuit ${cardColor(solitaireWorkPile[4])}`}>
            {displayNumSuit(solitaireWorkPile[4])}
          </div>
        </div>
      </Draggable>
      <Draggable
        disabled={!solitaireWorkPile[3]}
        onDrag={(event, ui) => updateWorkPilePreviewXYPos(event, ui)}
        onStop={(event, ui) => checkPreviewNearWorkPile(event, ui, solitaireWorkPile[3])}
        position={{x: workPilePreviewXPos, y: workPilePreviewYPos}}
      >
        <div className={`solitaireWorkPreviewCard ${previewCardStyle(solitaireWorkPile[3])} ${zIndexStyle(workPilePreviewXPos, workPilePreviewYPos)}`}>
          <div className={`topNumSuit ${cardColor(solitaireWorkPile[3])}`}>
            {displayNumSuit(solitaireWorkPile[3])}
          </div>
        </div>
      </Draggable>
      <Draggable
        disabled={!solitaireWorkPile[2]}
        onDrag={(event, ui) => updateWorkPilePreviewXYPos(event, ui)}
        onStop={(event, ui) => checkPreviewNearWorkPile(event, ui, solitaireWorkPile[2])}
        position={{x: workPilePreviewXPos, y: workPilePreviewYPos}}
      >
        <div className={`solitaireWorkPreviewCard ${previewCardStyle(solitaireWorkPile[2])} ${zIndexStyle(workPilePreviewXPos, workPilePreviewYPos)}`}>
          <div className={`topNumSuit ${cardColor(solitaireWorkPile[2])}`}>
            {displayNumSuit(solitaireWorkPile[2])}
          </div>
        </div>
      </Draggable>
      <Draggable
        disabled={!solitaireWorkPile[1]}
        onDrag={(event, ui) => updateWorkPilePreviewXYPos(event, ui)}
        onStop={(event, ui) => checkPreviewNearWorkPile(event, ui, solitaireWorkPile[1])}
        position={{x: workPilePreviewXPos, y: workPilePreviewYPos}}
      >
        <div className={`solitaireWorkPreviewCard ${previewCardStyle(solitaireWorkPile[1])} ${zIndexStyle(workPilePreviewXPos, workPilePreviewYPos)}`}>
          <div className={`topNumSuit ${cardColor(solitaireWorkPile[1])}`}>
            {displayNumSuit(solitaireWorkPile[1])}
          </div>
        </div>
      </Draggable>
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
