import React from "react"

const PlayerGameArea = ({
  playerPos,
  playerUuid,
  playerActive,
  playerName,
  playerScore,
  setPlayerName,
  setPlayerActive,
  setPlayerScore,
  deckColor,
  setDeckColor,
  allPlayers,
  setNertzPile,
  setSolitaireDeck,
  setSolitairePile,
  setSolitaireLeftoverPile,
  setSolitaireWork1Pile,
  setSolitaireWork2Pile,
  setSolitaireWork3Pile,
  setSolitaireWork4Pile,
  setBroadcastPlayerUuid,
  nertzWinner,
  nertzWinnerName,
  setNertzWinner,
  setNertzWinnerName
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
        <div className="PlayerAction">
          <button
            disabled={!playerActive}
            onClick={() => handleLeaveGame()}
            className="LeaveGameButton"
          >
            Quit
          </button>
          <button
            disabled={!playerActive}
            onClick={() => handleResetDeck()}
            className="ResetButton"
          >
            Reset
          </button>
        </div>
        <div className="PlayerDisplay">
          <div className="PlayerLabel">
            <strong>{nertzWinner && nertzWinnerName == playerName ? 'NERTZ!' : 'Player:'}</strong>
          </div>
          <div className="PlayerName">
            {formatPlayerName(playerName)}
          </div>
          <div className="ScoreLabel">
            <strong>Score:</strong>
          </div>
          <div className="PlayerScore">
            {playerScore}
          </div>
        </div>
      </div>
    )
  }

  function formatPlayerName(playerName) {
    if(playerName.length >= 9) {
      return `${playerName.substring(0,7)}..`
    } else {
      return playerName
    }
  }

  function NertzWinnerDisplay() {
    return (
      <div className="NertzWinnerDisplay">
        <div className="PlayerAction">
          <button
            disabled={playerName == ""}
            onClick={() => handleResetGame()}
            className="ResetGameButton"
          >
            Reset All
          </button>
        </div>
        <div className="PlayerDisplay">
          <div className="NertzWinnerLabel">
            <strong>NERTZ!</strong>
          </div>
          <div className="PlayerName">
            {playerName}
          </div>
          <div className="ScoreLabel">
            <strong>Score:</strong>
          </div>
          <div className="PlayerScore">
            {playerScore}
          </div>
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
        <select
          value={deckColor}
          onChange={(event) => handleDeckColorChange(event)}
          className="DeckColorSelect"
        >
          <option key={0} value=''>Pick Color</option>
          <option key={1} value='red'>Red</option>
          <option key={2} value='purple'>Purple</option>
          <option key={3} value='blue'>Blue</option>
          <option key={4} value='yellow'>Yellow</option>
          <option key={5} value='green'>Green</option>
          <option key={6} value='pink'>Pink</option>
        </select>
        <button
          disabled={playerName == "" || deckColor == ""}
          onClick={() => handleSit()}
          className="DealCardsButton"
        >
          Sit
        </button>
      </div>
    )
  }

  function handlePlayerSelectChange(event) {
    const selectedName = event.target.value
    setPlayerName(selectedName)
  }

  function handleDeckColorChange(event) {
    const selectedColor = event.target.value
    setDeckColor(selectedColor)
  }

  function handleLeaveGame() {
    const currentTime = new Date().getTime();

    fetch('/card_game/broadcast_player_all_data?' +
      'data_type=' + 'player_all_data' +
      '&player_pos=' + playerPos +
      '&player_uuid=' + playerUuid +
      '&player_active=' + 'false' +
      '&player_name=' + '' +
      '&player_score=' + '0' +
      '&player_deck_color=' + '' +
      '&nertz_pile=' + JSON.stringify([]) +
      '&solitaire_deck=' + JSON.stringify([]) +
      '&solitaire_pile=' + JSON.stringify([]) +
      '&leftover_solitaire_pile=' + JSON.stringify([]) +
      '&solitaire_work_1_pile=' + JSON.stringify([]) +
      '&solitaire_work_2_pile=' + JSON.stringify([]) +
      '&solitaire_work_3_pile=' + JSON.stringify([]) +
      '&solitaire_work_4_pile=' + JSON.stringify([]) +
      '&time=' + currentTime
    );

    setPlayerActive(false)
    setPlayerName('')
    setPlayerScore(0)
    setNertzPile([])
    setDeckColor('')
    setSolitaireDeck([])
    setSolitairePile([])
    setSolitaireLeftoverPile([])
    setSolitaireWork1Pile([])
    setSolitaireWork2Pile([])
    setSolitaireWork3Pile([])
    setSolitaireWork4Pile([])
  }

  function handleResetDeck() {
    let cardDeck = generateCardDeck()
    let shuffledCardDeck = shuffleCardDeck(cardDeck)
    let currentTime = new Date().getTime();

    fetch('/card_game/broadcast_player_all_data?' +
      'data_type=' + 'player_all_data' +
      '&player_pos=' + playerPos +
      '&player_uuid=' + playerUuid +
      '&player_active=' + 'true' +
      '&player_name=' + playerName +
      '&player_score=' + '0' +
      '&player_deck_color=' + deckColor +
      '&nertz_pile=' + JSON.stringify([]) +
      '&solitaire_deck=' + JSON.stringify(shuffledCardDeck) +
      '&solitaire_pile=' + JSON.stringify([]) +
      '&leftover_solitaire_pile=' + JSON.stringify([]) +
      '&solitaire_work_1_pile=' + JSON.stringify([]) +
      '&solitaire_work_2_pile=' + JSON.stringify([]) +
      '&solitaire_work_3_pile=' + JSON.stringify([]) +
      '&solitaire_work_4_pile=' + JSON.stringify([]) +
      '&time=' + currentTime
    );

    setPlayerScore(0)
    setNertzPile([])
    setSolitairePile([])
    setSolitaireLeftoverPile([])
    setSolitaireWork1Pile([])
    setSolitaireWork2Pile([])
    setSolitaireWork3Pile([])
    setSolitaireWork4Pile([])
    setSolitaireDeck(shuffledCardDeck)
    setPlayerScore(0)
  }

  function handleResetGame() {
    fetch('/card_game/broadcast_reset_player_game_data?' +
      'data_type=' + 'reset_player_game_data' +
      '&player_uuid=' + playerUuid
    )
  }

  function handleSit() {
    setBroadcastPlayerUuid(playerUuid)
    setPlayerActive(true)
    setPlayerScore(0)
    dealCards()
  }

  function dealCards() {
    let cardDeck = generateCardDeck()
    let shuffledCardDeck = shuffleCardDeck(cardDeck)

    setSolitaireDeck(shuffledCardDeck)

    /*
    let nertzPile = shuffledCardDeck.slice(0,13)

    let solitaireWorkPile1 = shuffledCardDeck.slice(13,14)
    let solitaireWorkPile2 = shuffledCardDeck.slice(14,15)
    let solitaireWorkPile3 = shuffledCardDeck.slice(15,16)
    let solitaireWorkPile4 = shuffledCardDeck.slice(16,17)

    let solitairePile = shuffledCardDeck.slice(17,20)
    let solitaireDeck = shuffledCardDeck.slice(20,52)

    setNertzPile(nertzPile)
    setSolitaireDeck(solitaireDeck)
    setSolitairePile(solitairePile)

    setSolitaireWork1Pile(solitaireWorkPile1)
    setSolitaireWork2Pile(solitaireWorkPile2)
    setSolitaireWork3Pile(solitaireWorkPile3)
    setSolitaireWork4Pile(solitaireWorkPile4)
    */
  }

  function generateCardDeck() {
    const cardValues = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
    const cardSuits = ['♥','♠','♦','♣']
    const cardDeck = []
    let cardId = 0

    for (const cardValue of cardValues) {
      for (const cardSuit of cardSuits) {
        let cardColor = cardSuit == '♥' || cardSuit == '♦' ? 'red' : 'black'
        let cardNumber = determineCardNumber(cardValue)

        let card = {
          id: cardId,
          value: cardValue,
          number: cardNumber,
          suit: cardSuit,
          color: cardColor,
          deckColor: deckColor
        }

        cardDeck.push(card)
        cardId += 1
      }
    }

    return cardDeck
  }

  function determineCardNumber(cardValue) {
    switch (cardValue) {
      case 'A':
        return 1
      case 'J':
        return 11
      case 'Q':
        return 12
      case 'K':
        return 13
      default:
        return parseInt(cardValue)
    }
  }

  function shuffleCardDeck(cardDeck) {
    for(let cardPos = cardDeck.length - 1; cardPos > 0; cardPos--){
      const randomPos = Math.floor(Math.random() * cardPos)
      const tempCard = cardDeck[cardPos]

      cardDeck[cardPos] = cardDeck[randomPos]
      cardDeck[randomPos] = tempCard
    }

    return cardDeck
  }

  return (
    <div className="PlayerGameArea">
      <PlayerGameControl />
    </div>
  )
}

export default PlayerGameArea
