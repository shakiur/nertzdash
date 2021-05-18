import React, { useEffect } from "react";
import Draggable from "react-draggable";

const CardDeckHolder = ({
  playerPos,
  playerUuid,
  playerName,
  playerActive,
  setPlayerActive,
  setPlayerScore,
  broadcastTime,
  setBroadcastTime,
  broadcastPlayerUuid,
  setBroadcastPlayerUuid,
  solitaireDeck,
  solitairePile,
  solitaireLeftoverPile,
  setSolitaireDeck,
  setSolitairePile,
  setSolitaireLeftoverPile,
  setNertzPile,
  setSolitaireWork1Pile,
  setSolitaireWork2Pile,
  setSolitaireWork3Pile,
  setSolitaireWork4Pile,
  nertzWinner
}) => {

  function handleSolitaireFlip() {
    if(playerActive && !nertzWinner) {
      if(solitaireDeck.length == 52) {
        distributeInitialPiles()
        setBroadcastPlayerUuid(playerUuid)
      } else {
        flipSolitaireCards()
        setBroadcastPlayerUuid(playerUuid)
      }
    }
  }

  function distributeInitialPiles() {
    let nertzPile = solitaireDeck.slice(0,13)

    let solitaireWorkPile1 = solitaireDeck.slice(13,14)
    let solitaireWorkPile2 = solitaireDeck.slice(14,15)
    let solitaireWorkPile3 = solitaireDeck.slice(15,16)
    let solitaireWorkPile4 = solitaireDeck.slice(16,17)

    let solitairePile = solitaireDeck.slice(17,20)
    let newSolitaireDeck = solitaireDeck.slice(20,52)

    setNertzPile(nertzPile)
    setSolitaireDeck(newSolitaireDeck)
    setSolitairePile(solitairePile)

    setSolitaireWork1Pile(solitaireWorkPile1)
    setSolitaireWork2Pile(solitaireWorkPile2)
    setSolitaireWork3Pile(solitaireWorkPile3)
    setSolitaireWork4Pile(solitaireWorkPile4)

    setPlayerScore(-26)
  }

  function flipSolitaireCards() {
    moveSolitairePileToLeftover()
    resetSolitaireIfEmpty()
    flipCardsToSolitairePile()
  }

  function moveSolitairePileToLeftover() {
    if(solitairePile.length > 0) {
      setSolitaireLeftoverPile(solitaireLeftoverPile => [...solitaireLeftoverPile, ...solitairePile.reverse()])
      setSolitairePile([])
    }
  }

  function resetSolitaireIfEmpty() {
    if(solitairePile.length == 0 && solitaireDeck.length == 0) {
      setSolitaireDeck(solitaireLeftoverPile)
      setSolitaireLeftoverPile([])
    }
  }

  function flipCardsToSolitairePile() {
    const numCardsToFlip = Math.min(solitaireDeck.length, 3)

    for(let flipCount = 0; flipCount < numCardsToFlip; flipCount++) {
      let cardFlipped = solitaireDeck.shift()

      setSolitaireDeck(solitaireDeck.filter(card => cardFlipped['id'] !== card['id']))
      setSolitairePile(solitairePile => [cardFlipped, ...solitairePile])
    }
  }

  function cardDeckClassNames() {
    let classNames = "CardDeckHolder"

    if(solitaireDeck.length > 0) {
      classNames += ' solidLine'
    } else {
      classNames += ' dashedLine'
    }

    return classNames
  }

  function cardBorderStyle(deckLength, stackWidth) {
    if(deckLength > 0) {
      switch(stackWidth) {
        case 1:
          return 'solidLineCardOne'
        case 2:
          return 'solidLineCardTwo'
        case 3:
          return 'solidLineCardThree'
        default:
          return ''
      }
    } else {
      return 'dashedLine'
    }
  }

  function DisplayDeckCard() {
    if(solitaireDeck.length > 0) {
      return (
        <div className={`nertzFaceCard`}>
          <div className={`nertzLogo`}>
            N
          </div>
        </div>
      )
    } else {
      return (<></>)
    }
  }



  return (
    <div
      className={`CardDeckHolder ${cardBorderStyle(solitaireDeck.length, Math.floor(solitaireDeck.length/14))}`}
      onClick={() => handleSolitaireFlip()}
    >
      <DisplayDeckCard/>
    </div>
  )
}

export default CardDeckHolder
