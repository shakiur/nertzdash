import React from "react"

const PlayerGameArea = ({
  playerPos,
  playerUuid,
  playerActive,
  playerName,
  setPlayerName,
  setPlayerActive,
  allPlayers,
  dealCards
}) => {
  function PlayerGameDisplay() {
    return (
      <DealCardsButton />
    )
  }

  function DealCardsButton() {
    return (
      <button
        onClick={() => dealCards()}
        className="DealCardsButton"
      >
        Deal Cards
      </button>
    )
  }

  function ActivePlayerDisplay() {
    return (
      <div className="ActivePlayerName">
        <div className="PlayerLabel"><strong>Player:</strong></div>
        <div className="PlayerName">{playerName}</div>
      </div>
    )
  }

  function SelectPlayerDisplay() {
    return (
      <div className="SelectPlayerDisplay">
        <PlayerSelectDropDown />
        <SetPlayerButton />
      </div>
    )
  }

  function PlayerSelectDropDown() {
    return (
      <select
        value={playerName}
        onChange={(event) => handlePlayerSelectChange(event)}
        className="PlayerSelect"
      >
        <option key={0} value=''></option>
        {
          allPlayers.map((player) =>
            <option key={playerPos+player.id} value={player.name}>
              {player.name}
            </option>
          )
        }
      </select>
    )
  }


  function handlePlayerSelectChange(event) {
    const selectedName = event.target.value
    setPlayerName(selectedName)
  }

  function handleSetPlayer() {
    if(playerName == "") {
      setPlayerActive(false)
    } else {
      setPlayerActive(true)
    }
  }

  return (
    <div className="PlayerGameArea">
      <PlayerGameDisplay />
    </div>
  )
}

export default PlayerGameArea
