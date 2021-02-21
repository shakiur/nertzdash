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
  setPlayerName,
  setPlayerDbId,
  setPlayerActive,
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
  broadcastPlayerUuid,
  setBroadcastPlayerUuid,
  setBroadcastTime
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

  function broadcastPlayerSolitaire(
    playerPos,
    playerUuid,
    playerActive,
    playerName,
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
      '&player_active=' + playerActive +
      '&player_name=' + playerName +
      '&solitaire_deck=' + JSON.stringify(solitaireDeck) +
      '&solitaire_pile=' + JSON.stringify(solitairePile) +
      '&leftover_solitaire_pile=' + JSON.stringify(solitaireLeftoverPile) +
      '&time=' + broadcastTime
    );
  }

  useEffect(() => {
    if(playerActive && playerUuid == broadcastPlayerUuid) {
      broadcastPlayerSolitaireWorkPiles(
        playerPos,
        playerUuid,
        solitaireWork1Pile,
        solitaireWork2Pile,
        solitaireWork3Pile,
        solitaireWork4Pile
      );
    }
  }, [solitaireWork1Pile, solitaireWork2Pile, solitaireWork3Pile, solitaireWork4Pile])

  function broadcastPlayerSolitaireWorkPiles(
    playerPos,
    playerUuid,
    solitaireWork1Pile,
    solitaireWork2Pile,
    solitaireWork3Pile,
    solitaireWork4Pile
  ) {
    const currentTime = new Date().getTime();
    setBroadcastTime(currentTime)

    fetch('/card_game/broadcast_player_solitaire_work_piles?' +
      'data_type=' + 'player_solitaire_work_piles' +
      '&player_pos=' + playerPos +
      '&player_uuid=' + playerUuid +
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

  return (
    <div className="PlayerTableNew">
      <div className="CardsArea">
        <div className="NertzPileArea">
          <NertzPileArea
            playerPos={playerPos}
            playerUuid={playerUuid}
            playerName={playerName}
            playerActive={playerActive}
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
            nertzPile={nertzPile}
            setNertzPile={setNertzPile}
            solitaireDeck={solitaireDeck}
            solitairePile={solitairePile}
            solitaireLeftoverPile={solitaireLeftoverPile}
            setSolitaireDeck={setSolitaireDeck}
            setSolitairePile={setSolitairePile}
            setSolitaireLeftoverPile={setSolitaireLeftoverPile}
            setSolitaireWork1Pile={setSolitaireWork1Pile}
            setSolitaireWork2Pile={setSolitaireWork2Pile}
            setSolitaireWork3Pile={setSolitaireWork3Pile}
            setSolitaireWork4Pile={setSolitaireWork4Pile}
          />
          <SolitairePileArea
            playerPos={playerPos}
            playerUuid={playerUuid}
            playerActive={playerActive}
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
          />
        </div>
        <div className="SolitaireWorkArea">
          <SolitaireWorkPileArea
            playerPos={playerPos}
            playerUuid={playerUuid}
            playerActive={playerActive}
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
          />
        </div>
        <div className="SolitaireWorkArea">
          <SolitaireWorkPileArea
            playerPos={playerPos}
            playerUuid={playerUuid}
            playerActive={playerActive}
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
          />
        </div>
        <div className="SolitaireWorkArea">
          <SolitaireWorkPileArea
            playerPos={playerPos}
            playerUuid={playerUuid}
            playerActive={playerActive}
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
          />
        </div>
        <div className="SolitaireWorkArea">
          <SolitaireWorkPileArea
            playerPos={playerPos}
            playerUuid={playerUuid}
            playerActive={playerActive}
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
          />
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
