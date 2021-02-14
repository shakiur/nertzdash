import React, { useEffect } from "react";
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
        nertzPile,
        solitaireDeck,
        solitairePile,
        solitaireLeftoverPile
      );
    }
  }, [solitairePile, nertzPile])

  function broadcastPlayerSolitaire(playerPos, playerUuid, playerActive, playerName, nertzPile, solitaireDeck, solitairePile, solitaireLeftoverPile) {
    const currentTime = new Date().getTime();
    setBroadcastTime(currentTime)

    fetch('/card_game/broadcast_player_solitaire?' +
      'data_type=' + 'player_solitaire' +
      '&player_pos=' + playerPos +
      '&player_uuid=' + playerUuid +
      '&player_active=' + playerActive +
      '&player_name=' + playerName +
      '&nertz_pile=' + JSON.stringify(nertzPile) +
      '&solitaire_deck=' + JSON.stringify(solitaireDeck) +
      '&solitaire_pile=' + JSON.stringify(solitairePile) +
      '&leftover_solitaire_pile=' + JSON.stringify(solitaireLeftoverPile) +
      '&time=' + broadcastTime
    );
  }

  return (
    <div className="PlayerTableNew">
      <div className="CardsArea">
        <div className="NertzPileArea">
          <NertzPileArea
            playerPos={playerPos}
            playerUuid={playerUuid}
            playerName={playerName}
            playerActive={playerActive}
            nertzPile={nertzPile}
            setNertzPile={setNertzPile}
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
            solitaireXPos={solitaireXPos}
            solitaireYPos={solitaireYPos}
            setSolitaireXPos={setSolitaireXPos}
            setSolitaireYPos={setSolitaireYPos}
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
            solitaireWorkPile={solitaireWork1Pile}
            setSolitaireWorkPile={setSolitaireWork1Pile}
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
            solitaireWorkPile={solitaireWork2Pile}
            setSolitaireWorkPile={setSolitaireWork2Pile}
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
            solitaireWorkPile={solitaireWork3Pile}
            setSolitaireWorkPile={setSolitaireWork3Pile}
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
            solitaireWorkPile={solitaireWork4Pile}
            setSolitaireWorkPile={setSolitaireWork4Pile}
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
