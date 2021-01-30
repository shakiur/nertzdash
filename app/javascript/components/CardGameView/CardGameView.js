import React, { useState } from "react";
import PropTypes from "prop-types";
import PlayerTable from "./components/PlayerTable/PlayerTable"
import CenterTable from "./components/CenterTable/CenterTable"

const playerUuid = Math.random().toString(36).substring(7);

function CardGameView() {
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

  return (
    <section className="CardGameView">
      <section className="TopRow">
        <PlayerTable
          playerPos={1}
          playerUuid={playerUuid}
          xPos={player1XPos}
          yPos={player1YPos}
          setXPos={setPlayer1XPos}
          setYPos={setPlayer1YPos}
        />
        <PlayerTable
          playerPos={2}
          playerUuid={playerUuid}
          xPos={player2XPos}
          yPos={player2YPos}
          setXPos={setPlayer2XPos}
          setYPos={setPlayer2YPos}
        />
      </section>

      <section className="MiddleRow">
        <PlayerTable
          playerPos={3}
          playerUuid={playerUuid}
          xPos={player3XPos}
          yPos={player3YPos}
          setXPos={setPlayer3XPos}
          setYPos={setPlayer3YPos}
        />
        <CenterTable />
        <PlayerTable
          playerPos={4}
          playerUuid={playerUuid}
          xPos={player4XPos}
          yPos={player4YPos}
          setXPos={setPlayer4XPos}
          setYPos={setPlayer4YPos}
        />
      </section>

      <section className="BottomRow">
        <PlayerTable
          playerPos={5}
          playerUuid={playerUuid}
          xPos={player5XPos}
          yPos={player5YPos}
          setXPos={setPlayer5XPos}
          setYPos={setPlayer5YPos}
        />
        <PlayerTable
          playerPos={6}
          playerUuid={playerUuid}
          xPos={player6XPos}
          yPos={player6YPos}
          setXPos={setPlayer6XPos}
          setYPos={setPlayer4YPos}
        />
      </section>
    </section>
  );
}

export default CardGameView
