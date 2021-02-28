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

  function handleCardDeal() {
    if(playerActive) {
      flipThreeSolitaireCards()
    } else {
      setPlayerActive(true)
      dealCards()
    }

    setBroadcastPlayerUuid(playerUuid)
  }

  function PlayerGameControl() {
    if(playerActive) {
      return (
        <SelectPlayerDisplay />
      )
    } else {
      return (
        <SelectPlayerDisplay />
      )
    }
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
  }

  return (
    <div className="PlayerGameArea">
      <PlayerGameControl />
    </div>
  )
}

export default PlayerGameArea
