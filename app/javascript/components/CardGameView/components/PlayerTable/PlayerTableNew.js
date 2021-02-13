import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from 'semantic-ui-react';
import Card from "../../components/Card/Card"
import CardHolder from "../../components/CardHolder/CardHolder"
import SolitaireDeckArea from "../../components/SolitaireDeckArea/SolitaireDeckArea"
import SolitairePileArea from "../../components/SolitairePileArea/SolitairePileArea"
import NertzPileArea from "../../components/NertzPileArea/NertzPileArea"
import PlayerGameArea from "../../components/PlayerGameArea/PlayerGameArea"

const PlayerTableNew = ({
  playerPos,
  playerUuid,
  allPlayers,
  playerName,
  playerDbId,
  playerActive,
  setPlayerName,
  setPlayerDbId,
  setPlayerActive,
  broadcastTime,
  solitaireDeck,
  solitairePile,
  solitaireLeftoverPile,
  setSolitaireDeck,
  setSolitairePile,
  setSolitaireLeftoverPile,
  solitaireXPos,
  solitaireYPos,
  setSolitaireXPos,
  setSolitaireYPos,
  broadcastPlayerUuid,
  setBroadcastPlayerUuid,
  setBroadcastTime
}) => {

  useEffect(() => {
    if(playerActive && playerUuid == broadcastPlayerUuid) {
      broadcastPlayerSolitaire(
        playerPos,
        playerUuid,
        playerActive,
        playerName,
        solitaireDeck,
        solitairePile,
        solitaireLeftoverPile
      );
    }
  }, [solitairePile])

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

    setSolitaireDeck(solitaireDeck)
    setSolitairePile(solitairePile)

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

  }

  function generateCardDeck() {
    const cardValues = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
    const cardSuits = ['♥','♠','♦','♣']
    const cardDeck = []
    let cardId = 0

    for (const cardValue of cardValues) {
      for (const cardSuit of cardSuits) {
        let cardColor = cardSuit == '♥' || cardSuit == '♦' ? 'red' : 'black'

        let card = {
          id: cardId,
          value: cardValue,
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

  function broadcastPlayerSolitaire(playerPos, playerUuid, playerActive, playerName, solitaireDeck, solitairePile, solitaireLeftoverPile) {
    const currentTime = new Date().getTime();
    setBroadcastTime(currentTime)

    fetch('/card_game/broadcast_player_solitaire?' +
      'data_type=' + 'player_solitaire' +
      '&player_pos=' + playerPos +
      '&player_uuid=' + playerUuid +
      '&player_active=' + playerActive +
      '&player_name=' + playerName +
      '&solitaire_deck=' + JSON.stringify(solitaireDeck) +
      '&solitaire_pile=' + JSON.stringify(solitairePile) +
      '&leftover_solitaire_pile=' + JSON.stringify(solitaireLeftoverPile) +
      '&time=' + broadcastTime
    );
  }

  function broadcastPlayerSolitaireXYPos(playerPos, playerUuid, solitaireXPos, solitaireYPos) {
    const delay = 25
    const currentTime = new Date().getTime();
    const meetsDelayThreshold = (currentTime - delay) > broadcastTime

    if(meetsDelayThreshold) {
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

  return (
    <div className="PlayerTableNew">
      <div className="CardsArea">
        <div className="NertzPileArea">
          <NertzPileArea
          />
        </div>
        <div className="SolitaireDeckArea">
          <SolitaireDeckArea
            playerPos={playerPos}
            playerUuid={playerUuid}
            playerActive={playerActive}
            setPlayerActive={setPlayerActive}
            broadcastTime={broadcastTime}
            dealCards={dealCards}
            solitaireDeck={solitaireDeck}
            solitairePile={solitairePile}
            solitaireLeftoverPile={solitaireLeftoverPile}
            setSolitaireDeck={setSolitaireDeck}
            setSolitairePile={setSolitairePile}
            setSolitaireLeftoverPile={setSolitaireLeftoverPile}
            setBroadcastPlayerUuid={setBroadcastPlayerUuid}
          />
          <SolitairePileArea
            playerPos={playerPos}
            playerUuid={playerUuid}
            solitairePile={solitairePile}
            solitaireXPos={solitaireXPos}
            solitaireYPos={solitaireYPos}
            setSolitaireXPos={setSolitaireXPos}
            setSolitaireYPos={setSolitaireYPos}
            setBroadcastPlayerUuid={setBroadcastPlayerUuid}
          />
        </div>
        <div className="SolitaireArea">
          <CardHolder/>
        </div>
        <div className="SolitaireArea">
          <CardHolder/>
        </div>
        <div className="SolitaireArea">
          <CardHolder/>
        </div>
        <div className="SolitaireArea">
          <CardHolder/>
        </div>
      </div>
      <PlayerGameArea
        playerPos={playerPos}
        playerUuid={playerUuid}
        playerActive={playerActive}
        playerName={playerName}
        setPlayerName={setPlayerName}
        setPlayerActive={setPlayerActive}
        allPlayers={allPlayers}
        dealCards={dealCards}
        solitaireDeck={solitaireDeck}
        solitairePile={solitairePile}
        solitaireLeftoverPile={solitaireLeftoverPile}
        setSolitaireDeck={setSolitaireDeck}
        setSolitairePile={setSolitairePile}
        setSolitaireLeftoverPile={setSolitaireLeftoverPile}
        setBroadcastPlayerUuid={setBroadcastPlayerUuid}
      />
    </div>
  )
}

export default PlayerTableNew;
