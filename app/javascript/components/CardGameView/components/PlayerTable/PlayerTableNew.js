import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Card from "../../components/Card/Card"
import CardHolder from "../../components/CardHolder/CardHolder"
import SolitaireDeckArea from "../../components/SolitaireDeckArea/SolitaireDeckArea"
import SolitairePileArea from "../../components/SolitairePileArea/SolitairePileArea"

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
  broadcastPlayerSolitaire,
  broadcastPlayerSolitaireXYPos
}) => {
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
