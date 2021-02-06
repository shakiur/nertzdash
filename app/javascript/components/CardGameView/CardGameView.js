import React, { useState, useEffect } from "react";
import actionCable from "actioncable";

import PlayerTable from "./components/PlayerTable/PlayerTable"
import PlayerTableNew from "./components/PlayerTable/PlayerTableNew"
import CenterTable from "./components/CenterTable/CenterTable"

const cableApp = {}
const playerUuid = Math.random().toString(36).substring(7);

function CardGameView() {
  const [subscribed, setSubscribed] = useState(false);

  const [retrievalTime, setRetrievalTime] = useState(new Date().getTime());
  const [broadcastTime, setBroadcastTime] = useState(new Date().getTime());

  const [player1XPos, setPlayer1XPos] = useState(0);
  const [player1YPos, setPlayer1YPos] = useState(0);

  const [player2XPos, setPlayer2XPos] = useState(0);
  const [player2YPos, setPlayer2YPos] = useState(0);

  const [player3XPos, setPlayer3XPos] = useState(0);
  const [player3YPos, setPlayer3YPos] = useState(0);

  const [player4XPos, setPlayer4XPos] = useState(0);
  const [player4YPos, setPlayer4YPos] = useState(0);

  const [player5XPos, setPlayer5XPos] = useState(0);
  const [player5YPos, setPlayer5YPos] = useState(0);

  const [player6XPos, setPlayer6XPos] = useState(0);
  const [player6YPos, setPlayer6YPos] = useState(0);

  const [player1SolitaireDeck, setPlayer1SolitaireDeck] = useState(generateCardDeck());
  const [player1SolitairePile, setPlayer1SolitairePile] = useState([]);
  const [player1LeftoverSolitairePile, setPlayer1LeftoverSolitairePile] = useState([]);

  function updatePlayerXYPos(playerPos, xPos, yPos) {
    switch(playerPos) {
      case 1:
        setPlayer1XPos(xPos);
        setPlayer1YPos(yPos);
        break;
      case 2:
        setPlayer2XPos(xPos);
        setPlayer2YPos(yPos);
        break;
      case 3:
        setPlayer3XPos(xPos);
        setPlayer3YPos(yPos);
        break;
      case 4:
        setPlayer4XPos(xPos);
        setPlayer4YPos(yPos);
        break;
      case 5:
        setPlayer5XPos(xPos);
        setPlayer5YPos(yPos);
        break;
      case 6:
        setPlayer6XPos(xPos);
        setPlayer6YPos(yPos);
        break;
      default:
        break;
    }

  }

  function broadcastPlayerXYPos(playerPos, playerUuid, xPos, yPos) {
    const currentTime = new Date().getTime();
    setBroadcastTime(currentTime);

    fetch('/card_game/broadcast_player_position?' +
      'player_pos=' + playerPos +
      '&player_uuid=' + playerUuid +
      '&x_pos=' + xPos +
      '&y_pos=' + yPos +
      '&time=' + broadcastTime
    );
  }

  function generateCardDeck() {
    const cardValues = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
    const cardSuits = ['♥','♠','♦','♣']
    const cardDeck = []
    let cardId = 0

    for (const cardValue of cardValues) {
      for (const cardSuit of cardSuits) {
        let card = []
        let cardColor = cardSuit == '♥' || cardSuit == '♦' ? 'red' : 'black'

        card.push(cardId)
        card.push(cardValue)
        card.push(cardSuit)
        card.push(cardColor)

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

  function flipSolitaireCards(solitaireDeck, solitairePile, leftoverSolitairePile) {
    const numSolitairePile = solitairePile.length

    if(numSolitairePile > 0) {
      setPlayer1LeftoverSolitairePile(leftoverSolitairePile => [...leftoverSolitairePile, ...solitairePile.reverse()])
      setPlayer1SolitairePile([])
    }

    const numCardsToFlip = Math.min(solitaireDeck.length, 3)

    for(let flipCount = 0; flipCount < numCardsToFlip; flipCount++) {
      let cardFlipped = solitaireDeck.shift()

      setPlayer1SolitaireDeck(solitaireDeck.filter(card => cardFlipped[0] !== card[0]))
      setPlayer1SolitairePile(solitairePile => [cardFlipped, ...solitairePile])
    }

    if(numSolitairePile == 0 && numCardsToFlip == 0) {
      setPlayer1SolitaireDeck(leftoverSolitairePile)
      setPlayer1LeftoverSolitairePile([])
    }
  }

  useEffect(() => {
    cableApp.cable = actionCable.createConsumer()

    cableApp.cable.subscriptions.create({
      channel: 'CardGameChannel'
    }, {
      received: (data) => {
        console.log(data);

        const retrievedPlayerPos = parseInt(data["player_pos"]);
        const retrievedPlayerUuid = data["player_uuid"];
        const retrievedXPos = parseInt(data["x_pos"]);
        const retrievedYPos = parseInt(data["y_pos"]);
        const retrievedTime = parseInt(data["time"]);

        const retrievedFromDiffPlayer = retrievedPlayerUuid !== playerUuid
        const retrievedAfterLastUpdate = retrievedTime > retrievalTime

        if(retrievedFromDiffPlayer && retrievedAfterLastUpdate) {
          setRetrievalTime(retrievedTime);
          updatePlayerXYPos(retrievedPlayerPos, retrievedXPos, retrievedYPos);
        }
      }
    })

    setSubscribed(true);
  }, [subscribed]);

  return (
    <section className="CardGameView">
      <section className="TopRow">
        <PlayerTableNew
          playerPos={1}
          playerUuid={playerUuid}
          xPos={player1XPos}
          yPos={player1YPos}
          broadcastTime={broadcastTime}
          updatePlayerXYPos={updatePlayerXYPos}
          broadcastPlayerXYPos={broadcastPlayerXYPos}
          solitaireDeck={player1SolitaireDeck}
          solitairePile={player1SolitairePile}
          leftoverSolitairePile={player1LeftoverSolitairePile}
          flipSolitaireCards={flipSolitaireCards}
        />
        <PlayerTable
          playerPos={2}
          playerUuid={playerUuid}
          xPos={player2XPos}
          yPos={player2YPos}
          broadcastTime={broadcastTime}
          updatePlayerXYPos={updatePlayerXYPos}
          broadcastPlayerXYPos={broadcastPlayerXYPos}
        />
      </section>

      <section className="MiddleRow">
        <PlayerTable
          playerPos={3}
          playerUuid={playerUuid}
          xPos={player3XPos}
          yPos={player3YPos}
          broadcastTime={broadcastTime}
          updatePlayerXYPos={updatePlayerXYPos}
          broadcastPlayerXYPos={broadcastPlayerXYPos}
        />
        <CenterTable />
        <PlayerTable
          playerPos={4}
          playerUuid={playerUuid}
          xPos={player4XPos}
          yPos={player4YPos}
          broadcastTime={broadcastTime}
          updatePlayerXYPos={updatePlayerXYPos}
          broadcastPlayerXYPos={broadcastPlayerXYPos}
        />
      </section>

      <section className="BottomRow">
        <PlayerTable
          playerPos={5}
          playerUuid={playerUuid}
          xPos={player5XPos}
          yPos={player5YPos}
          broadcastTime={broadcastTime}
          updatePlayerXYPos={updatePlayerXYPos}
          broadcastPlayerXYPos={broadcastPlayerXYPos}
        />
        <PlayerTable
          playerPos={6}
          playerUuid={playerUuid}
          xPos={player6XPos}
          yPos={player6YPos}
          broadcastTime={broadcastTime}
          updatePlayerXYPos={updatePlayerXYPos}
          broadcastPlayerXYPos={broadcastPlayerXYPos}
        />
      </section>
    </section>
  );
}

export default CardGameView
