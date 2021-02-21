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
  const [player1NertzPile, setPlayer1NertzPile] = useState([]);
  const [player1SolitaireDeck, setPlayer1SolitaireDeck] = useState([]);
  const [player1SolitairePile, setPlayer1SolitairePile] = useState([]);
  const [player1SolitaireLeftoverPile, setPlayer1SolitaireLeftoverPile] = useState([]);
  const [player1SolitaireWork1Pile, setPlayer1SolitaireWork1Pile] = useState([]);
  const [player1SolitaireWork2Pile, setPlayer1SolitaireWork2Pile] = useState([]);
  const [player1SolitaireWork3Pile, setPlayer1SolitaireWork3Pile] = useState([]);
  const [player1SolitaireWork4Pile, setPlayer1SolitaireWork4Pile] = useState([]);
  const [player1SolitaireXPos, setPlayer1SolitaireXPos] = useState(0)
  const [player1SolitaireYPos, setPlayer1SolitaireYPos] = useState(0)
  const [player1NertzPileXPos, setPlayer1NertzPileXPos] = useState(0)
  const [player1NertzPileYPos, setPlayer1NertzPileYPos] = useState(0)
  const [player1WorkPile1XPos, setPlayer1WorkPile1XPos] = useState(0)
  const [player1WorkPile1YPos, setPlayer1WorkPile1YPos] = useState(0)
  const [player1WorkPile2XPos, setPlayer1WorkPile2XPos] = useState(0)
  const [player1WorkPile2YPos, setPlayer1WorkPile2YPos] = useState(0)
  const [player1WorkPile3XPos, setPlayer1WorkPile3XPos] = useState(0)
  const [player1WorkPile3YPos, setPlayer1WorkPile3YPos] = useState(0)
  const [player1WorkPile4XPos, setPlayer1WorkPile4XPos] = useState(0)
  const [player1WorkPile4YPos, setPlayer1WorkPile4YPos] = useState(0)
  const [player1WorkPile1PreviewXPos, setPlayer1WorkPile1PreviewXPos] = useState(0)
  const [player1WorkPile1PreviewYPos, setPlayer1WorkPile1PreviewYPos] = useState(0)
  const [player1WorkPile2PreviewXPos, setPlayer1WorkPile2PreviewXPos] = useState(0)
  const [player1WorkPile2PreviewYPos, setPlayer1WorkPile2PreviewYPos] = useState(0)
  const [player1WorkPile3PreviewXPos, setPlayer1WorkPile3PreviewXPos] = useState(0)
  const [player1WorkPile3PreviewYPos, setPlayer1WorkPile3PreviewYPos] = useState(0)
  const [player1WorkPile4PreviewXPos, setPlayer1WorkPile4PreviewXPos] = useState(0)
  const [player1WorkPile4PreviewYPos, setPlayer1WorkPile4PreviewYPos] = useState(0)
  const [player1BroadcastPlayerUuid, setPlayer1BroadcastPlayerUuid] = useState(playerUuid);

  const [player2Name, setPlayer2Name] = useState("")
  const [player2DbId, setPlayer2DbId] = useState(0)
  const [player2Active, setPlayer2Active] = useState(false)
  const [player2NertzPile, setPlayer2NertzPile] = useState([]);
  const [player2SolitaireDeck, setPlayer2SolitaireDeck] = useState([]);
  const [player2SolitairePile, setPlayer2SolitairePile] = useState([]);
  const [player2SolitaireLeftoverPile, setPlayer2SolitaireLeftoverPile] = useState([]);
  const [player2SolitaireWork1Pile, setPlayer2SolitaireWork1Pile] = useState([]);
  const [player2SolitaireWork2Pile, setPlayer2SolitaireWork2Pile] = useState([]);
  const [player2SolitaireWork3Pile, setPlayer2SolitaireWork3Pile] = useState([]);
  const [player2SolitaireWork4Pile, setPlayer2SolitaireWork4Pile] = useState([]);
  const [player2SolitaireXPos, setPlayer2SolitaireXPos] = useState(0)
  const [player2SolitaireYPos, setPlayer2SolitaireYPos] = useState(0)
  const [player2NertzPileXPos, setPlayer2NertzPileXPos] = useState(0)
  const [player2NertzPileYPos, setPlayer2NertzPileYPos] = useState(0)
  const [player2WorkPile1XPos, setPlayer2WorkPile1XPos] = useState(0)
  const [player2WorkPile1YPos, setPlayer2WorkPile1YPos] = useState(0)
  const [player2WorkPile2XPos, setPlayer2WorkPile2XPos] = useState(0)
  const [player2WorkPile2YPos, setPlayer2WorkPile2YPos] = useState(0)
  const [player2WorkPile3XPos, setPlayer2WorkPile3XPos] = useState(0)
  const [player2WorkPile3YPos, setPlayer2WorkPile3YPos] = useState(0)
  const [player2WorkPile4XPos, setPlayer2WorkPile4XPos] = useState(0)
  const [player2WorkPile4YPos, setPlayer2WorkPile4YPos] = useState(0)
  const [player2WorkPile1PreviewXPos, setPlayer2WorkPile1PreviewXPos] = useState(0)
  const [player2WorkPile1PreviewYPos, setPlayer2WorkPile1PreviewYPos] = useState(0)
  const [player2WorkPile2PreviewXPos, setPlayer2WorkPile2PreviewXPos] = useState(0)
  const [player2WorkPile2PreviewYPos, setPlayer2WorkPile2PreviewYPos] = useState(0)
  const [player2WorkPile3PreviewXPos, setPlayer2WorkPile3PreviewXPos] = useState(0)
  const [player2WorkPile3PreviewYPos, setPlayer2WorkPile3PreviewYPos] = useState(0)
  const [player2WorkPile4PreviewXPos, setPlayer2WorkPile4PreviewXPos] = useState(0)
  const [player2WorkPile4PreviewYPos, setPlayer2WorkPile4PreviewYPos] = useState(0)
  const [player2BroadcastPlayerUuid, setPlayer2BroadcastPlayerUuid] = useState(playerUuid);

  const [player3Name, setPlayer3Name] = useState("")
  const [player3DbId, setPlayer3DbId] = useState(0)
  const [player3Active, setPlayer3Active] = useState(false)
  const [player3NertzPile, setPlayer3NertzPile] = useState([]);
  const [player3SolitaireDeck, setPlayer3SolitaireDeck] = useState([]);
  const [player3SolitairePile, setPlayer3SolitairePile] = useState([]);
  const [player3SolitaireLeftoverPile, setPlayer3SolitaireLeftoverPile] = useState([]);
  const [player3SolitaireWork1Pile, setPlayer3SolitaireWork1Pile] = useState([]);
  const [player3SolitaireWork2Pile, setPlayer3SolitaireWork2Pile] = useState([]);
  const [player3SolitaireWork3Pile, setPlayer3SolitaireWork3Pile] = useState([]);
  const [player3SolitaireWork4Pile, setPlayer3SolitaireWork4Pile] = useState([]);
  const [player3SolitaireXPos, setPlayer3SolitaireXPos] = useState(0)
  const [player3SolitaireYPos, setPlayer3SolitaireYPos] = useState(0)
  const [player3NertzPileXPos, setPlayer3NertzPileXPos] = useState(0)
  const [player3NertzPileYPos, setPlayer3NertzPileYPos] = useState(0)
  const [player3WorkPile1XPos, setPlayer3WorkPile1XPos] = useState(0)
  const [player3WorkPile1YPos, setPlayer3WorkPile1YPos] = useState(0)
  const [player3WorkPile2XPos, setPlayer3WorkPile2XPos] = useState(0)
  const [player3WorkPile2YPos, setPlayer3WorkPile2YPos] = useState(0)
  const [player3WorkPile3XPos, setPlayer3WorkPile3XPos] = useState(0)
  const [player3WorkPile3YPos, setPlayer3WorkPile3YPos] = useState(0)
  const [player3WorkPile4XPos, setPlayer3WorkPile4XPos] = useState(0)
  const [player3WorkPile4YPos, setPlayer3WorkPile4YPos] = useState(0)
  const [player3WorkPile1PreviewXPos, setPlayer3WorkPile1PreviewXPos] = useState(0)
  const [player3WorkPile1PreviewYPos, setPlayer3WorkPile1PreviewYPos] = useState(0)
  const [player3WorkPile2PreviewXPos, setPlayer3WorkPile2PreviewXPos] = useState(0)
  const [player3WorkPile2PreviewYPos, setPlayer3WorkPile2PreviewYPos] = useState(0)
  const [player3WorkPile3PreviewXPos, setPlayer3WorkPile3PreviewXPos] = useState(0)
  const [player3WorkPile3PreviewYPos, setPlayer3WorkPile3PreviewYPos] = useState(0)
  const [player3WorkPile4PreviewXPos, setPlayer3WorkPile4PreviewXPos] = useState(0)
  const [player3WorkPile4PreviewYPos, setPlayer3WorkPile4PreviewYPos] = useState(0)
  const [player3BroadcastPlayerUuid, setPlayer3BroadcastPlayerUuid] = useState(playerUuid);

  const [player4Name, setPlayer4Name] = useState("")
  const [player4DbId, setPlayer4DbId] = useState(0)
  const [player4Active, setPlayer4Active] = useState(false)
  const [player4NertzPile, setPlayer4NertzPile] = useState([]);
  const [player4SolitaireDeck, setPlayer4SolitaireDeck] = useState([]);
  const [player4SolitairePile, setPlayer4SolitairePile] = useState([]);
  const [player4SolitaireLeftoverPile, setPlayer4SolitaireLeftoverPile] = useState([]);
  const [player4SolitaireWork1Pile, setPlayer4SolitaireWork1Pile] = useState([]);
  const [player4SolitaireWork2Pile, setPlayer4SolitaireWork2Pile] = useState([]);
  const [player4SolitaireWork3Pile, setPlayer4SolitaireWork3Pile] = useState([]);
  const [player4SolitaireWork4Pile, setPlayer4SolitaireWork4Pile] = useState([]);
  const [player4SolitaireXPos, setPlayer4SolitaireXPos] = useState(0)
  const [player4SolitaireYPos, setPlayer4SolitaireYPos] = useState(0)
  const [player4NertzPileXPos, setPlayer4NertzPileXPos] = useState(0)
  const [player4NertzPileYPos, setPlayer4NertzPileYPos] = useState(0)
  const [player4WorkPile1XPos, setPlayer4WorkPile1XPos] = useState(0)
  const [player4WorkPile1YPos, setPlayer4WorkPile1YPos] = useState(0)
  const [player4WorkPile2XPos, setPlayer4WorkPile2XPos] = useState(0)
  const [player4WorkPile2YPos, setPlayer4WorkPile2YPos] = useState(0)
  const [player4WorkPile3XPos, setPlayer4WorkPile3XPos] = useState(0)
  const [player4WorkPile3YPos, setPlayer4WorkPile3YPos] = useState(0)
  const [player4WorkPile4XPos, setPlayer4WorkPile4XPos] = useState(0)
  const [player4WorkPile4YPos, setPlayer4WorkPile4YPos] = useState(0)
  const [player4WorkPile1PreviewXPos, setPlayer4WorkPile1PreviewXPos] = useState(0)
  const [player4WorkPile1PreviewYPos, setPlayer4WorkPile1PreviewYPos] = useState(0)
  const [player4WorkPile2PreviewXPos, setPlayer4WorkPile2PreviewXPos] = useState(0)
  const [player4WorkPile2PreviewYPos, setPlayer4WorkPile2PreviewYPos] = useState(0)
  const [player4WorkPile3PreviewXPos, setPlayer4WorkPile3PreviewXPos] = useState(0)
  const [player4WorkPile3PreviewYPos, setPlayer4WorkPile3PreviewYPos] = useState(0)
  const [player4WorkPile4PreviewXPos, setPlayer4WorkPile4PreviewXPos] = useState(0)
  const [player4WorkPile4PreviewYPos, setPlayer4WorkPile4PreviewYPos] = useState(0)
  const [player4BroadcastPlayerUuid, setPlayer4BroadcastPlayerUuid] = useState(playerUuid);

  const [player5Name, setPlayer5Name] = useState("")
  const [player5DbId, setPlayer5DbId] = useState(0)
  const [player5Active, setPlayer5Active] = useState(false)
  const [player5NertzPile, setPlayer5NertzPile] = useState([]);
  const [player5SolitaireDeck, setPlayer5SolitaireDeck] = useState([]);
  const [player5SolitairePile, setPlayer5SolitairePile] = useState([]);
  const [player5SolitaireLeftoverPile, setPlayer5SolitaireLeftoverPile] = useState([]);
  const [player5SolitaireWork1Pile, setPlayer5SolitaireWork1Pile] = useState([]);
  const [player5SolitaireWork2Pile, setPlayer5SolitaireWork2Pile] = useState([]);
  const [player5SolitaireWork3Pile, setPlayer5SolitaireWork3Pile] = useState([]);
  const [player5SolitaireWork4Pile, setPlayer5SolitaireWork4Pile] = useState([]);
  const [player5SolitaireXPos, setPlayer5SolitaireXPos] = useState(0)
  const [player5SolitaireYPos, setPlayer5SolitaireYPos] = useState(0)
  const [player5NertzPileXPos, setPlayer5NertzPileXPos] = useState(0)
  const [player5NertzPileYPos, setPlayer5NertzPileYPos] = useState(0)
  const [player5WorkPile1XPos, setPlayer5WorkPile1XPos] = useState(0)
  const [player5WorkPile1YPos, setPlayer5WorkPile1YPos] = useState(0)
  const [player5WorkPile2XPos, setPlayer5WorkPile2XPos] = useState(0)
  const [player5WorkPile2YPos, setPlayer5WorkPile2YPos] = useState(0)
  const [player5WorkPile3XPos, setPlayer5WorkPile3XPos] = useState(0)
  const [player5WorkPile3YPos, setPlayer5WorkPile3YPos] = useState(0)
  const [player5WorkPile4XPos, setPlayer5WorkPile4XPos] = useState(0)
  const [player5WorkPile4YPos, setPlayer5WorkPile4YPos] = useState(0)
  const [player5WorkPile1PreviewXPos, setPlayer5WorkPile1PreviewXPos] = useState(0)
  const [player5WorkPile1PreviewYPos, setPlayer5WorkPile1PreviewYPos] = useState(0)
  const [player5WorkPile2PreviewXPos, setPlayer5WorkPile2PreviewXPos] = useState(0)
  const [player5WorkPile2PreviewYPos, setPlayer5WorkPile2PreviewYPos] = useState(0)
  const [player5WorkPile3PreviewXPos, setPlayer5WorkPile3PreviewXPos] = useState(0)
  const [player5WorkPile3PreviewYPos, setPlayer5WorkPile3PreviewYPos] = useState(0)
  const [player5WorkPile4PreviewXPos, setPlayer5WorkPile4PreviewXPos] = useState(0)
  const [player5WorkPile4PreviewYPos, setPlayer5WorkPile4PreviewYPos] = useState(0)
  const [player5BroadcastPlayerUuid, setPlayer5BroadcastPlayerUuid] = useState(playerUuid);

  const [player6Name, setPlayer6Name] = useState("")
  const [player6DbId, setPlayer6DbId] = useState(0)
  const [player6Active, setPlayer6Active] = useState(false)
  const [player6NertzPile, setPlayer6NertzPile] = useState([]);
  const [player6SolitaireDeck, setPlayer6SolitaireDeck] = useState([]);
  const [player6SolitairePile, setPlayer6SolitairePile] = useState([]);
  const [player6SolitaireLeftoverPile, setPlayer6SolitaireLeftoverPile] = useState([]);
  const [player6SolitaireWork1Pile, setPlayer6SolitaireWork1Pile] = useState([]);
  const [player6SolitaireWork2Pile, setPlayer6SolitaireWork2Pile] = useState([]);
  const [player6SolitaireWork3Pile, setPlayer6SolitaireWork3Pile] = useState([]);
  const [player6SolitaireWork4Pile, setPlayer6SolitaireWork4Pile] = useState([]);
  const [player6SolitaireXPos, setPlayer6SolitaireXPos] = useState(0)
  const [player6SolitaireYPos, setPlayer6SolitaireYPos] = useState(0)
  const [player6NertzPileXPos, setPlayer6NertzPileXPos] = useState(0)
  const [player6NertzPileYPos, setPlayer6NertzPileYPos] = useState(0)
  const [player6WorkPile1XPos, setPlayer6WorkPile1XPos] = useState(0)
  const [player6WorkPile1YPos, setPlayer6WorkPile1YPos] = useState(0)
  const [player6WorkPile2XPos, setPlayer6WorkPile2XPos] = useState(0)
  const [player6WorkPile2YPos, setPlayer6WorkPile2YPos] = useState(0)
  const [player6WorkPile3XPos, setPlayer6WorkPile3XPos] = useState(0)
  const [player6WorkPile3YPos, setPlayer6WorkPile3YPos] = useState(0)
  const [player6WorkPile4XPos, setPlayer6WorkPile4XPos] = useState(0)
  const [player6WorkPile4YPos, setPlayer6WorkPile4YPos] = useState(0)
  const [player6WorkPile1PreviewXPos, setPlayer6WorkPile1PreviewXPos] = useState(0)
  const [player6WorkPile1PreviewYPos, setPlayer6WorkPile1PreviewYPos] = useState(0)
  const [player6WorkPile2PreviewXPos, setPlayer6WorkPile2PreviewXPos] = useState(0)
  const [player6WorkPile2PreviewYPos, setPlayer6WorkPile2PreviewYPos] = useState(0)
  const [player6WorkPile3PreviewXPos, setPlayer6WorkPile3PreviewXPos] = useState(0)
  const [player6WorkPile3PreviewYPos, setPlayer6WorkPile3PreviewYPos] = useState(0)
  const [player6WorkPile4PreviewXPos, setPlayer6WorkPile4PreviewXPos] = useState(0)
  const [player6WorkPile4PreviewYPos, setPlayer6WorkPile4PreviewYPos] = useState(0)
  const [player6BroadcastPlayerUuid, setPlayer6BroadcastPlayerUuid] = useState(playerUuid);

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
          case 'player_solitaire_work_piles':
            updatePlayerSolitaireWorkPilesFromBroadcast(data);
            break;
          case 'player_solitaire_x_y_pos':
            updatePlayerSolitaireXYPosFromBroadcast(data)
            break;
          case 'player_nertz_pile_x_y_pos':
            updatePlayerNertzPileXYPosFromBroadcast(data)
            break;
          case 'player_work_pile_x_y_pos':
            updatePlayerWorkPileXYPosFromBroadcast(data)
            break;
          case 'player_nertz_pile':
            updatePlayerNertzPileFromBroadcast(data)
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

    if(retrievedFromDiffPlayer) {
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

  function updatePlayerSolitaireWorkPilesFromBroadcast(data) {
    const retrievedPlayerPos = parseInt(data["player_pos"])
    const retrievedPlayerUuid = data["player_uuid"]
    const retrievedSolitaireWork1Pile = JSON.parse(data["solitaire_work_1_pile"])
    const retrievedSolitaireWork2Pile = JSON.parse(data["solitaire_work_2_pile"])
    const retrievedSolitaireWork3Pile = JSON.parse(data["solitaire_work_3_pile"])
    const retrievedSolitaireWork4Pile = JSON.parse(data["solitaire_work_4_pile"])
    const retrievedTime = parseInt(data["time"]);

    const retrievedFromDiffPlayer = retrievedPlayerUuid !== playerUuid
    const retrievedAfterLastUpdate = retrievedTime > retrievalTime

    if(retrievedFromDiffPlayer) {
      setRetrievalTime(retrievedTime)
      updatePlayerSolitaireWorkPiles(
        retrievedPlayerPos,
        retrievedPlayerUuid,
        retrievedSolitaireWork1Pile,
        retrievedSolitaireWork2Pile,
        retrievedSolitaireWork3Pile,
        retrievedSolitaireWork4Pile
      )
    }
  }

  function updatePlayerNertzPileFromBroadcast(data) {
    const retrievedPlayerPos = parseInt(data["player_pos"])
    const retrievedPlayerUuid = data["player_uuid"]
    const retrievedNertzPile = JSON.parse(data["nertz_pile"])
    const retrievedTime = parseInt(data["time"]);

    const retrievedFromDiffPlayer = retrievedPlayerUuid !== playerUuid
    const retrievedAfterLastUpdate = retrievedTime > retrievalTime

    if(retrievedFromDiffPlayer) {
      setRetrievalTime(retrievedTime)
      updatePlayerNertzPile(
        retrievedPlayerPos,
        retrievedPlayerUuid,
        retrievedNertzPile
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
      setRetrievalTime(retrievedTime)
      updatePlayerSolitaireXYPos(
        retrievedPlayerPos,
        retrievedPlayerUuid,
        retrievedSolitaireXPos,
        retrievedSolitaireYPos
      )
    }
  }

  function updatePlayerNertzPileXYPosFromBroadcast(data) {
    const retrievedPlayerPos = parseInt(data["player_pos"])
    const retrievedPlayerUuid = data["player_uuid"]
    const retrievedNertzPileXPos = parseInt(data["nertz_pile_x_pos"])
    const retrievedNertzPileYPos = parseInt(data["nertz_pile_y_pos"])
    const retrievedTime = parseInt(data["time"]);

    const retrievedFromDiffPlayer = retrievedPlayerUuid !== playerUuid
    const retrievedAfterLastUpdate = retrievedTime > retrievalTime

    if(retrievedFromDiffPlayer && retrievedAfterLastUpdate) {
      setRetrievalTime(retrievedTime)
      updatePlayerNertzPileXYPos(
        retrievedPlayerPos,
        retrievedPlayerUuid,
        retrievedNertzPileXPos,
        retrievedNertzPileYPos
      )
    }
  }

  function updatePlayerWorkPileXYPosFromBroadcast(data) {
    const retrievedPlayerPos = parseInt(data["player_pos"])
    const retrievedPlayerUuid = data["player_uuid"]
    const retrievedWorkPilePos = parseInt(data["work_pile_pos"])
    const retrievedWorkPileXPos = parseInt(data["work_pile_x_pos"])
    const retrievedWorkPileYPos = parseInt(data["work_pile_y_pos"])
    const retrievedTime = parseInt(data["time"]);

    const retrievedFromDiffPlayer = retrievedPlayerUuid !== playerUuid
    const retrievedAfterLastUpdate = retrievedTime > retrievalTime

    if(retrievedFromDiffPlayer && retrievedAfterLastUpdate) {
      setRetrievalTime(retrievedTime)
      updatePlayerWorkPileXYPos(
        retrievedPlayerPos,
        retrievedPlayerUuid,
        retrievedWorkPilePos,
        retrievedWorkPileXPos,
        retrievedWorkPileYPos
      )
    }
  }

  function updatePlayerSolitaire(
    playerPos,
    playerUuid,
    playerActive,
    playerName,
    solitaireDeck,
    solitairePile,
    solitaireLeftoverPile
  ) {
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
        setPlayer6SolitaireWork1Pile(solitaireWork1Pile)
        setPlayer6SolitaireWork2Pile(solitaireWork2Pile)
        setPlayer6SolitaireWork3Pile(solitaireWork3Pile)
        setPlayer6SolitaireWork4Pile(solitaireWork4Pile)
        break
      default:
        break
    }
  }

  function updatePlayerSolitaireWorkPiles(
    playerPos,
    playerUuid,
    solitaireWork1Pile,
    solitaireWork2Pile,
    solitaireWork3Pile,
    solitaireWork4Pile
  ) {
    switch(playerPos) {
      case 1:
        setPlayer1BroadcastPlayerUuid(playerUuid)
        setPlayer1SolitaireWork1Pile(solitaireWork1Pile)
        setPlayer1SolitaireWork2Pile(solitaireWork2Pile)
        setPlayer1SolitaireWork3Pile(solitaireWork3Pile)
        setPlayer1SolitaireWork4Pile(solitaireWork4Pile)
        break
      case 2:
        setPlayer2BroadcastPlayerUuid(playerUuid)
        setPlayer2SolitaireWork1Pile(solitaireWork1Pile)
        setPlayer2SolitaireWork2Pile(solitaireWork2Pile)
        setPlayer2SolitaireWork3Pile(solitaireWork3Pile)
        setPlayer2SolitaireWork4Pile(solitaireWork4Pile)
        break
      case 3:
        setPlayer3BroadcastPlayerUuid(playerUuid)
        setPlayer3SolitaireWork1Pile(solitaireWork1Pile)
        setPlayer3SolitaireWork2Pile(solitaireWork2Pile)
        setPlayer3SolitaireWork3Pile(solitaireWork3Pile)
        setPlayer3SolitaireWork4Pile(solitaireWork4Pile)
        break
      case 4:
        setPlayer4BroadcastPlayerUuid(playerUuid)
        setPlayer4SolitaireWork1Pile(solitaireWork1Pile)
        setPlayer4SolitaireWork2Pile(solitaireWork2Pile)
        setPlayer4SolitaireWork3Pile(solitaireWork3Pile)
        setPlayer4SolitaireWork4Pile(solitaireWork4Pile)
        break
      case 5:
        setPlayer5BroadcastPlayerUuid(playerUuid)
        setPlayer5SolitaireWork1Pile(solitaireWork1Pile)
        setPlayer5SolitaireWork2Pile(solitaireWork2Pile)
        setPlayer5SolitaireWork3Pile(solitaireWork3Pile)
        setPlayer5SolitaireWork4Pile(solitaireWork4Pile)
        break
      case 6:
        setPlayer6BroadcastPlayerUuid(playerUuid)
        setPlayer6SolitaireWork1Pile(solitaireWork1Pile)
        setPlayer6SolitaireWork2Pile(solitaireWork2Pile)
        setPlayer6SolitaireWork3Pile(solitaireWork3Pile)
        setPlayer6SolitaireWork4Pile(solitaireWork4Pile)
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

  function updatePlayerNertzPileXYPos(playerPos, playerUuid, nertzPileXPos, nertzPileYPos) {
    switch(playerPos) {
      case 1:
        setPlayer1BroadcastPlayerUuid(playerUuid)
        setPlayer1NertzPileXPos(nertzPileXPos)
        setPlayer1NertzPileYPos(nertzPileYPos)
        break
      case 2:
        setPlayer2BroadcastPlayerUuid(playerUuid)
        setPlayer2NertzPileXPos(nertzPileXPos)
        setPlayer2NertzPileYPos(nertzPileYPos)
        break
      case 3:
        setPlayer3BroadcastPlayerUuid(playerUuid)
        setPlayer3NertzPileXPos(nertzPileXPos)
        setPlayer3NertzPileYPos(nertzPileYPos)
        break
      case 4:
        setPlayer4BroadcastPlayerUuid(playerUuid)
        setPlayer4NertzPileXPos(nertzPileXPos)
        setPlayer4NertzPileYPos(nertzPileYPos)
        break
      case 5:
        setPlayer5BroadcastPlayerUuid(playerUuid)
        setPlayer5NertzPileXPos(nertzPileXPos)
        setPlayer5NertzPileYPos(nertzPileYPos)
        break
      case 6:
        setPlayer6BroadcastPlayerUuid(playerUuid)
        setPlayer6NertzPileXPos(nertzPileXPos)
        setPlayer6NertzPileYPos(nertzPileYPos)
        break
      default:
        break
    }
  }

  function updatePlayerWorkPileXYPos(playerPos, playerUuid, workPilePos, workPileXPos, workPileYPos) {
    switch(playerPos) {
      case 1:
        setPlayer1BroadcastPlayerUuid(playerUuid)
        updatePlayer1WorkPileXYPos(workPilePos, workPileXPos, workPileYPos)
        break
      case 2:
        setPlayer2BroadcastPlayerUuid(playerUuid)
        updatePlayer2WorkPileXYPos(workPilePos, workPileXPos, workPileYPos)
        break
      case 3:
        setPlayer3BroadcastPlayerUuid(playerUuid)
        updatePlayer3WorkPileXYPos(workPilePos, workPileXPos, workPileYPos)
        break
      case 4:
        setPlayer4BroadcastPlayerUuid(playerUuid)
        updatePlayer4WorkPileXYPos(workPilePos, workPileXPos, workPileYPos)
        break
      case 5:
        setPlayer5BroadcastPlayerUuid(playerUuid)
        updatePlayer5WorkPileXYPos(workPilePos, workPileXPos, workPileYPos)
        break
      case 6:
        setPlayer6BroadcastPlayerUuid(playerUuid)
        updatePlayer6WorkPileXYPos(workPilePos, workPileXPos, workPileYPos)
        break
      default:
        break
    }
  }

  function updatePlayer1WorkPileXYPos(workPilePos, workPileXPos, workPileYPos) {
    switch(workPilePos) {
      case 1:
        setPlayer1WorkPile1XPos(workPileXPos)
        setPlayer1WorkPile1YPos(workPileYPos)
        break;
      case 2:
        setPlayer1WorkPile2XPos(workPileXPos)
        setPlayer1WorkPile2YPos(workPileYPos)
        break;
      case 3:
        setPlayer1WorkPile3XPos(workPileXPos)
        setPlayer1WorkPile3YPos(workPileYPos)
        break;
      case 4:
        setPlayer1WorkPile4XPos(workPileXPos)
        setPlayer1WorkPile4YPos(workPileYPos)
        break;
      default:
        break;
    }
  }

  function updatePlayer2WorkPileXYPos(workPilePos, workPileXPos, workPileYPos) {
    switch(workPilePos) {
      case 1:
        setPlayer2WorkPile1XPos(workPileXPos)
        setPlayer2WorkPile1YPos(workPileYPos)
        break;
      case 2:
        setPlayer2WorkPile2XPos(workPileXPos)
        setPlayer2WorkPile2YPos(workPileYPos)
        break;
      case 3:
        setPlayer2WorkPile3XPos(workPileXPos)
        setPlayer2WorkPile3YPos(workPileYPos)
        break;
      case 4:
        setPlayer2WorkPile4XPos(workPileXPos)
        setPlayer2WorkPile4YPos(workPileYPos)
        break;
      default:
        break;
    }
  }
  function updatePlayer3WorkPileXYPos(workPilePos, workPileXPos, workPileYPos) {
    switch(workPilePos) {
      case 1:
        setPlayer3WorkPile1XPos(workPileXPos)
        setPlayer3WorkPile1YPos(workPileYPos)
        break;
      case 2:
        setPlayer3WorkPile2XPos(workPileXPos)
        setPlayer3WorkPile2YPos(workPileYPos)
        break;
      case 3:
        setPlayer3WorkPile3XPos(workPileXPos)
        setPlayer3WorkPile3YPos(workPileYPos)
        break;
      case 4:
        setPlayer3WorkPile4XPos(workPileXPos)
        setPlayer3WorkPile4YPos(workPileYPos)
        break;
      default:
        break;
    }
  }
  function updatePlayer4WorkPileXYPos(workPilePos, workPileXPos, workPileYPos) {
    switch(workPilePos) {
      case 1:
        setPlayer4WorkPile1XPos(workPileXPos)
        setPlayer4WorkPile1YPos(workPileYPos)
        break;
      case 2:
        setPlayer4WorkPile2XPos(workPileXPos)
        setPlayer4WorkPile2YPos(workPileYPos)
        break;
      case 3:
        setPlayer4WorkPile3XPos(workPileXPos)
        setPlayer4WorkPile3YPos(workPileYPos)
        break;
      case 4:
        setPlayer4WorkPile4XPos(workPileXPos)
        setPlayer4WorkPile4YPos(workPileYPos)
        break;
      default:
        break;
    }
  }
  function updatePlayer5WorkPileXYPos(workPilePos, workPileXPos, workPileYPos) {
    switch(workPilePos) {
      case 1:
        setPlayer5WorkPile1XPos(workPileXPos)
        setPlayer5WorkPile1YPos(workPileYPos)
        break;
      case 2:
        setPlayer5WorkPile2XPos(workPileXPos)
        setPlayer5WorkPile2YPos(workPileYPos)
        break;
      case 3:
        setPlayer5WorkPile3XPos(workPileXPos)
        setPlayer5WorkPile3YPos(workPileYPos)
        break;
      case 4:
        setPlayer5WorkPile4XPos(workPileXPos)
        setPlayer5WorkPile4YPos(workPileYPos)
        break;
      default:
        break;
    }
  }
  function updatePlayer6WorkPileXYPos(workPilePos, workPileXPos, workPileYPos) {
    switch(workPilePos) {
      case 1:
        setPlayer6WorkPile1XPos(workPileXPos)
        setPlayer6WorkPile1YPos(workPileYPos)
        break;
      case 2:
        setPlayer6WorkPile2XPos(workPileXPos)
        setPlayer6WorkPile2YPos(workPileYPos)
        break;
      case 3:
        setPlayer6WorkPile3XPos(workPileXPos)
        setPlayer6WorkPile3YPos(workPileYPos)
        break;
      case 4:
        setPlayer6WorkPile4XPos(workPileXPos)
        setPlayer6WorkPile4YPos(workPileYPos)
        break;
      default:
        break;
    }
  }

  function updatePlayerNertzPile(playerPos, playerUuid, nertzPile) {
    switch(playerPos) {
      case 1:
        setPlayer1BroadcastPlayerUuid(playerUuid)
        setPlayer1NertzPile(nertzPile)
        break
      case 2:
        setPlayer2BroadcastPlayerUuid(playerUuid)
        setPlayer2NertzPile(nertzPile)
        break
      case 3:
        setPlayer3BroadcastPlayerUuid(playerUuid)
        setPlayer3NertzPile(nertzPile)
        break
      case 4:
        setPlayer4BroadcastPlayerUuid(playerUuid)
        setPlayer4NertzPile(nertzPile)
        break
      case 5:
        setPlayer5BroadcastPlayerUuid(playerUuid)
        setPlayer5NertzPile(nertzPile)
        break
      case 6:
        setPlayer6BroadcastPlayerUuid(playerUuid)
        setPlayer6NertzPile(nertzPile)
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
          nertzPile={player1NertzPile}
          setNertzPile={setPlayer1NertzPile}
          solitaireDeck={player1SolitaireDeck}
          solitairePile={player1SolitairePile}
          solitaireLeftoverPile={player1SolitaireLeftoverPile}
          setSolitaireDeck={setPlayer1SolitaireDeck}
          setSolitairePile={setPlayer1SolitairePile}
          setSolitaireLeftoverPile={setPlayer1SolitaireLeftoverPile}
          solitaireWork1Pile={player1SolitaireWork1Pile}
          solitaireWork2Pile={player1SolitaireWork2Pile}
          solitaireWork3Pile={player1SolitaireWork3Pile}
          solitaireWork4Pile={player1SolitaireWork4Pile}
          setSolitaireWork1Pile={setPlayer1SolitaireWork1Pile}
          setSolitaireWork2Pile={setPlayer1SolitaireWork2Pile}
          setSolitaireWork3Pile={setPlayer1SolitaireWork3Pile}
          setSolitaireWork4Pile={setPlayer1SolitaireWork4Pile}
          solitaireXPos={player1SolitaireXPos}
          solitaireYPos={player1SolitaireYPos}
          setSolitaireXPos={setPlayer1SolitaireXPos}
          setSolitaireYPos={setPlayer1SolitaireYPos}
          nertzPileXPos={player1NertzPileXPos}
          nertzPileYPos={player1NertzPileYPos}
          setNertzPileXPos={setPlayer1NertzPileXPos}
          setNertzPileYPos={setPlayer1NertzPileYPos}
          workPile1XPos={player1WorkPile1XPos}
          workPile1YPos={player1WorkPile1YPos}
          workPile2XPos={player1WorkPile2XPos}
          workPile2YPos={player1WorkPile2YPos}
          workPile3XPos={player1WorkPile3XPos}
          workPile3YPos={player1WorkPile3YPos}
          workPile4XPos={player1WorkPile4XPos}
          workPile4YPos={player1WorkPile4YPos}
          setWorkPile1XPos={setPlayer1WorkPile1XPos}
          setWorkPile1YPos={setPlayer1WorkPile1YPos}
          setWorkPile2XPos={setPlayer1WorkPile2XPos}
          setWorkPile2YPos={setPlayer1WorkPile2YPos}
          setWorkPile3XPos={setPlayer1WorkPile3XPos}
          setWorkPile3YPos={setPlayer1WorkPile3YPos}
          setWorkPile4XPos={setPlayer1WorkPile4XPos}
          setWorkPile4YPos={setPlayer1WorkPile4YPos}
          workPile1PreviewXPos={player1WorkPile1PreviewXPos}
          workPile1PreviewYPos={player1WorkPile1PreviewYPos}
          workPile2PreviewXPos={player1WorkPile2PreviewXPos}
          workPile2PreviewYPos={player1WorkPile2PreviewYPos}
          workPile3PreviewXPos={player1WorkPile3PreviewXPos}
          workPile3PreviewYPos={player1WorkPile3PreviewYPos}
          workPile4PreviewXPos={player1WorkPile4PreviewXPos}
          workPile4PreviewYPos={player1WorkPile4PreviewYPos}
          setWorkPile1PreviewXPos={setPlayer1WorkPile1PreviewXPos}
          setWorkPile1PreviewYPos={setPlayer1WorkPile1PreviewYPos}
          setWorkPile2PreviewXPos={setPlayer1WorkPile2PreviewXPos}
          setWorkPile2PreviewYPos={setPlayer1WorkPile2PreviewYPos}
          setWorkPile3PreviewXPos={setPlayer1WorkPile3PreviewXPos}
          setWorkPile3PreviewYPos={setPlayer1WorkPile3PreviewYPos}
          setWorkPile4PreviewXPos={setPlayer1WorkPile4PreviewXPos}
          setWorkPile4PreviewYPos={setPlayer1WorkPile4PreviewYPos}
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
          nertzPile={player2NertzPile}
          setNertzPile={setPlayer2NertzPile}
          solitaireDeck={player2SolitaireDeck}
          solitairePile={player2SolitairePile}
          solitaireLeftoverPile={player2SolitaireLeftoverPile}
          setSolitaireDeck={setPlayer2SolitaireDeck}
          setSolitairePile={setPlayer2SolitairePile}
          setSolitaireLeftoverPile={setPlayer2SolitaireLeftoverPile}
          solitaireWork1Pile={player2SolitaireWork1Pile}
          solitaireWork2Pile={player2SolitaireWork2Pile}
          solitaireWork3Pile={player2SolitaireWork3Pile}
          solitaireWork4Pile={player2SolitaireWork4Pile}
          setSolitaireWork1Pile={setPlayer2SolitaireWork1Pile}
          setSolitaireWork2Pile={setPlayer2SolitaireWork2Pile}
          setSolitaireWork3Pile={setPlayer2SolitaireWork3Pile}
          setSolitaireWork4Pile={setPlayer2SolitaireWork4Pile}
          solitaireXPos={player2SolitaireXPos}
          solitaireYPos={player2SolitaireYPos}
          setSolitaireXPos={setPlayer2SolitaireXPos}
          setSolitaireYPos={setPlayer2SolitaireYPos}
          nertzPileXPos={player2NertzPileXPos}
          nertzPileYPos={player2NertzPileYPos}
          setNertzPileXPos={setPlayer2NertzPileXPos}
          setNertzPileYPos={setPlayer2NertzPileYPos}
          workPile1XPos={player2WorkPile1XPos}
          workPile1YPos={player2WorkPile1YPos}
          workPile2XPos={player2WorkPile2XPos}
          workPile2YPos={player2WorkPile2YPos}
          workPile3XPos={player2WorkPile3XPos}
          workPile3YPos={player2WorkPile3YPos}
          workPile4XPos={player2WorkPile4XPos}
          workPile4YPos={player2WorkPile4YPos}
          setWorkPile1XPos={setPlayer2WorkPile1XPos}
          setWorkPile1YPos={setPlayer2WorkPile1YPos}
          setWorkPile2XPos={setPlayer2WorkPile2XPos}
          setWorkPile2YPos={setPlayer2WorkPile2YPos}
          setWorkPile3XPos={setPlayer2WorkPile3XPos}
          setWorkPile3YPos={setPlayer2WorkPile3YPos}
          setWorkPile4XPos={setPlayer2WorkPile4XPos}
          setWorkPile4YPos={setPlayer2WorkPile4YPos}
          workPile1PreviewXPos={player2WorkPile1PreviewXPos}
          workPile1PreviewYPos={player2WorkPile1PreviewYPos}
          workPile2PreviewXPos={player2WorkPile2PreviewXPos}
          workPile2PreviewYPos={player2WorkPile2PreviewYPos}
          workPile3PreviewXPos={player2WorkPile3PreviewXPos}
          workPile3PreviewYPos={player2WorkPile3PreviewYPos}
          workPile4PreviewXPos={player2WorkPile4PreviewXPos}
          workPile4PreviewYPos={player2WorkPile4PreviewYPos}
          setWorkPile1PreviewXPos={setPlayer2WorkPile1PreviewXPos}
          setWorkPile1PreviewYPos={setPlayer2WorkPile1PreviewYPos}
          setWorkPile2PreviewXPos={setPlayer2WorkPile2PreviewXPos}
          setWorkPile2PreviewYPos={setPlayer2WorkPile2PreviewYPos}
          setWorkPile3PreviewXPos={setPlayer2WorkPile3PreviewXPos}
          setWorkPile3PreviewYPos={setPlayer2WorkPile3PreviewYPos}
          setWorkPile4PreviewXPos={setPlayer2WorkPile4PreviewXPos}
          setWorkPile4PreviewYPos={setPlayer2WorkPile4PreviewYPos}
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
          nertzPile={player3NertzPile}
          setNertzPile={setPlayer3NertzPile}
          solitaireDeck={player3SolitaireDeck}
          solitairePile={player3SolitairePile}
          solitaireLeftoverPile={player3SolitaireLeftoverPile}
          setSolitaireDeck={setPlayer3SolitaireDeck}
          setSolitairePile={setPlayer3SolitairePile}
          setSolitaireLeftoverPile={setPlayer3SolitaireLeftoverPile}
          solitaireWork1Pile={player3SolitaireWork1Pile}
          solitaireWork2Pile={player3SolitaireWork2Pile}
          solitaireWork3Pile={player3SolitaireWork3Pile}
          solitaireWork4Pile={player3SolitaireWork4Pile}
          setSolitaireWork1Pile={setPlayer3SolitaireWork1Pile}
          setSolitaireWork2Pile={setPlayer3SolitaireWork2Pile}
          setSolitaireWork3Pile={setPlayer3SolitaireWork3Pile}
          setSolitaireWork4Pile={setPlayer3SolitaireWork4Pile}
          solitaireXPos={player3SolitaireXPos}
          solitaireYPos={player3SolitaireYPos}
          setSolitaireXPos={setPlayer3SolitaireXPos}
          setSolitaireYPos={setPlayer3SolitaireYPos}
          nertzPileXPos={player3NertzPileXPos}
          nertzPileYPos={player3NertzPileYPos}
          setNertzPileXPos={setPlayer3NertzPileXPos}
          setNertzPileYPos={setPlayer3NertzPileYPos}
          workPile1XPos={player3WorkPile1XPos}
          workPile1YPos={player3WorkPile1YPos}
          workPile2XPos={player3WorkPile2XPos}
          workPile2YPos={player3WorkPile2YPos}
          workPile3XPos={player3WorkPile3XPos}
          workPile3YPos={player3WorkPile3YPos}
          workPile4XPos={player3WorkPile4XPos}
          workPile4YPos={player3WorkPile4YPos}
          setWorkPile1XPos={setPlayer3WorkPile1XPos}
          setWorkPile1YPos={setPlayer3WorkPile1YPos}
          setWorkPile2XPos={setPlayer3WorkPile2XPos}
          setWorkPile2YPos={setPlayer3WorkPile2YPos}
          setWorkPile3XPos={setPlayer3WorkPile3XPos}
          setWorkPile3YPos={setPlayer3WorkPile3YPos}
          setWorkPile4XPos={setPlayer3WorkPile4XPos}
          setWorkPile4YPos={setPlayer3WorkPile4YPos}
          workPile1PreviewXPos={player3WorkPile1PreviewXPos}
          workPile1PreviewYPos={player3WorkPile1PreviewYPos}
          workPile2PreviewXPos={player3WorkPile2PreviewXPos}
          workPile2PreviewYPos={player3WorkPile2PreviewYPos}
          workPile3PreviewXPos={player3WorkPile3PreviewXPos}
          workPile3PreviewYPos={player3WorkPile3PreviewYPos}
          workPile4PreviewXPos={player3WorkPile4PreviewXPos}
          workPile4PreviewYPos={player3WorkPile4PreviewYPos}
          setWorkPile1PreviewXPos={setPlayer3WorkPile1PreviewXPos}
          setWorkPile1PreviewYPos={setPlayer3WorkPile1PreviewYPos}
          setWorkPile2PreviewXPos={setPlayer3WorkPile2PreviewXPos}
          setWorkPile2PreviewYPos={setPlayer3WorkPile2PreviewYPos}
          setWorkPile3PreviewXPos={setPlayer3WorkPile3PreviewXPos}
          setWorkPile3PreviewYPos={setPlayer3WorkPile3PreviewYPos}
          setWorkPile4PreviewXPos={setPlayer3WorkPile4PreviewXPos}
          setWorkPile4PreviewYPos={setPlayer3WorkPile4PreviewYPos}
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
          nertzPile={player4NertzPile}
          setNertzPile={setPlayer4NertzPile}
          solitaireDeck={player4SolitaireDeck}
          solitairePile={player4SolitairePile}
          solitaireLeftoverPile={player4SolitaireLeftoverPile}
          setSolitaireDeck={setPlayer4SolitaireDeck}
          setSolitairePile={setPlayer4SolitairePile}
          setSolitaireLeftoverPile={setPlayer4SolitaireLeftoverPile}
          solitaireWork1Pile={player4SolitaireWork1Pile}
          solitaireWork2Pile={player4SolitaireWork2Pile}
          solitaireWork3Pile={player4SolitaireWork3Pile}
          solitaireWork4Pile={player4SolitaireWork4Pile}
          setSolitaireWork1Pile={setPlayer4SolitaireWork1Pile}
          setSolitaireWork2Pile={setPlayer4SolitaireWork2Pile}
          setSolitaireWork3Pile={setPlayer4SolitaireWork3Pile}
          setSolitaireWork4Pile={setPlayer4SolitaireWork4Pile}
          solitaireXPos={player4SolitaireXPos}
          solitaireYPos={player4SolitaireYPos}
          setSolitaireXPos={setPlayer4SolitaireXPos}
          setSolitaireYPos={setPlayer4SolitaireYPos}
          nertzPileXPos={player4NertzPileXPos}
          nertzPileYPos={player4NertzPileYPos}
          setNertzPileXPos={setPlayer4NertzPileXPos}
          setNertzPileYPos={setPlayer4NertzPileYPos}
          workPile1XPos={player4WorkPile1XPos}
          workPile1YPos={player4WorkPile1YPos}
          workPile2XPos={player4WorkPile2XPos}
          workPile2YPos={player4WorkPile2YPos}
          workPile3XPos={player4WorkPile3XPos}
          workPile3YPos={player4WorkPile3YPos}
          workPile4XPos={player4WorkPile4XPos}
          workPile4YPos={player4WorkPile4YPos}
          setWorkPile1XPos={setPlayer4WorkPile1XPos}
          setWorkPile1YPos={setPlayer4WorkPile1YPos}
          setWorkPile2XPos={setPlayer4WorkPile2XPos}
          setWorkPile2YPos={setPlayer4WorkPile2YPos}
          setWorkPile3XPos={setPlayer4WorkPile3XPos}
          setWorkPile3YPos={setPlayer4WorkPile3YPos}
          setWorkPile4XPos={setPlayer4WorkPile4XPos}
          setWorkPile4YPos={setPlayer4WorkPile4YPos}
          workPile1PreviewXPos={player4WorkPile1PreviewXPos}
          workPile1PreviewYPos={player4WorkPile1PreviewYPos}
          workPile2PreviewXPos={player4WorkPile2PreviewXPos}
          workPile2PreviewYPos={player4WorkPile2PreviewYPos}
          workPile3PreviewXPos={player4WorkPile3PreviewXPos}
          workPile3PreviewYPos={player4WorkPile3PreviewYPos}
          workPile4PreviewXPos={player4WorkPile4PreviewXPos}
          workPile4PreviewYPos={player4WorkPile4PreviewYPos}
          setWorkPile1PreviewXPos={setPlayer4WorkPile1PreviewXPos}
          setWorkPile1PreviewYPos={setPlayer4WorkPile1PreviewYPos}
          setWorkPile2PreviewXPos={setPlayer4WorkPile2PreviewXPos}
          setWorkPile2PreviewYPos={setPlayer4WorkPile2PreviewYPos}
          setWorkPile3PreviewXPos={setPlayer4WorkPile3PreviewXPos}
          setWorkPile3PreviewYPos={setPlayer4WorkPile3PreviewYPos}
          setWorkPile4PreviewXPos={setPlayer4WorkPile4PreviewXPos}
          setWorkPile4PreviewYPos={setPlayer4WorkPile4PreviewYPos}
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
          nertzPile={player5NertzPile}
          setNertzPile={setPlayer5NertzPile}
          solitaireDeck={player5SolitaireDeck}
          solitairePile={player5SolitairePile}
          solitaireLeftoverPile={player5SolitaireLeftoverPile}
          setSolitaireDeck={setPlayer5SolitaireDeck}
          setSolitairePile={setPlayer5SolitairePile}
          setSolitaireLeftoverPile={setPlayer5SolitaireLeftoverPile}
          solitaireWork1Pile={player5SolitaireWork1Pile}
          solitaireWork2Pile={player5SolitaireWork2Pile}
          solitaireWork3Pile={player5SolitaireWork3Pile}
          solitaireWork4Pile={player5SolitaireWork4Pile}
          setSolitaireWork1Pile={setPlayer5SolitaireWork1Pile}
          setSolitaireWork2Pile={setPlayer5SolitaireWork2Pile}
          setSolitaireWork3Pile={setPlayer5SolitaireWork3Pile}
          setSolitaireWork4Pile={setPlayer5SolitaireWork4Pile}
          solitaireXPos={player5SolitaireXPos}
          solitaireYPos={player5SolitaireYPos}
          setSolitaireXPos={setPlayer5SolitaireXPos}
          setSolitaireYPos={setPlayer5SolitaireYPos}
          nertzPileXPos={player5NertzPileXPos}
          nertzPileYPos={player5NertzPileYPos}
          setNertzPileXPos={setPlayer5NertzPileXPos}
          setNertzPileYPos={setPlayer5NertzPileYPos}
          workPile1XPos={player5WorkPile1XPos}
          workPile1YPos={player5WorkPile1YPos}
          workPile2XPos={player5WorkPile2XPos}
          workPile2YPos={player5WorkPile2YPos}
          workPile3XPos={player5WorkPile3XPos}
          workPile3YPos={player5WorkPile3YPos}
          workPile4XPos={player5WorkPile4XPos}
          workPile4YPos={player5WorkPile4YPos}
          setWorkPile1XPos={setPlayer5WorkPile1XPos}
          setWorkPile1YPos={setPlayer5WorkPile1YPos}
          setWorkPile2XPos={setPlayer5WorkPile2XPos}
          setWorkPile2YPos={setPlayer5WorkPile2YPos}
          setWorkPile3XPos={setPlayer5WorkPile3XPos}
          setWorkPile3YPos={setPlayer5WorkPile3YPos}
          setWorkPile4XPos={setPlayer5WorkPile4XPos}
          setWorkPile4YPos={setPlayer5WorkPile4YPos}
          workPile1PreviewXPos={player5WorkPile1PreviewXPos}
          workPile1PreviewYPos={player5WorkPile1PreviewYPos}
          workPile2PreviewXPos={player5WorkPile2PreviewXPos}
          workPile2PreviewYPos={player5WorkPile2PreviewYPos}
          workPile3PreviewXPos={player5WorkPile3PreviewXPos}
          workPile3PreviewYPos={player5WorkPile3PreviewYPos}
          workPile4PreviewXPos={player5WorkPile4PreviewXPos}
          workPile4PreviewYPos={player5WorkPile4PreviewYPos}
          setWorkPile1PreviewXPos={setPlayer5WorkPile1PreviewXPos}
          setWorkPile1PreviewYPos={setPlayer5WorkPile1PreviewYPos}
          setWorkPile2PreviewXPos={setPlayer5WorkPile2PreviewXPos}
          setWorkPile2PreviewYPos={setPlayer5WorkPile2PreviewYPos}
          setWorkPile3PreviewXPos={setPlayer5WorkPile3PreviewXPos}
          setWorkPile3PreviewYPos={setPlayer5WorkPile3PreviewYPos}
          setWorkPile4PreviewXPos={setPlayer5WorkPile4PreviewXPos}
          setWorkPile4PreviewYPos={setPlayer5WorkPile4PreviewYPos}
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
          nertzPile={player6NertzPile}
          setNertzPile={setPlayer6NertzPile}
          solitaireDeck={player6SolitaireDeck}
          solitairePile={player6SolitairePile}
          solitaireLeftoverPile={player6SolitaireLeftoverPile}
          setSolitaireDeck={setPlayer6SolitaireDeck}
          setSolitairePile={setPlayer6SolitairePile}
          setSolitaireLeftoverPile={setPlayer6SolitaireLeftoverPile}
          solitaireWork1Pile={player6SolitaireWork1Pile}
          solitaireWork2Pile={player6SolitaireWork2Pile}
          solitaireWork3Pile={player6SolitaireWork3Pile}
          solitaireWork4Pile={player6SolitaireWork4Pile}
          setSolitaireWork1Pile={setPlayer6SolitaireWork1Pile}
          setSolitaireWork2Pile={setPlayer6SolitaireWork2Pile}
          setSolitaireWork3Pile={setPlayer6SolitaireWork3Pile}
          setSolitaireWork4Pile={setPlayer6SolitaireWork4Pile}
          solitaireXPos={player6SolitaireXPos}
          solitaireYPos={player6SolitaireYPos}
          setSolitaireXPos={setPlayer6SolitaireXPos}
          setSolitaireYPos={setPlayer6SolitaireYPos}
          nertzPileXPos={player6NertzPileXPos}
          nertzPileYPos={player6NertzPileYPos}
          setNertzPileXPos={setPlayer6NertzPileXPos}
          setNertzPileYPos={setPlayer6NertzPileYPos}
          workPile1XPos={player6WorkPile1XPos}
          workPile1YPos={player6WorkPile1YPos}
          workPile2XPos={player6WorkPile2XPos}
          workPile2YPos={player6WorkPile2YPos}
          workPile3XPos={player6WorkPile3XPos}
          workPile3YPos={player6WorkPile3YPos}
          workPile4XPos={player6WorkPile4XPos}
          workPile4YPos={player6WorkPile4YPos}
          setWorkPile1XPos={setPlayer6WorkPile1XPos}
          setWorkPile1YPos={setPlayer6WorkPile1YPos}
          setWorkPile2XPos={setPlayer6WorkPile2XPos}
          setWorkPile2YPos={setPlayer6WorkPile2YPos}
          setWorkPile3XPos={setPlayer6WorkPile3XPos}
          setWorkPile3YPos={setPlayer6WorkPile3YPos}
          setWorkPile4XPos={setPlayer6WorkPile4XPos}
          setWorkPile4YPos={setPlayer6WorkPile4YPos}
          workPile1PreviewXPos={player6WorkPile1PreviewXPos}
          workPile1PreviewYPos={player6WorkPile1PreviewYPos}
          workPile2PreviewXPos={player6WorkPile2PreviewXPos}
          workPile2PreviewYPos={player6WorkPile2PreviewYPos}
          workPile3PreviewXPos={player6WorkPile3PreviewXPos}
          workPile3PreviewYPos={player6WorkPile3PreviewYPos}
          workPile4PreviewXPos={player6WorkPile4PreviewXPos}
          workPile4PreviewYPos={player6WorkPile4PreviewYPos}
          setWorkPile1PreviewXPos={setPlayer6WorkPile1PreviewXPos}
          setWorkPile1PreviewYPos={setPlayer6WorkPile1PreviewYPos}
          setWorkPile2PreviewXPos={setPlayer6WorkPile2PreviewXPos}
          setWorkPile2PreviewYPos={setPlayer6WorkPile2PreviewYPos}
          setWorkPile3PreviewXPos={setPlayer6WorkPile3PreviewXPos}
          setWorkPile3PreviewYPos={setPlayer6WorkPile3PreviewYPos}
          setWorkPile4PreviewXPos={setPlayer6WorkPile4PreviewXPos}
          setWorkPile4PreviewYPos={setPlayer6WorkPile4PreviewYPos}
          broadcastPlayerUuid={player6BroadcastPlayerUuid}
          setBroadcastPlayerUuid={setPlayer6BroadcastPlayerUuid}
          setBroadcastTime={setBroadcastTime}
        />
      </section>
    </section>
  );
}

export default CardGameView
