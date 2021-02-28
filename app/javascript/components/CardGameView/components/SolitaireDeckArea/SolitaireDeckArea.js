import React, { useEffect } from "react";
import Draggable from "react-draggable";

const CardDeckHolder = ({
  playerPos,
  playerUuid,
  playerName,
  playerActive,
  setPlayerActive,
  broadcastTime,
  setBroadcastTime,
  nertzPile,
  setNertzPile,
  broadcastPlayerUuid,
  setBroadcastPlayerUuid,
  solitaireDeck,
  solitairePile,
  solitaireLeftoverPile,
  setSolitaireDeck,
  setSolitairePile,
  setSolitaireLeftoverPile,
  setSolitaireWork1Pile,
  setSolitaireWork2Pile,
  setSolitaireWork3Pile,
  setSolitaireWork4Pile
}) => {

  function handleSolitaireFlip() {
    if(playerActive) {
      flipSolitaireCards()
      setBroadcastPlayerUuid(playerUuid)
    } else {
      /*
      dealCards()
      setPlayerActive(true)
      setBroadcastPlayerUuid(playerUuid)
      */
    }
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

  function dealCards() {
    let cardDeck = generateCardDeck()
    let shuffledCardDeck = shuffleCardDeck(cardDeck)

    let nertzPile = shuffledCardDeck.slice(0,13)

    let solitaireWorkPile1 = shuffledCardDeck.slice(13,14)
    let solitaireWorkPile2 = shuffledCardDeck.slice(14,15)
    let solitaireWorkPile3 = shuffledCardDeck.slice(15,16)
    let solitaireWorkPile4 = shuffledCardDeck.slice(16,17)

    let solitairePile = shuffledCardDeck.slice(17,20)
    let solitaireDeck = shuffledCardDeck.slice(20,52)

    setNertzPile(nertzPile)
    setSolitaireDeck(solitaireDeck)
    setSolitairePile(solitairePile)

    setSolitaireWork1Pile(solitaireWorkPile1)
    setSolitaireWork2Pile(solitaireWorkPile2)
    setSolitaireWork3Pile(solitaireWorkPile3)
    setSolitaireWork4Pile(solitaireWorkPile4)

    /*
    console.log(shuffledCardDeck)

    console.log('Nertz Pile')
    console.log(nertzPile)

    console.log('Solitaire Work 1')
    console.log(solitaireWorkPile1)

    console.log('Solitaire Work 2')
    console.log(solitaireWorkPile2)

    console.log('Solitaire Work 3')
    console.log(solitaireWorkPile3)

    console.log('Solitaire Work 4')
    console.log(solitaireWorkPile4)

    console.log('Solitaire Pile')
    console.log(solitairePile)

    console.log('Solitaire Deck')
    console.log(solitaireDeck)
    */

  }

  function generateCardDeck() {
    const cardValues = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
    const cardSuits = ['♥','♠','♦','♣']
    const cardDeck = []
    let cardId = 0

    for (const cardValue of cardValues) {
      for (const cardSuit of cardSuits) {
        let cardColor = cardSuit == '♥' || cardSuit == '♦' ? 'red' : 'black'
        let cardNumber = determineCardNumber(cardValue)

        let card = {
          id: cardId,
          value: cardValue,
          number: cardNumber,
          suit: cardSuit,
          color: cardColor
        }

        cardDeck.push(card)
        cardId += 1
      }
    }

    return shuffleCardDeck(cardDeck)
  }

  function shuffleCardDeck(cardDeck) {
    for(let cardPos = cardDeck.length - 1; cardPos > 0; cardPos--){
      const randomPos = Math.floor(Math.random() * cardPos)
      const tempCard = cardDeck[cardPos]

      cardDeck[cardPos] = cardDeck[randomPos]
      cardDeck[randomPos] = tempCard
    }

    return cardDeck
  }

  function determineCardNumber(cardValue) {
    switch (cardValue) {
      case 'A':
        return 1
      case 'J':
        return 11
      case 'Q':
        return 12
      case 'K':
        return 13
      default:
        return parseInt(cardValue)
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

  return (
    <div
      className={cardDeckClassNames()}
      onClick={() => handleSolitaireFlip()}
    >
    </div>
  )
}

export default CardDeckHolder
