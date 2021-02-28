import React from "react"

const PlayerGameArea = ({
  playerPos,
  playerUuid,
  playerActive,
  playerName,
  setPlayerName,
  setPlayerActive,
  allPlayers,
  dealCards,
  solitaireDeck,
  solitairePile,
  solitaireLeftoverPile,
  setSolitaireDeck,
  setSolitairePile,
  setSolitaireLeftoverPile,
  setBroadcastPlayerUuid
}) => {

  function PlayerGameControl() {
    if(playerActive) {
      return (
        <ActivePlayerDisplay />
      )
    } else {
      return (
        <SelectPlayerDisplay />
      )
    }
  }

  function ActivePlayerDisplay() {
    return (
      <div className="ActivePlayerDisplay">
        <div className="PlayerLabel">
          <strong>Player:</strong>
        </div>
        <div className="PlayerName">
          {playerName}
        </div>
        <div className="ScoreLabel">
          <strong>Score:</strong>
        </div>
        <div className="PlayerScore">
          -26
        </div>
      </div>
    )
  }

  function SelectPlayerDisplay() {
    return (
      <div className="SelectPlayerDisplay">
        <select
          value={playerName}
          onChange={(event) => handlePlayerSelectChange(event)}
          className="PlayerSelect"
        >
          <option key={0} value=''>Pick Player</option>
          {
            allPlayers.map((player) =>
              <option key={playerPos+player.id} value={player.name}>
                {player.name}
              </option>
            )
          }
        </select>
        <button
          disabled={playerName == ""}
          onClick={() => handleDealCards()}
          className="DealCardsButton"
        >
          Deal
        </button>
      </div>
    )
  }

  function handlePlayerSelectChange(event) {
    const selectedName = event.target.value
    setPlayerName(selectedName)
  }

  function handleDealCards() {
    setPlayerActive(true)
  }

  return (
    <div className="PlayerGameArea">
      <PlayerGameControl />
    </div>
  )
}

export default PlayerGameArea
