import React from "react";
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
  leftoverSolitairePile,
  flipSolitaireCards,
  broadcastPlayerSolitaire,
  setBroadcastPlayerUuid
}) => {
  return (
    <div className="PlayerTableNew">
      <div className="SolitaireDeckArea">
        <SolitaireDeckArea
          playerPos={playerPos}
          playerUuid={playerUuid}
          broadcastTime={broadcastTime}
          solitaireDeck={solitaireDeck}
          solitairePile={solitairePile}
          leftoverSolitairePile={leftoverSolitairePile}
          flipSolitaireCards={flipSolitaireCards}
          broadcastPlayerSolitaire={broadcastPlayerSolitaire}
          setBroadcastPlayerUuid={setBroadcastPlayerUuid}

        />
        <SolitairePileArea
          playerPos={playerPos}
          playerUuid={playerUuid}
          solitairePile={solitairePile}
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
