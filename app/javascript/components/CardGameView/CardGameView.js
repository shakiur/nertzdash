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
  const [player1SolitaireLeftoverPile, setPlayer1SolitaireLeftoverPile] = useState([]);
  const [player1SolitaireXPos, setPlayer1SolitaireXPos] = useState(0)
  const [player1SolitaireYPos, setPlayer1SolitaireYPos] = useState(0)
  const [player1BroadcastPlayerUuid, setPlayer1BroadcastPlayerUuid] = useState(playerUuid);

  const [player2SolitaireDeck, setPlayer2SolitaireDeck] = useState(generateCardDeck());
  const [player2SolitairePile, setPlayer2SolitairePile] = useState([]);
  const [player2SolitaireLeftoverPile, setPlayer2SolitaireLeftoverPile] = useState([]);
  const [player2SolitaireXPos, setPlayer2SolitaireXPos] = useState(0)
  const [player2SolitaireYPos, setPlayer2SolitaireYPos] = useState(0)
  const [player2BroadcastPlayerUuid, setPlayer2BroadcastPlayerUuid] = useState(playerUuid);

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

  function setBroadcastPlayerUuid(playerPos, playerUuid) {
    switch(playerPos) {
      case 1:
        setPlayer1BroadcastPlayerUuid(playerUuid)
        break;
      default:
        break;
    }
  }

  function updatePlayerSolitaire(playerPos, playerUuid, solitaireDeck, solitairePile, solitaireLeftoverPile) {
    switch(playerPos) {
      case 1:
        setPlayer1BroadcastPlayerUuid(playerUuid)
        setPlayer1SolitaireDeck(solitaireDeck)
        setPlayer1SolitairePile(solitairePile)
        setPlayer1SolitaireLeftoverPile(solitaireLeftoverPile)
        break
      default:
        break
    }
  }

  function updatePlayerSolitaireXYPos(playerPos, playerUuid, solitaireXPos, solitaireYPos) {
    switch(playerPos) {
      case 1:
        setPlayer1BroadcastPlayerUuid(playerUuid)
        setPlayer1SolitaireXPos(solitaireXPos)
        setPlayer1SolitaireYPos(solitaireYPos)
        break
      default:
        break
    }
  }


  function broadcastPlayerXYPos(playerPos, playerUuid, xPos, yPos) {
    const currentTime = new Date().getTime();
    setBroadcastTime(currentTime);

    fetch('/card_game/broadcast_player_position?' +
      'data_type=' + 'player_position' +
      '&player_pos=' + playerPos +
      '&player_uuid=' + playerUuid +
      '&x_pos=' + xPos +
      '&y_pos=' + yPos +
      '&time=' + broadcastTime
    );
  }

  function broadcastPlayerSolitaire(playerPos, playerUuid, solitaireDeck, solitairePile, solitaireLeftoverPile) {
    const currentTime = new Date().getTime();
    setBroadcastTime(currentTime);

    fetch('/card_game/broadcast_player_solitaire?' +
      'data_type=' + 'player_solitaire' +
      '&player_pos=' + playerPos +
      '&player_uuid=' + playerUuid +
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
    setBroadcastPlayerUuid(playerPos, playerUuid)

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

  function updatePlayerPositionFromBroadcast(data) {
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

  function updatePlayerSolitaireFromBroadcast(data) {
    const retrievedPlayerPos = parseInt(data["player_pos"])
    const retrievedPlayerUuid = data["player_uuid"]
    const retrievedSolitaireDeck = JSON.parse(data["solitaire_deck"])
    const retrievedSolitairePile = JSON.parse(data["solitaire_pile"])
    const retrievedLeftoverSolitairePile = JSON.parse(data["leftover_solitaire_pile"])
    const retrievedTime = parseInt(data["time"]);

    const retrievedFromDiffPlayer = retrievedPlayerUuid !== playerUuid
    const retrievedAfterLastUpdate = retrievedTime > retrievalTime

    if(retrievedFromDiffPlayer && retrievedAfterLastUpdate) {
      setRetrievalTime(retrievedTime)
      updatePlayerSolitaire(
        retrievedPlayerPos,
        retrievedPlayerUuid,
        retrievedSolitaireDeck,
        retrievedSolitairePile,
        retrievedLeftoverSolitairePile
      )
    }
  }

  function updatePlayerSolitaireXYPosFromBroadcast(data) {
    const retrievedPlayerPos = parseInt(data["player_pos"])
    const retrievedPlayerUuid = data["player_uuid"]
    const retrievedSolitaireXPos = parseInt(data["solitaire_x_pos"])
    const retrievedSolitaireYPos = parseInt(data["solitaire_y_pos"])
    const retrievedTime = parseInt(data["time"]);

    const retrievedFromDiffPlayer = retrievedPlayerUuid !== playerUuid
    const retrievedAfterLastUpdate = retrievedTime > retrievalTime

    if(retrievedFromDiffPlayer && retrievedAfterLastUpdate) {
      updatePlayerSolitaireXYPos(
        retrievedPlayerPos,
        retrievedPlayerUuid,
        retrievedSolitaireXPos,
        retrievedSolitaireYPos
      )
    }
  }

  useEffect(() => {
    cableApp.cable = actionCable.createConsumer()

    cableApp.cable.subscriptions.create({
      channel: 'CardGameChannel'
    }, {
      received: (data) => {
        console.log(data);
        const data_type = data["data_type"]

        switch(data_type) {
          case 'player_position':
            updatePlayerPositionFromBroadcast(data);
            break;
          case 'player_solitaire':
            updatePlayerSolitaireFromBroadcast(data);
            break;
          case 'player_solitaire_x_y_pos':
            updatePlayerSolitaireXYPosFromBroadcast(data)
            break;
          default:
            break;
        }
      }
    })

  }, [subscribed]);

  useEffect(() => {
    if(playerUuid == player1BroadcastPlayerUuid) {
      broadcastPlayerSolitaire(1, playerUuid, player1SolitaireDeck, player1SolitairePile, player1SolitaireLeftoverPile);
    }
  }, [player1SolitairePile])

  useEffect(() => {
    if(playerUuid == player1BroadcastPlayerUuid) {
      broadcastPlayerSolitaireXYPos(1, playerUuid, player1SolitaireXPos, player1SolitaireYPos)
    }
  }, [player1SolitaireXPos, player1SolitaireYPos])


  return (
    <section className="CardGameView">
      <section className="TopRow">
        <PlayerTableNew
          playerPos={1}
          playerUuid={playerUuid}
          broadcastTime={broadcastTime}
          solitaireDeck={player1SolitaireDeck}
          solitairePile={player1SolitairePile}
          solitaireLeftoverPile={player1SolitaireLeftoverPile}
          setSolitaireDeck={setPlayer1SolitaireDeck}
          setSolitairePile={setPlayer1SolitairePile}
          setSolitaireLeftoverPile={setPlayer1SolitaireLeftoverPile}
          solitaireXPos={player1SolitaireXPos}
          solitaireYPos={player1SolitaireYPos}
          setSolitaireXPos={setPlayer1SolitaireXPos}
          setSolitaireYPos={setPlayer1SolitaireYPos}
          setBroadcastPlayerUuid={setPlayer1BroadcastPlayerUuid}
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
