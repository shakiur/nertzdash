import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Card from "../../components/Card/Card"
import CardHolder from "../../components/CardHolder/CardHolder"
import SolitaireDeckArea from "../../components/SolitaireDeckArea/SolitaireDeckArea"
import SolitairePileArea from "../../components/SolitairePileArea/SolitairePileArea"
import NertzPileArea from "../../components/NertzPileArea/NertzPileArea"

const PlayerTableNew = ({
  playerPos,
  playerUuid,
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
  function broadcastPlayerSolitaire(playerPos, playerUuid, solitaireDeck, solitairePile, solitaireLeftoverPile) {
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

  useEffect(() => {
    if(playerUuid == broadcastPlayerUuid) {
      broadcastPlayerSolitaire(
        playerPos,
        playerUuid,
        solitaireDeck,
        solitairePile,
        solitaireLeftoverPile
      );
    }
  }, [solitairePile])

  useEffect(() => {
    if(playerUuid == broadcastPlayerUuid) {
      broadcastPlayerSolitaireXYPos(
        playerPos,
        playerUuid,
        solitaireXPos,
        solitaireYPos
      )
    }
  }, [solitaireXPos, solitaireYPos])

  return (
    <div className="PlayerTableNew">
      <div className="NertzPileArea">
        <NertzPileArea
        />
      </div>
      <div className="SolitaireDeckArea">
        <SolitaireDeckArea
          playerPos={playerPos}
          playerUuid={playerUuid}
          broadcastTime={broadcastTime}
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
  )
}

export default PlayerTableNew;
