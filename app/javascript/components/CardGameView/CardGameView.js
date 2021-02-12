import React, { useState, useEffect } from "react";
import actionCable from "actioncable";

import PlayerTable from "./components/PlayerTable/PlayerTable"
import PlayerTableNew from "./components/PlayerTable/PlayerTableNew"
import CenterTable from "./components/CenterTable/CenterTable"

const cableApp = {}
const playerUuid = Math.random().toString(36).substring(7);

function CardGameView() {
  const [subscribed, setSubscribed] = useState(false);
  const [allPlayers, setAllPlayers] = useState([])

  const [retrievalTime, setRetrievalTime] = useState(new Date().getTime());
  const [broadcastTime, setBroadcastTime] = useState(new Date().getTime());

  const [player1Name, setPlayer1Name] = useState("")
  const [player1DbId, setPlayer1DbId] = useState(0)
  const [player1Active, setPlayer1Active] = useState(false)
  const [player1SolitaireDeck, setPlayer1SolitaireDeck] = useState([]);
  const [player1SolitairePile, setPlayer1SolitairePile] = useState([]);
  const [player1SolitaireLeftoverPile, setPlayer1SolitaireLeftoverPile] = useState([]);
  const [player1SolitaireXPos, setPlayer1SolitaireXPos] = useState(0)
  const [player1SolitaireYPos, setPlayer1SolitaireYPos] = useState(0)
  const [player1BroadcastPlayerUuid, setPlayer1BroadcastPlayerUuid] = useState(playerUuid);

  const [player2Name, setPlayer2Name] = useState("")
  const [player2DbId, setPlayer2DbId] = useState(0)
  const [player2Active, setPlayer2Active] = useState(false)
  const [player2SolitaireDeck, setPlayer2SolitaireDeck] = useState([]);
  const [player2SolitairePile, setPlayer2SolitairePile] = useState([]);
  const [player2SolitaireLeftoverPile, setPlayer2SolitaireLeftoverPile] = useState([]);
  const [player2SolitaireXPos, setPlayer2SolitaireXPos] = useState(0)
  const [player2SolitaireYPos, setPlayer2SolitaireYPos] = useState(0)
  const [player2BroadcastPlayerUuid, setPlayer2BroadcastPlayerUuid] = useState(playerUuid);

  const [player3Name, setPlayer3Name] = useState("")
  const [player3DbId, setPlayer3DbId] = useState(0)
  const [player3Active, setPlayer3Active] = useState(false)
  const [player3SolitaireDeck, setPlayer3SolitaireDeck] = useState([]);
  const [player3SolitairePile, setPlayer3SolitairePile] = useState([]);
  const [player3SolitaireLeftoverPile, setPlayer3SolitaireLeftoverPile] = useState([]);
  const [player3SolitaireXPos, setPlayer3SolitaireXPos] = useState(0)
  const [player3SolitaireYPos, setPlayer3SolitaireYPos] = useState(0)
  const [player3BroadcastPlayerUuid, setPlayer3BroadcastPlayerUuid] = useState(playerUuid);

  const [player4Name, setPlayer4Name] = useState("")
  const [player4DbId, setPlayer4DbId] = useState(0)
  const [player4Active, setPlayer4Active] = useState(false)
  const [player4SolitaireDeck, setPlayer4SolitaireDeck] = useState([]);
  const [player4SolitairePile, setPlayer4SolitairePile] = useState([]);
  const [player4SolitaireLeftoverPile, setPlayer4SolitaireLeftoverPile] = useState([]);
  const [player4SolitaireXPos, setPlayer4SolitaireXPos] = useState(0)
  const [player4SolitaireYPos, setPlayer4SolitaireYPos] = useState(0)
  const [player4BroadcastPlayerUuid, setPlayer4BroadcastPlayerUuid] = useState(playerUuid);

  const [player5Name, setPlayer5Name] = useState("")
  const [player5DbId, setPlayer5DbId] = useState(0)
  const [player5Active, setPlayer5Active] = useState(false)
  const [player5SolitaireDeck, setPlayer5SolitaireDeck] = useState([]);
  const [player5SolitairePile, setPlayer5SolitairePile] = useState([]);
  const [player5SolitaireLeftoverPile, setPlayer5SolitaireLeftoverPile] = useState([]);
  const [player5SolitaireXPos, setPlayer5SolitaireXPos] = useState(0)
  const [player5SolitaireYPos, setPlayer5SolitaireYPos] = useState(0)
  const [player5BroadcastPlayerUuid, setPlayer5BroadcastPlayerUuid] = useState(playerUuid);

  const [player6Name, setPlayer6Name] = useState("")
  const [player6DbId, setPlayer6DbId] = useState(0)
  const [player6Active, setPlayer6Active] = useState(false)
  const [player6SolitaireDeck, setPlayer6SolitaireDeck] = useState([]);
  const [player6SolitairePile, setPlayer6SolitairePile] = useState([]);
  const [player6SolitaireLeftoverPile, setPlayer6SolitaireLeftoverPile] = useState([]);
  const [player6SolitaireXPos, setPlayer6SolitaireXPos] = useState(0)
  const [player6SolitaireYPos, setPlayer6SolitaireYPos] = useState(0)
  const [player6BroadcastPlayerUuid, setPlayer6BroadcastPlayerUuid] = useState(playerUuid);

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

  useEffect(() => {
    cableApp.cable = actionCable.createConsumer()
    fetchAllPlayers()

    cableApp.cable.subscriptions.create({
      channel: 'CardGameChannel'
    }, {
      received: (data) => {
        console.log(data);
        const data_type = data["data_type"]

        switch(data_type) {
          case 'player_active_name':
            updatePlayerActiveNameFromBroadcast(data);
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
  }, []);

  function updatePlayerSolitaireFromBroadcast(data) {
    const retrievedPlayerPos = parseInt(data["player_pos"])
    const retrievedPlayerUuid = data["player_uuid"]
    const retrievedPlayerActive = data["player_active"] === "true"
    const retrievedPlayerName = data["player_name"]
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
        retrievedPlayerActive,
        retrievedPlayerName,
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

  function updatePlayerSolitaire(playerPos, playerUuid, playerActive, playerName, solitaireDeck, solitairePile, solitaireLeftoverPile) {
    switch(playerPos) {
      case 1:
        setPlayer1Active(playerActive)
        setPlayer1Name(playerName)
        setPlayer1BroadcastPlayerUuid(playerUuid)
        setPlayer1SolitaireDeck(solitaireDeck)
        setPlayer1SolitairePile(solitairePile)
        setPlayer1SolitaireLeftoverPile(solitaireLeftoverPile)
        break
      case 2:
        setPlayer2Active(playerActive)
        setPlayer2Name(playerName)
        setPlayer2BroadcastPlayerUuid(playerUuid)
        setPlayer2SolitaireDeck(solitaireDeck)
        setPlayer2SolitairePile(solitairePile)
        setPlayer2SolitaireLeftoverPile(solitaireLeftoverPile)
        break
      case 3:
        setPlayer3Active(playerActive)
        setPlayer3Name(playerName)
        setPlayer3BroadcastPlayerUuid(playerUuid)
        setPlayer3SolitaireDeck(solitaireDeck)
        setPlayer3SolitairePile(solitairePile)
        setPlayer3SolitaireLeftoverPile(solitaireLeftoverPile)
        break
      case 4:
        setPlayer4Active(playerActive)
        setPlayer4Name(playerName)
        setPlayer4BroadcastPlayerUuid(playerUuid)
        setPlayer4SolitaireDeck(solitaireDeck)
        setPlayer4SolitairePile(solitairePile)
        setPlayer4SolitaireLeftoverPile(solitaireLeftoverPile)
        break
      case 5:
        setPlayer5Active(playerActive)
        setPlayer5Name(playerName)
        setPlayer5BroadcastPlayerUuid(playerUuid)
        setPlayer5SolitaireDeck(solitaireDeck)
        setPlayer5SolitairePile(solitairePile)
        setPlayer5SolitaireLeftoverPile(solitaireLeftoverPile)
        break
      case 6:
        setPlayer6Active(playerActive)
        setPlayer6Name(playerName)
        setPlayer6BroadcastPlayerUuid(playerUuid)
        setPlayer6SolitaireDeck(solitaireDeck)
        setPlayer6SolitairePile(solitairePile)
        setPlayer6SolitaireLeftoverPile(solitaireLeftoverPile)
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
      case 2:
        setPlayer2BroadcastPlayerUuid(playerUuid)
        setPlayer2SolitaireXPos(solitaireXPos)
        setPlayer2SolitaireYPos(solitaireYPos)
        break
      case 3:
        setPlayer3BroadcastPlayerUuid(playerUuid)
        setPlayer3SolitaireXPos(solitaireXPos)
        setPlayer3SolitaireYPos(solitaireYPos)
        break
      case 4:
        setPlayer4BroadcastPlayerUuid(playerUuid)
        setPlayer4SolitaireXPos(solitaireXPos)
        setPlayer4SolitaireYPos(solitaireYPos)
        break
      case 5:
        setPlayer5BroadcastPlayerUuid(playerUuid)
        setPlayer5SolitaireXPos(solitaireXPos)
        setPlayer5SolitaireYPos(solitaireYPos)
        break
      case 6:
        setPlayer6BroadcastPlayerUuid(playerUuid)
        setPlayer6SolitaireXPos(solitaireXPos)
        setPlayer6SolitaireYPos(solitaireYPos)
        break
      default:
        break
    }
  }

  function fetchAllPlayers() {
    fetch('/card_game/all_players.json')
      .then((allPlayersHash) => { return allPlayersHash.json() })
      .then((allPlayersJson) => { setAllPlayers(allPlayersJson) });
  }

  return (
    <section className="CardGameView">
      <section className="TopRow">
        <PlayerTableNew
          playerPos={1}
          playerUuid={playerUuid}
          broadcastTime={broadcastTime}
          allPlayers={allPlayers}
          playerName={player1Name}
          playerDbId={player1DbId}
          playerActive={player1Active}
          setPlayerName={setPlayer1Name}
          setPlayerDbId={setPlayer1DbId}
          setPlayerActive={setPlayer1Active}
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
          broadcastPlayerUuid={player1BroadcastPlayerUuid}
          setBroadcastPlayerUuid={setPlayer1BroadcastPlayerUuid}
          setBroadcastTime={setBroadcastTime}
        />
        <PlayerTableNew
          playerPos={2}
          playerUuid={playerUuid}
          allPlayers={allPlayers}
          playerName={player2Name}
          playerDbId={player2DbId}
          playerActive={player2Active}
          setPlayerName={setPlayer2Name}
          setPlayerDbId={setPlayer2DbId}
          setPlayerActive={setPlayer2Active}
          broadcastTime={broadcastTime}
          solitaireDeck={player2SolitaireDeck}
          solitairePile={player2SolitairePile}
          solitaireLeftoverPile={player2SolitaireLeftoverPile}
          setSolitaireDeck={setPlayer2SolitaireDeck}
          setSolitairePile={setPlayer2SolitairePile}
          setSolitaireLeftoverPile={setPlayer2SolitaireLeftoverPile}
          solitaireXPos={player2SolitaireXPos}
          solitaireYPos={player2SolitaireYPos}
          setSolitaireXPos={setPlayer2SolitaireXPos}
          setSolitaireYPos={setPlayer2SolitaireYPos}
          broadcastPlayerUuid={player2BroadcastPlayerUuid}
          setBroadcastPlayerUuid={setPlayer2BroadcastPlayerUuid}
          setBroadcastTime={setBroadcastTime}
        />
      </section>

      <section className="MiddleRow">
        <PlayerTableNew
          playerPos={3}
          playerUuid={playerUuid}
          allPlayers={allPlayers}
          playerName={player3Name}
          playerDbId={player3DbId}
          playerActive={player3Active}
          setPlayerName={setPlayer3Name}
          setPlayerDbId={setPlayer3DbId}
          setPlayerActive={setPlayer3Active}
          broadcastTime={broadcastTime}
          solitaireDeck={player3SolitaireDeck}
          solitairePile={player3SolitairePile}
          solitaireLeftoverPile={player3SolitaireLeftoverPile}
          setSolitaireDeck={setPlayer3SolitaireDeck}
          setSolitairePile={setPlayer3SolitairePile}
          setSolitaireLeftoverPile={setPlayer3SolitaireLeftoverPile}
          solitaireXPos={player3SolitaireXPos}
          solitaireYPos={player3SolitaireYPos}
          setSolitaireXPos={setPlayer3SolitaireXPos}
          setSolitaireYPos={setPlayer3SolitaireYPos}
          broadcastPlayerUuid={player3BroadcastPlayerUuid}
          setBroadcastPlayerUuid={setPlayer3BroadcastPlayerUuid}
          setBroadcastTime={setBroadcastTime}
        />
        <CenterTable />
        <PlayerTableNew
          playerPos={4}
          playerUuid={playerUuid}
          allPlayers={allPlayers}
          playerName={player4Name}
          playerDbId={player4DbId}
          playerActive={player4Active}
          setPlayerName={setPlayer4Name}
          setPlayerDbId={setPlayer4DbId}
          setPlayerActive={setPlayer4Active}
          broadcastTime={broadcastTime}
          solitaireDeck={player4SolitaireDeck}
          solitairePile={player4SolitairePile}
          solitaireLeftoverPile={player4SolitaireLeftoverPile}
          setSolitaireDeck={setPlayer4SolitaireDeck}
          setSolitairePile={setPlayer4SolitairePile}
          setSolitaireLeftoverPile={setPlayer4SolitaireLeftoverPile}
          solitaireXPos={player4SolitaireXPos}
          solitaireYPos={player4SolitaireYPos}
          setSolitaireXPos={setPlayer4SolitaireXPos}
          setSolitaireYPos={setPlayer4SolitaireYPos}
          broadcastPlayerUuid={player4BroadcastPlayerUuid}
          setBroadcastPlayerUuid={setPlayer4BroadcastPlayerUuid}
          setBroadcastTime={setBroadcastTime}
        />
      </section>

      <section className="BottomRow">
        <PlayerTableNew
          playerPos={5}
          playerUuid={playerUuid}
          allPlayers={allPlayers}
          playerName={player5Name}
          playerDbId={player5DbId}
          playerActive={player5Active}
          setPlayerName={setPlayer5Name}
          setPlayerDbId={setPlayer5DbId}
          setPlayerActive={setPlayer5Active}
          broadcastTime={broadcastTime}
          solitaireDeck={player5SolitaireDeck}
          solitairePile={player5SolitairePile}
          solitaireLeftoverPile={player5SolitaireLeftoverPile}
          setSolitaireDeck={setPlayer5SolitaireDeck}
          setSolitairePile={setPlayer5SolitairePile}
          setSolitaireLeftoverPile={setPlayer5SolitaireLeftoverPile}
          solitaireXPos={player5SolitaireXPos}
          solitaireYPos={player5SolitaireYPos}
          setSolitaireXPos={setPlayer5SolitaireXPos}
          setSolitaireYPos={setPlayer5SolitaireYPos}
          broadcastPlayerUuid={player5BroadcastPlayerUuid}
          setBroadcastPlayerUuid={setPlayer5BroadcastPlayerUuid}
          setBroadcastTime={setBroadcastTime}
        />
        <PlayerTableNew
          playerPos={6}
          playerUuid={playerUuid}
          allPlayers={allPlayers}
          playerName={player6Name}
          playerDbId={player6DbId}
          playerActive={player6Active}
          setPlayerName={setPlayer6Name}
          setPlayerDbId={setPlayer6DbId}
          setPlayerActive={setPlayer6Active}
          broadcastTime={broadcastTime}
          solitaireDeck={player6SolitaireDeck}
          solitairePile={player6SolitairePile}
          solitaireLeftoverPile={player6SolitaireLeftoverPile}
          setSolitaireDeck={setPlayer6SolitaireDeck}
          setSolitairePile={setPlayer6SolitairePile}
          setSolitaireLeftoverPile={setPlayer6SolitaireLeftoverPile}
          solitaireXPos={player6SolitaireXPos}
          solitaireYPos={player6SolitaireYPos}
          setSolitaireXPos={setPlayer6SolitaireXPos}
          setSolitaireYPos={setPlayer6SolitaireYPos}
          broadcastPlayerUuid={player6BroadcastPlayerUuid}
          setBroadcastPlayerUuid={setPlayer6BroadcastPlayerUuid}
          setBroadcastTime={setBroadcastTime}
        />
      </section>
    </section>
  );
}

export default CardGameView
