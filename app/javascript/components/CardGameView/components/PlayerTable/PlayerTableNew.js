import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from 'semantic-ui-react';
import Card from "../../components/Card/Card"
import CardHolder from "../../components/CardHolder/CardHolder"
import SolitaireDeckArea from "../../components/SolitaireDeckArea/SolitaireDeckArea"
import SolitairePileArea from "../../components/SolitairePileArea/SolitairePileArea"
import SolitaireWorkPileArea from "../../components/SolitaireWorkPileArea/SolitaireWorkPileArea"
import NertzPileArea from "../../components/NertzPileArea/NertzPileArea"
import PlayerGameArea from "../../components/PlayerGameArea/PlayerGameArea"

const PlayerTableNew = ({
  playerPos,
  playerUuid,
  allPlayers,
  playerName,
  playerDbId,
  playerActive,
  playerScore,
  setPlayerName,
  setPlayerDbId,
  setPlayerActive,
  setPlayerScore,
  broadcastTime,
  nertzPile,
  setNertzPile,
  solitaireDeck,
  solitairePile,
  solitaireLeftoverPile,
  setSolitaireDeck,
  setSolitairePile,
  setSolitaireLeftoverPile,
  solitaireWork1Pile,
  solitaireWork2Pile,
  solitaireWork3Pile,
  solitaireWork4Pile,
  setSolitaireWork1Pile,
  setSolitaireWork2Pile,
  setSolitaireWork3Pile,
  setSolitaireWork4Pile,
  solitaireXPos,
  solitaireYPos,
  setSolitaireXPos,
  setSolitaireYPos,
  nertzPileXPos,
  nertzPileYPos,
  setNertzPileXPos,
  setNertzPileYPos,
  workPile1XPos,
  workPile1YPos,
  workPile2XPos,
  workPile2YPos,
  workPile3XPos,
  workPile3YPos,
  workPile4XPos,
  workPile4YPos,
  setWorkPile1XPos,
  setWorkPile1YPos,
  setWorkPile2XPos,
  setWorkPile2YPos,
  setWorkPile3XPos,
  setWorkPile3YPos,
  setWorkPile4XPos,
  setWorkPile4YPos,
  previewIndex,
  setPreviewIndex,
  workPile1PreviewXPos,
  workPile1PreviewYPos,
  workPile2PreviewXPos,
  workPile2PreviewYPos,
  workPile3PreviewXPos,
  workPile3PreviewYPos,
  workPile4PreviewXPos,
  workPile4PreviewYPos,
  setWorkPile1PreviewXPos,
  setWorkPile1PreviewYPos,
  setWorkPile2PreviewXPos,
  setWorkPile2PreviewYPos,
  setWorkPile3PreviewXPos,
  setWorkPile3PreviewYPos,
  setWorkPile4PreviewXPos,
  setWorkPile4PreviewYPos,
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
  broadcastPlayerUuid,
  setBroadcastPlayerUuid,
  setBroadcastTime,
  activeViewersCount,
  setActiveViewersCount,
  nertzWinner,
  nertzWinnerName,
  setNertzWinner,
  setNertzWinnerName
}) => {
  const [nertzSoliWorkPile1YPos, setNertzSoliWorkPile1YPos] = useState(-120)
  const [nertzSoliWorkPile2YPos, setNertzSoliWorkPile2YPos] = useState(-120)
  const [nertzSoliWorkPile3YPos, setNertzSoliWorkPile3YPos] = useState(-120)
  const [nertzSoliWorkPile4YPos, setNertzSoliWorkPile4YPos] = useState(-120)

  const [absoluteWorkPile1YPos, setAbsoluteWorkPile1YPos] = useState(0)
  const [absoluteWorkPile2YPos, setAbsoluteWorkPile2YPos] = useState(0)
  const [absoluteWorkPile3YPos, setAbsoluteWorkPile3YPos] = useState(0)
  const [absoluteWorkPile4YPos, setAbsoluteWorkPile4YPos] = useState(0)


  useEffect(() => {
    if(playerActive && playerUuid == broadcastPlayerUuid) {
      broadcastPlayerActiveStatus(
        playerPos,
        playerUuid,
        playerActive,
        playerName
      );
    }
  }, [playerActive, playerName])

  function broadcastPlayerActiveStatus(
    playerPos,
    playerUuid,
    playerActive,
    playerName
  ) {
    const currentTime = new Date().getTime();
    setBroadcastTime(currentTime)

    fetch('/card_game/broadcast_player_active_status?' +
      'data_type=' + 'player_active_status' +
      '&player_pos=' + playerPos +
      '&player_uuid=' + playerUuid +
      '&player_active=' + playerActive +
      '&player_name=' + playerName +
      '&time=' + broadcastTime
    );
  }

  useEffect(() => {
    if(playerActive && playerUuid == broadcastPlayerUuid) {
      broadcastPlayerScore(
        playerPos,
        playerUuid,
        playerScore
      );
    }
  }, [playerScore])

  function broadcastPlayerScore(
    playerPos,
    playerUuid,
    playerScore
  ) {
    const currentTime = new Date().getTime();
    setBroadcastTime(currentTime)

    fetch('/card_game/broadcast_player_score?' +
      'data_type=' + 'player_score' +
      '&player_pos=' + playerPos +
      '&player_uuid=' + playerUuid +
      '&player_score=' + playerScore +
      '&time=' + broadcastTime
    );
  }
  useEffect(() => {
    if(playerActive && playerUuid == broadcastPlayerUuid) {
      broadcastPlayerSolitaire(
        playerPos,
        playerUuid,
        solitaireDeck,
        solitairePile,
        solitaireLeftoverPile
      );
    }
  }, [solitairePile])

  function broadcastPlayerSolitaire(
    playerPos,
    playerUuid,
    solitaireDeck,
    solitairePile,
    solitaireLeftoverPile
  ) {
    const currentTime = new Date().getTime();
    setBroadcastTime(currentTime)

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

  useEffect(() => {
    if(playerActive) {
      broadcastPlayerAllData(
        playerPos,
        playerUuid,
        playerActive,
        playerName,
        playerScore,
        nertzPile,
        solitaireDeck,
        solitairePile,
        solitaireLeftoverPile,
        solitaireWork1Pile,
        solitaireWork2Pile,
        solitaireWork3Pile,
        solitaireWork4Pile
      );
    }
  }, [activeViewersCount])

  function broadcastPlayerAllData(
    playerPos,
    playerUuid,
    playerActive,
    playerName,
    playerScore,
    nertzPile,
    solitaireDeck,
    solitairePile,
    solitaireLeftoverPile,
    solitaireWork1Pile,
    solitaireWork2Pile,
    solitaireWork3Pile,
    solitaireWork4Pile
  ) {
    const currentTime = new Date().getTime();
    setBroadcastTime(currentTime)

    fetch('/card_game/broadcast_player_all_data?' +
      'data_type=' + 'player_all_data' +
      '&player_pos=' + playerPos +
      '&player_uuid=' + playerUuid +
      '&player_active=' + playerActive +
      '&player_name=' + playerName +
      '&player_score=' + playerScore +
      '&nertz_pile=' + JSON.stringify(nertzPile) +
      '&solitaire_deck=' + JSON.stringify(solitaireDeck) +
      '&solitaire_pile=' + JSON.stringify(solitairePile) +
      '&leftover_solitaire_pile=' + JSON.stringify(solitaireLeftoverPile) +
      '&solitaire_work_1_pile=' + JSON.stringify(solitaireWork1Pile) +
      '&solitaire_work_2_pile=' + JSON.stringify(solitaireWork2Pile) +
      '&solitaire_work_3_pile=' + JSON.stringify(solitaireWork3Pile) +
      '&solitaire_work_4_pile=' + JSON.stringify(solitaireWork4Pile) +
      '&time=' + broadcastTime
    );
  }

  useEffect(() => {
    if(playerActive && playerUuid == broadcastPlayerUuid) {
      broadcastPlayerNertzPile(
        playerPos,
        playerUuid,
        nertzPile);
    }
  }, [nertzPile])

  function broadcastPlayerNertzPile(
    playerPos,
    playerUuid,
    nertzPile
  ) {
    const currentTime = new Date().getTime();
    setBroadcastTime(currentTime)

    fetch('/card_game/broadcast_player_nertz_pile?' +
      'data_type=' + 'player_nertz_pile' +
      '&player_pos=' + playerPos +
      '&player_uuid=' + playerUuid +
      '&nertz_pile=' + JSON.stringify(nertzPile) +
      '&time=' + broadcastTime
    );
  }

  useEffect(() => {
    if(playerActive && playerUuid == centerPileBroadcastPlayerUuid) {
      broadcastCenterPile(playerPos, playerUuid, centerTablePile1, 1);
    }
  }, [centerTablePile1])

  useEffect(() => {
    if(playerActive && playerUuid == centerPileBroadcastPlayerUuid) {
      broadcastCenterPile(playerPos, playerUuid, centerTablePile2, 2);
    }
  }, [centerTablePile2])

  useEffect(() => {
    if(playerActive && playerUuid == centerPileBroadcastPlayerUuid) {
      broadcastCenterPile(playerPos, playerUuid, centerTablePile3, 3);
    }
  }, [centerTablePile3])

  useEffect(() => {
    if(playerActive && playerUuid == centerPileBroadcastPlayerUuid) {
      broadcastCenterPile(playerPos, playerUuid, centerTablePile4, 4);
    }
  }, [centerTablePile4])

  useEffect(() => {
    if(playerActive && playerUuid == centerPileBroadcastPlayerUuid) {
      broadcastCenterPile(playerPos, playerUuid, centerTablePile5, 5);
    }
  }, [centerTablePile5])

  useEffect(() => {
    if(playerActive && playerUuid == centerPileBroadcastPlayerUuid) {
      broadcastCenterPile(playerPos, playerUuid, centerTablePile6, 6);
    }
  }, [centerTablePile6])

  useEffect(() => {
    if(playerActive && playerUuid == centerPileBroadcastPlayerUuid) {
      broadcastCenterPile(playerPos, playerUuid, centerTablePile7, 7);
    }
  }, [centerTablePile7])

  useEffect(() => {
    if(playerActive && playerUuid == centerPileBroadcastPlayerUuid) {
      broadcastCenterPile(playerPos, playerUuid, centerTablePile8, 8);
    }
  }, [centerTablePile8])

  useEffect(() => {
    if(playerActive && playerUuid == centerPileBroadcastPlayerUuid) {
      broadcastCenterPile(playerPos, playerUuid, centerTablePile9, 9);
    }
  }, [centerTablePile9])

  useEffect(() => {
    if(playerActive && playerUuid == centerPileBroadcastPlayerUuid) {
      broadcastCenterPile(playerPos, playerUuid, centerTablePile10, 10);
    }
  }, [centerTablePile10])

  useEffect(() => {
    if(playerActive && playerUuid == centerPileBroadcastPlayerUuid) {
      broadcastCenterPile(playerPos, playerUuid, centerTablePile11, 11);
    }
  }, [centerTablePile11])

  useEffect(() => {
    if(playerActive && playerUuid == centerPileBroadcastPlayerUuid) {
      broadcastCenterPile(playerPos, playerUuid, centerTablePile12, 12);
    }
  }, [centerTablePile12])

  useEffect(() => {
    if(playerActive && playerUuid == centerPileBroadcastPlayerUuid) {
      broadcastCenterPile(playerPos, playerUuid, centerTablePile13, 13);
    }
  }, [centerTablePile13])

  useEffect(() => {
    if(playerActive && playerUuid == centerPileBroadcastPlayerUuid) {
      broadcastCenterPile(playerPos, playerUuid, centerTablePile14, 14);
    }
  }, [centerTablePile14])

  useEffect(() => {
    if(playerActive && playerUuid == centerPileBroadcastPlayerUuid) {
      broadcastCenterPile(playerPos, playerUuid, centerTablePile15, 15);
    }
  }, [centerTablePile15])

  useEffect(() => {
    if(playerActive && playerUuid == centerPileBroadcastPlayerUuid) {
      broadcastCenterPile(playerPos, playerUuid, centerTablePile16, 16);
    }
  }, [centerTablePile16])

  useEffect(() => {
    if(playerActive && playerUuid == centerPileBroadcastPlayerUuid) {
      broadcastCenterPile(playerPos, playerUuid, centerTablePile17, 17);
    }
  }, [centerTablePile17])

  useEffect(() => {
    if(playerActive && playerUuid == centerPileBroadcastPlayerUuid) {
      broadcastCenterPile(playerPos, playerUuid, centerTablePile18, 18);
    }
  }, [centerTablePile18])

  useEffect(() => {
    if(playerActive && playerUuid == centerPileBroadcastPlayerUuid) {
      broadcastCenterPile(playerPos, playerUuid, centerTablePile19, 19);
    }
  }, [centerTablePile19])

  useEffect(() => {
    if(playerActive && playerUuid == centerPileBroadcastPlayerUuid) {
      broadcastCenterPile(playerPos, playerUuid, centerTablePile20, 20);
    }
  }, [centerTablePile20])

  useEffect(() => {
    if(playerActive && playerUuid == centerPileBroadcastPlayerUuid) {
      broadcastCenterPile(playerPos, playerUuid, centerTablePile21, 21);
    }
  }, [centerTablePile21])

  useEffect(() => {
    if(playerActive && playerUuid == centerPileBroadcastPlayerUuid) {
      broadcastCenterPile(playerPos, playerUuid, centerTablePile22, 22);
    }
  }, [centerTablePile22])

  useEffect(() => {
    if(playerActive && playerUuid == centerPileBroadcastPlayerUuid) {
      broadcastCenterPile(playerPos, playerUuid, centerTablePile23, 23);
    }
  }, [centerTablePile23])

  useEffect(() => {
    if(playerActive && playerUuid == centerPileBroadcastPlayerUuid) {
      broadcastCenterPile(playerPos, playerUuid, centerTablePile24, 24);
    }
  }, [centerTablePile24])

  function broadcastCenterPile(
    playerPos,
    playerUuid,
    centerPile,
    centerPileNum
  ) {
    const currentTime = new Date().getTime();
    setBroadcastTime(currentTime)

    fetch('/card_game/broadcast_center_table_pile?' +
      'data_type=' + 'center_pile' +
      '&player_pos=' + playerPos +
      '&player_uuid=' + playerUuid +
      '&center_pile_num=' + centerPileNum +
      '&center_pile=' + JSON.stringify(centerPile) +
      '&time=' + broadcastTime
    );
  }


  useEffect(() => {
    if(solitaireWork1Pile.length == 0 || solitaireWork1Pile.length == 1) {
      setAbsoluteWorkPile1YPos(0)
      setNertzSoliWorkPile1YPos(-120)
    } else {
      const extraCardsCount = solitaireWork1Pile.length - 1
      setAbsoluteWorkPile1YPos(extraCardsCount * 15)
      setNertzSoliWorkPile1YPos((extraCardsCount * 15) - 120)
    }
  }, [solitaireWork1Pile])

  useEffect(() => {
    if(solitaireWork2Pile.length == 0 || solitaireWork2Pile.length == 1) {
      setAbsoluteWorkPile2YPos(0)
      setNertzSoliWorkPile2YPos(-120)
    } else {
      const extraCardsCount = solitaireWork2Pile.length - 1
      setAbsoluteWorkPile2YPos(extraCardsCount * 15)
      setNertzSoliWorkPile2YPos((extraCardsCount * 15) - 120)
    }
  }, [solitaireWork2Pile])

  useEffect(() => {
    if(solitaireWork3Pile.length == 0 || solitaireWork3Pile.length == 1) {
      setAbsoluteWorkPile3YPos(0)
      setNertzSoliWorkPile3YPos(-120)
    } else {
      const extraCardsCount = solitaireWork3Pile.length - 1
      setAbsoluteWorkPile3YPos(extraCardsCount * 15)
      setNertzSoliWorkPile3YPos((extraCardsCount * 15) - 120)
    }
  }, [solitaireWork3Pile])

  useEffect(() => {
    if(solitaireWork4Pile.length == 0 || solitaireWork4Pile.length == 1) {
      setAbsoluteWorkPile4YPos(0)
      setNertzSoliWorkPile4YPos(-120)
    } else {
      const extraCardsCount = solitaireWork4Pile.length - 1
      setAbsoluteWorkPile4YPos(extraCardsCount * 15)
      setNertzSoliWorkPile4YPos((extraCardsCount * 15) - 120)
    }
  }, [solitaireWork4Pile])

  useEffect(() => {
    if(playerActive && nertzPile.length == 0) {
      setNertzWinner(true)
      setNertzWinnerName(playerName)
    }
  }, [nertzPile])

  return (
    <div className="PlayerTableNew">
      <div className="CardsArea">
        <div className="NertzPileArea">
          <NertzPileArea
            playerPos={playerPos}
            playerUuid={playerUuid}
            playerName={playerName}
            playerActive={playerActive}
            playerScore={playerScore}
            setPlayerScore={setPlayerScore}
            broadcastTime={broadcastTime}
            setBroadcastTime={setBroadcastTime}
            broadcastPlayerUuid={broadcastPlayerUuid}
            setBroadcastPlayerUuid={setBroadcastPlayerUuid}
            nertzPile={nertzPile}
            setNertzPile={setNertzPile}
            nertzPileXPos={nertzPileXPos}
            nertzPileYPos={nertzPileYPos}
            setNertzPileXPos={setNertzPileXPos}
            setNertzPileYPos={setNertzPileYPos}
            solitaireWork1Pile={solitaireWork1Pile}
            solitaireWork2Pile={solitaireWork2Pile}
            solitaireWork3Pile={solitaireWork3Pile}
            solitaireWork4Pile={solitaireWork4Pile}
            setSolitaireWork1Pile={setSolitaireWork1Pile}
            setSolitaireWork2Pile={setSolitaireWork2Pile}
            setSolitaireWork3Pile={setSolitaireWork3Pile}
            setSolitaireWork4Pile={setSolitaireWork4Pile}
            nertzSoliWorkPile1YPos={nertzSoliWorkPile1YPos}
            nertzSoliWorkPile2YPos={nertzSoliWorkPile2YPos}
            nertzSoliWorkPile3YPos={nertzSoliWorkPile3YPos}
            nertzSoliWorkPile4YPos={nertzSoliWorkPile4YPos}
            centerTablePile1={centerTablePile1}
            centerTablePile2={centerTablePile2}
            centerTablePile3={centerTablePile3}
            centerTablePile4={centerTablePile4}
            centerTablePile5={centerTablePile5}
            centerTablePile6={centerTablePile6}
            centerTablePile7={centerTablePile7}
            centerTablePile8={centerTablePile8}
            centerTablePile9={centerTablePile9}
            centerTablePile10={centerTablePile10}
            centerTablePile11={centerTablePile11}
            centerTablePile12={centerTablePile12}
            centerTablePile13={centerTablePile13}
            centerTablePile14={centerTablePile14}
            centerTablePile15={centerTablePile15}
            centerTablePile16={centerTablePile16}
            centerTablePile17={centerTablePile17}
            centerTablePile18={centerTablePile18}
            centerTablePile19={centerTablePile19}
            centerTablePile20={centerTablePile20}
            centerTablePile21={centerTablePile21}
            centerTablePile22={centerTablePile22}
            centerTablePile23={centerTablePile23}
            centerTablePile24={centerTablePile24}
            setCenterTablePile1={setCenterTablePile1}
            setCenterTablePile2={setCenterTablePile2}
            setCenterTablePile3={setCenterTablePile3}
            setCenterTablePile4={setCenterTablePile4}
            setCenterTablePile5={setCenterTablePile5}
            setCenterTablePile6={setCenterTablePile6}
            setCenterTablePile7={setCenterTablePile7}
            setCenterTablePile8={setCenterTablePile8}
            setCenterTablePile9={setCenterTablePile9}
            setCenterTablePile10={setCenterTablePile10}
            setCenterTablePile11={setCenterTablePile11}
            setCenterTablePile12={setCenterTablePile12}
            setCenterTablePile13={setCenterTablePile13}
            setCenterTablePile14={setCenterTablePile14}
            setCenterTablePile15={setCenterTablePile15}
            setCenterTablePile16={setCenterTablePile16}
            setCenterTablePile17={setCenterTablePile17}
            setCenterTablePile18={setCenterTablePile18}
            setCenterTablePile19={setCenterTablePile19}
            setCenterTablePile20={setCenterTablePile20}
            setCenterTablePile21={setCenterTablePile21}
            setCenterTablePile22={setCenterTablePile22}
            setCenterTablePile23={setCenterTablePile23}
            setCenterTablePile24={setCenterTablePile24}
            centerPileBroadcastPlayerUuid={centerPileBroadcastPlayerUuid}
            setCenterPileBroadcastPlayerUuid={setCenterPileBroadcastPlayerUuid}
            nertzWinner={nertzWinner}
          />
        </div>
        <div className="SolitaireDeckArea">
          <SolitaireDeckArea
            playerPos={playerPos}
            playerUuid={playerUuid}
            playerName={playerName}
            playerActive={playerActive}
            setPlayerActive={setPlayerActive}
            broadcastTime={broadcastTime}
            setBroadcastTime={setBroadcastTime}
            broadcastPlayerUuid={broadcastPlayerUuid}
            setBroadcastPlayerUuid={setBroadcastPlayerUuid}
            solitaireDeck={solitaireDeck}
            solitairePile={solitairePile}
            solitaireLeftoverPile={solitaireLeftoverPile}
            setSolitaireDeck={setSolitaireDeck}
            setSolitairePile={setSolitairePile}
            setSolitaireLeftoverPile={setSolitaireLeftoverPile}
            nertzWinner={nertzWinner}
          />
          <SolitairePileArea
            playerPos={playerPos}
            playerUuid={playerUuid}
            playerActive={playerActive}
            playerScore={playerScore}
            setPlayerScore={setPlayerScore}
            broadcastPlayerUuid={broadcastPlayerUuid}
            setBroadcastPlayerUuid={setBroadcastPlayerUuid}
            broadcastTime={broadcastTime}
            setBroadcastTime={setBroadcastTime}
            solitairePile={solitairePile}
            setSolitairePile={setSolitairePile}
            solitaireXPos={solitaireXPos}
            solitaireYPos={solitaireYPos}
            setSolitaireXPos={setSolitaireXPos}
            setSolitaireYPos={setSolitaireYPos}
            solitaireWork1Pile={solitaireWork1Pile}
            solitaireWork2Pile={solitaireWork2Pile}
            solitaireWork3Pile={solitaireWork3Pile}
            solitaireWork4Pile={solitaireWork4Pile}
            setSolitaireWork1Pile={setSolitaireWork1Pile}
            setSolitaireWork2Pile={setSolitaireWork2Pile}
            setSolitaireWork3Pile={setSolitaireWork3Pile}
            setSolitaireWork4Pile={setSolitaireWork4Pile}
            nertzSoliWorkPile1YPos={nertzSoliWorkPile1YPos}
            nertzSoliWorkPile2YPos={nertzSoliWorkPile2YPos}
            nertzSoliWorkPile3YPos={nertzSoliWorkPile3YPos}
            nertzSoliWorkPile4YPos={nertzSoliWorkPile4YPos}
            centerTablePile1={centerTablePile1}
            centerTablePile2={centerTablePile2}
            centerTablePile3={centerTablePile3}
            centerTablePile4={centerTablePile4}
            centerTablePile5={centerTablePile5}
            centerTablePile6={centerTablePile6}
            centerTablePile7={centerTablePile7}
            centerTablePile8={centerTablePile8}
            centerTablePile9={centerTablePile9}
            centerTablePile10={centerTablePile10}
            centerTablePile11={centerTablePile11}
            centerTablePile12={centerTablePile12}
            centerTablePile13={centerTablePile13}
            centerTablePile14={centerTablePile14}
            centerTablePile15={centerTablePile15}
            centerTablePile16={centerTablePile16}
            centerTablePile17={centerTablePile17}
            centerTablePile18={centerTablePile18}
            centerTablePile19={centerTablePile19}
            centerTablePile20={centerTablePile20}
            centerTablePile21={centerTablePile21}
            centerTablePile22={centerTablePile22}
            centerTablePile23={centerTablePile23}
            centerTablePile24={centerTablePile24}
            setCenterTablePile1={setCenterTablePile1}
            setCenterTablePile2={setCenterTablePile2}
            setCenterTablePile3={setCenterTablePile3}
            setCenterTablePile4={setCenterTablePile4}
            setCenterTablePile5={setCenterTablePile5}
            setCenterTablePile6={setCenterTablePile6}
            setCenterTablePile7={setCenterTablePile7}
            setCenterTablePile8={setCenterTablePile8}
            setCenterTablePile9={setCenterTablePile9}
            setCenterTablePile10={setCenterTablePile10}
            setCenterTablePile11={setCenterTablePile11}
            setCenterTablePile12={setCenterTablePile12}
            setCenterTablePile13={setCenterTablePile13}
            setCenterTablePile14={setCenterTablePile14}
            setCenterTablePile15={setCenterTablePile15}
            setCenterTablePile16={setCenterTablePile16}
            setCenterTablePile17={setCenterTablePile17}
            setCenterTablePile18={setCenterTablePile18}
            setCenterTablePile19={setCenterTablePile19}
            setCenterTablePile20={setCenterTablePile20}
            setCenterTablePile21={setCenterTablePile21}
            setCenterTablePile22={setCenterTablePile22}
            setCenterTablePile23={setCenterTablePile23}
            setCenterTablePile24={setCenterTablePile24}
            centerPileBroadcastPlayerUuid={centerPileBroadcastPlayerUuid}
            setCenterPileBroadcastPlayerUuid={setCenterPileBroadcastPlayerUuid}
            nertzWinner={nertzWinner}
          />
        </div>
        <div className="SolitaireWorkArea">
          <SolitaireWorkPileArea
            playerPos={playerPos}
            playerUuid={playerUuid}
            playerActive={playerActive}
            playerScore={playerScore}
            setPlayerScore={setPlayerScore}
            broadcastPlayerUuid={broadcastPlayerUuid}
            setBroadcastPlayerUuid={setBroadcastPlayerUuid}
            broadcastTime={broadcastTime}
            setBroadcastTime={setBroadcastTime}
            workPilePos={1}
            workPileXPos={workPile1XPos}
            workPileYPos={workPile1YPos}
            setWorkPileXPos={setWorkPile1XPos}
            setWorkPileYPos={setWorkPile1YPos}
            workPilePreviewXPos={workPile1PreviewXPos}
            workPilePreviewYPos={workPile1PreviewYPos}
            setWorkPilePreviewXPos={setWorkPile1PreviewXPos}
            setWorkPilePreviewYPos={setWorkPile1PreviewYPos}
            previewIndex={previewIndex}
            setPreviewIndex={setPreviewIndex}
            solitaireWorkPile={solitaireWork1Pile}
            setSolitaireWorkPile={setSolitaireWork1Pile}
            solitaireWork1Pile={solitaireWork1Pile}
            solitaireWork2Pile={solitaireWork2Pile}
            solitaireWork3Pile={solitaireWork3Pile}
            solitaireWork4Pile={solitaireWork4Pile}
            setSolitaireWork1Pile={setSolitaireWork1Pile}
            setSolitaireWork2Pile={setSolitaireWork2Pile}
            setSolitaireWork3Pile={setSolitaireWork3Pile}
            setSolitaireWork4Pile={setSolitaireWork4Pile}
            absoluteWorkPile1YPos={absoluteWorkPile1YPos}
            absoluteWorkPile2YPos={absoluteWorkPile2YPos}
            absoluteWorkPile3YPos={absoluteWorkPile3YPos}
            absoluteWorkPile4YPos={absoluteWorkPile4YPos}
            centerTablePile1={centerTablePile1}
            centerTablePile2={centerTablePile2}
            centerTablePile3={centerTablePile3}
            centerTablePile4={centerTablePile4}
            centerTablePile5={centerTablePile5}
            centerTablePile6={centerTablePile6}
            centerTablePile7={centerTablePile7}
            centerTablePile8={centerTablePile8}
            centerTablePile9={centerTablePile9}
            centerTablePile10={centerTablePile10}
            centerTablePile11={centerTablePile11}
            centerTablePile12={centerTablePile12}
            centerTablePile13={centerTablePile13}
            centerTablePile14={centerTablePile14}
            centerTablePile15={centerTablePile15}
            centerTablePile16={centerTablePile16}
            centerTablePile17={centerTablePile17}
            centerTablePile18={centerTablePile18}
            centerTablePile19={centerTablePile19}
            centerTablePile20={centerTablePile20}
            centerTablePile21={centerTablePile21}
            centerTablePile22={centerTablePile22}
            centerTablePile23={centerTablePile23}
            centerTablePile24={centerTablePile24}
            setCenterTablePile1={setCenterTablePile1}
            setCenterTablePile2={setCenterTablePile2}
            setCenterTablePile3={setCenterTablePile3}
            setCenterTablePile4={setCenterTablePile4}
            setCenterTablePile5={setCenterTablePile5}
            setCenterTablePile6={setCenterTablePile6}
            setCenterTablePile7={setCenterTablePile7}
            setCenterTablePile8={setCenterTablePile8}
            setCenterTablePile9={setCenterTablePile9}
            setCenterTablePile10={setCenterTablePile10}
            setCenterTablePile11={setCenterTablePile11}
            setCenterTablePile12={setCenterTablePile12}
            setCenterTablePile13={setCenterTablePile13}
            setCenterTablePile14={setCenterTablePile14}
            setCenterTablePile15={setCenterTablePile15}
            setCenterTablePile16={setCenterTablePile16}
            setCenterTablePile17={setCenterTablePile17}
            setCenterTablePile18={setCenterTablePile18}
            setCenterTablePile19={setCenterTablePile19}
            setCenterTablePile20={setCenterTablePile20}
            setCenterTablePile21={setCenterTablePile21}
            setCenterTablePile22={setCenterTablePile22}
            setCenterTablePile23={setCenterTablePile23}
            setCenterTablePile24={setCenterTablePile24}
            centerPileBroadcastPlayerUuid={centerPileBroadcastPlayerUuid}
            setCenterPileBroadcastPlayerUuid={setCenterPileBroadcastPlayerUuid}
            activeViewersCount={activeViewersCount}
            setActiveViewersCount={setActiveViewersCount}
            nertzWinner={nertzWinner}
          />
        </div>
        <div className="SolitaireWorkArea">
          <SolitaireWorkPileArea
            playerPos={playerPos}
            playerUuid={playerUuid}
            playerActive={playerActive}
            playerScore={playerScore}
            setPlayerScore={setPlayerScore}
            broadcastPlayerUuid={broadcastPlayerUuid}
            setBroadcastPlayerUuid={setBroadcastPlayerUuid}
            broadcastTime={broadcastTime}
            setBroadcastTime={setBroadcastTime}
            workPilePos={2}
            workPileXPos={workPile2XPos}
            workPileYPos={workPile2YPos}
            setWorkPileXPos={setWorkPile2XPos}
            setWorkPileYPos={setWorkPile2YPos}
            workPilePreviewXPos={workPile2PreviewXPos}
            workPilePreviewYPos={workPile2PreviewYPos}
            setWorkPilePreviewXPos={setWorkPile2PreviewXPos}
            setWorkPilePreviewYPos={setWorkPile2PreviewYPos}
            previewIndex={previewIndex}
            setPreviewIndex={setPreviewIndex}
            solitaireWorkPile={solitaireWork2Pile}
            setSolitaireWorkPile={setSolitaireWork2Pile}
            solitaireWork1Pile={solitaireWork1Pile}
            solitaireWork2Pile={solitaireWork2Pile}
            solitaireWork3Pile={solitaireWork3Pile}
            solitaireWork4Pile={solitaireWork4Pile}
            setSolitaireWork1Pile={setSolitaireWork1Pile}
            setSolitaireWork2Pile={setSolitaireWork2Pile}
            setSolitaireWork3Pile={setSolitaireWork3Pile}
            setSolitaireWork4Pile={setSolitaireWork4Pile}
            absoluteWorkPile1YPos={absoluteWorkPile1YPos}
            absoluteWorkPile2YPos={absoluteWorkPile2YPos}
            absoluteWorkPile3YPos={absoluteWorkPile3YPos}
            absoluteWorkPile4YPos={absoluteWorkPile4YPos}
            centerTablePile1={centerTablePile1}
            centerTablePile2={centerTablePile2}
            centerTablePile3={centerTablePile3}
            centerTablePile4={centerTablePile4}
            centerTablePile5={centerTablePile5}
            centerTablePile6={centerTablePile6}
            centerTablePile7={centerTablePile7}
            centerTablePile8={centerTablePile8}
            centerTablePile9={centerTablePile9}
            centerTablePile10={centerTablePile10}
            centerTablePile11={centerTablePile11}
            centerTablePile12={centerTablePile12}
            centerTablePile13={centerTablePile13}
            centerTablePile14={centerTablePile14}
            centerTablePile15={centerTablePile15}
            centerTablePile16={centerTablePile16}
            centerTablePile17={centerTablePile17}
            centerTablePile18={centerTablePile18}
            centerTablePile19={centerTablePile19}
            centerTablePile20={centerTablePile20}
            centerTablePile21={centerTablePile21}
            centerTablePile22={centerTablePile22}
            centerTablePile23={centerTablePile23}
            centerTablePile24={centerTablePile24}
            setCenterTablePile1={setCenterTablePile1}
            setCenterTablePile2={setCenterTablePile2}
            setCenterTablePile3={setCenterTablePile3}
            setCenterTablePile4={setCenterTablePile4}
            setCenterTablePile5={setCenterTablePile5}
            setCenterTablePile6={setCenterTablePile6}
            setCenterTablePile7={setCenterTablePile7}
            setCenterTablePile8={setCenterTablePile8}
            setCenterTablePile9={setCenterTablePile9}
            setCenterTablePile10={setCenterTablePile10}
            setCenterTablePile11={setCenterTablePile11}
            setCenterTablePile12={setCenterTablePile12}
            setCenterTablePile13={setCenterTablePile13}
            setCenterTablePile14={setCenterTablePile14}
            setCenterTablePile15={setCenterTablePile15}
            setCenterTablePile16={setCenterTablePile16}
            setCenterTablePile17={setCenterTablePile17}
            setCenterTablePile18={setCenterTablePile18}
            setCenterTablePile19={setCenterTablePile19}
            setCenterTablePile20={setCenterTablePile20}
            setCenterTablePile21={setCenterTablePile21}
            setCenterTablePile22={setCenterTablePile22}
            setCenterTablePile23={setCenterTablePile23}
            setCenterTablePile24={setCenterTablePile24}
            centerPileBroadcastPlayerUuid={centerPileBroadcastPlayerUuid}
            setCenterPileBroadcastPlayerUuid={setCenterPileBroadcastPlayerUuid}
            activeViewersCount={activeViewersCount}
            setActiveViewersCount={setActiveViewersCount}
            nertzWinner={nertzWinner}
          />
        </div>
        <div className="SolitaireWorkArea">
          <SolitaireWorkPileArea
            playerPos={playerPos}
            playerUuid={playerUuid}
            playerActive={playerActive}
            playerScore={playerScore}
            setPlayerScore={setPlayerScore}
            broadcastPlayerUuid={broadcastPlayerUuid}
            setBroadcastPlayerUuid={setBroadcastPlayerUuid}
            broadcastTime={broadcastTime}
            setBroadcastTime={setBroadcastTime}
            workPilePos={3}
            workPileXPos={workPile3XPos}
            workPileYPos={workPile3YPos}
            setWorkPileXPos={setWorkPile3XPos}
            setWorkPileYPos={setWorkPile3YPos}
            workPilePreviewXPos={workPile3PreviewXPos}
            workPilePreviewYPos={workPile3PreviewYPos}
            setWorkPilePreviewXPos={setWorkPile3PreviewXPos}
            setWorkPilePreviewYPos={setWorkPile3PreviewYPos}
            previewIndex={previewIndex}
            setPreviewIndex={setPreviewIndex}
            solitaireWorkPile={solitaireWork3Pile}
            setSolitaireWorkPile={setSolitaireWork3Pile}
            solitaireWork1Pile={solitaireWork1Pile}
            solitaireWork2Pile={solitaireWork2Pile}
            solitaireWork3Pile={solitaireWork3Pile}
            solitaireWork4Pile={solitaireWork4Pile}
            setSolitaireWork1Pile={setSolitaireWork1Pile}
            setSolitaireWork2Pile={setSolitaireWork2Pile}
            setSolitaireWork3Pile={setSolitaireWork3Pile}
            setSolitaireWork4Pile={setSolitaireWork4Pile}
            absoluteWorkPile1YPos={absoluteWorkPile1YPos}
            absoluteWorkPile2YPos={absoluteWorkPile2YPos}
            absoluteWorkPile3YPos={absoluteWorkPile3YPos}
            absoluteWorkPile4YPos={absoluteWorkPile4YPos}
            centerTablePile1={centerTablePile1}
            centerTablePile2={centerTablePile2}
            centerTablePile3={centerTablePile3}
            centerTablePile4={centerTablePile4}
            centerTablePile5={centerTablePile5}
            centerTablePile6={centerTablePile6}
            centerTablePile7={centerTablePile7}
            centerTablePile8={centerTablePile8}
            centerTablePile9={centerTablePile9}
            centerTablePile10={centerTablePile10}
            centerTablePile11={centerTablePile11}
            centerTablePile12={centerTablePile12}
            centerTablePile13={centerTablePile13}
            centerTablePile14={centerTablePile14}
            centerTablePile15={centerTablePile15}
            centerTablePile16={centerTablePile16}
            centerTablePile17={centerTablePile17}
            centerTablePile18={centerTablePile18}
            centerTablePile19={centerTablePile19}
            centerTablePile20={centerTablePile20}
            centerTablePile21={centerTablePile21}
            centerTablePile22={centerTablePile22}
            centerTablePile23={centerTablePile23}
            centerTablePile24={centerTablePile24}
            setCenterTablePile1={setCenterTablePile1}
            setCenterTablePile2={setCenterTablePile2}
            setCenterTablePile3={setCenterTablePile3}
            setCenterTablePile4={setCenterTablePile4}
            setCenterTablePile5={setCenterTablePile5}
            setCenterTablePile6={setCenterTablePile6}
            setCenterTablePile7={setCenterTablePile7}
            setCenterTablePile8={setCenterTablePile8}
            setCenterTablePile9={setCenterTablePile9}
            setCenterTablePile10={setCenterTablePile10}
            setCenterTablePile11={setCenterTablePile11}
            setCenterTablePile12={setCenterTablePile12}
            setCenterTablePile13={setCenterTablePile13}
            setCenterTablePile14={setCenterTablePile14}
            setCenterTablePile15={setCenterTablePile15}
            setCenterTablePile16={setCenterTablePile16}
            setCenterTablePile17={setCenterTablePile17}
            setCenterTablePile18={setCenterTablePile18}
            setCenterTablePile19={setCenterTablePile19}
            setCenterTablePile20={setCenterTablePile20}
            setCenterTablePile21={setCenterTablePile21}
            setCenterTablePile22={setCenterTablePile22}
            setCenterTablePile23={setCenterTablePile23}
            setCenterTablePile24={setCenterTablePile24}
            centerPileBroadcastPlayerUuid={centerPileBroadcastPlayerUuid}
            setCenterPileBroadcastPlayerUuid={setCenterPileBroadcastPlayerUuid}
            activeViewersCount={activeViewersCount}
            setActiveViewersCount={setActiveViewersCount}
            nertzWinner={nertzWinner}
          />
        </div>
        <div className="SolitaireWorkArea">
          <SolitaireWorkPileArea
            playerPos={playerPos}
            playerUuid={playerUuid}
            playerActive={playerActive}
            playerScore={playerScore}
            setPlayerScore={setPlayerScore}
            broadcastPlayerUuid={broadcastPlayerUuid}
            setBroadcastPlayerUuid={setBroadcastPlayerUuid}
            broadcastTime={broadcastTime}
            setBroadcastTime={setBroadcastTime}
            workPilePos={4}
            workPileXPos={workPile4XPos}
            workPileYPos={workPile4YPos}
            setWorkPileXPos={setWorkPile4XPos}
            setWorkPileYPos={setWorkPile4YPos}
            workPilePreviewXPos={workPile4PreviewXPos}
            workPilePreviewYPos={workPile4PreviewYPos}
            setWorkPilePreviewXPos={setWorkPile4PreviewXPos}
            setWorkPilePreviewYPos={setWorkPile4PreviewYPos}
            previewIndex={previewIndex}
            setPreviewIndex={setPreviewIndex}
            solitaireWorkPile={solitaireWork4Pile}
            setSolitaireWorkPile={setSolitaireWork4Pile}
            solitaireWork1Pile={solitaireWork1Pile}
            solitaireWork2Pile={solitaireWork2Pile}
            solitaireWork3Pile={solitaireWork3Pile}
            solitaireWork4Pile={solitaireWork4Pile}
            setSolitaireWork1Pile={setSolitaireWork1Pile}
            setSolitaireWork2Pile={setSolitaireWork2Pile}
            setSolitaireWork3Pile={setSolitaireWork3Pile}
            setSolitaireWork4Pile={setSolitaireWork4Pile}
            absoluteWorkPile1YPos={absoluteWorkPile1YPos}
            absoluteWorkPile2YPos={absoluteWorkPile2YPos}
            absoluteWorkPile3YPos={absoluteWorkPile3YPos}
            absoluteWorkPile4YPos={absoluteWorkPile4YPos}
            centerTablePile1={centerTablePile1}
            centerTablePile2={centerTablePile2}
            centerTablePile3={centerTablePile3}
            centerTablePile4={centerTablePile4}
            centerTablePile5={centerTablePile5}
            centerTablePile6={centerTablePile6}
            centerTablePile7={centerTablePile7}
            centerTablePile8={centerTablePile8}
            centerTablePile9={centerTablePile9}
            centerTablePile10={centerTablePile10}
            centerTablePile11={centerTablePile11}
            centerTablePile12={centerTablePile12}
            centerTablePile13={centerTablePile13}
            centerTablePile14={centerTablePile14}
            centerTablePile15={centerTablePile15}
            centerTablePile16={centerTablePile16}
            centerTablePile17={centerTablePile17}
            centerTablePile18={centerTablePile18}
            centerTablePile19={centerTablePile19}
            centerTablePile20={centerTablePile20}
            centerTablePile21={centerTablePile21}
            centerTablePile22={centerTablePile22}
            centerTablePile23={centerTablePile23}
            centerTablePile24={centerTablePile24}
            setCenterTablePile1={setCenterTablePile1}
            setCenterTablePile2={setCenterTablePile2}
            setCenterTablePile3={setCenterTablePile3}
            setCenterTablePile4={setCenterTablePile4}
            setCenterTablePile5={setCenterTablePile5}
            setCenterTablePile6={setCenterTablePile6}
            setCenterTablePile7={setCenterTablePile7}
            setCenterTablePile8={setCenterTablePile8}
            setCenterTablePile9={setCenterTablePile9}
            setCenterTablePile10={setCenterTablePile10}
            setCenterTablePile11={setCenterTablePile11}
            setCenterTablePile12={setCenterTablePile12}
            setCenterTablePile13={setCenterTablePile13}
            setCenterTablePile14={setCenterTablePile14}
            setCenterTablePile15={setCenterTablePile15}
            setCenterTablePile16={setCenterTablePile16}
            setCenterTablePile17={setCenterTablePile17}
            setCenterTablePile18={setCenterTablePile18}
            setCenterTablePile19={setCenterTablePile19}
            setCenterTablePile20={setCenterTablePile20}
            setCenterTablePile21={setCenterTablePile21}
            setCenterTablePile22={setCenterTablePile22}
            setCenterTablePile23={setCenterTablePile23}
            setCenterTablePile24={setCenterTablePile24}
            centerPileBroadcastPlayerUuid={centerPileBroadcastPlayerUuid}
            setCenterPileBroadcastPlayerUuid={setCenterPileBroadcastPlayerUuid}
            activeViewersCount={activeViewersCount}
            setActiveViewersCount={setActiveViewersCount}
            nertzWinner={nertzWinner}
          />
        </div>
      </div>
      <PlayerGameArea
        playerPos={playerPos}
        playerUuid={playerUuid}
        playerActive={playerActive}
        playerName={playerName}
        playerScore={playerScore}
        setPlayerName={setPlayerName}
        setPlayerActive={setPlayerActive}
        setPlayerScore={setPlayerScore}
        allPlayers={allPlayers}
        setNertzPile={setNertzPile}
        setSolitaireDeck={setSolitaireDeck}
        setSolitairePile={setSolitairePile}
        setSolitaireLeftoverPile={setSolitaireLeftoverPile}
        setSolitaireWork1Pile={setSolitaireWork1Pile}
        setSolitaireWork2Pile={setSolitaireWork2Pile}
        setSolitaireWork3Pile={setSolitaireWork3Pile}
        setSolitaireWork4Pile={setSolitaireWork4Pile}
        setBroadcastPlayerUuid={setBroadcastPlayerUuid}
        nertzWinner={nertzWinner}
        nertzWinnerName={nertzWinnerName}
        setNertzWinner={setNertzWinner}
        setNertzWinnerName={setNertzWinnerName}
      />
    </div>
  )
}

export default PlayerTableNew;
