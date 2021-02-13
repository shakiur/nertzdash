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

  function flipThreeSolitaireCards() {
    moveSolitairePileToLeftoverPile()
    resetSolitaireDeckIfEmpty()
    flipThreeCardsFromSolitaireDeck()
  }

  function moveSolitairePileToLeftoverPile() {
    if(solitairePile.length > 0) {
      setSolitaireLeftoverPile(solitaireLeftoverPile => [...solitaireLeftoverPile, ...solitairePile.reverse()])
      setSolitairePile([])
    }
  }

  function resetSolitaireDeckIfEmpty() {
    if(solitairePile.length == 0 && solitaireDeck.length == 0) {
      setSolitaireDeck(solitaireLeftoverPile)
      setSolitaireLeftoverPile([])
    }
  }

  function flipThreeCardsFromSolitaireDeck() {
    const numCardsToFlip = Math.min(solitaireDeck.length, 3)

    for(let flipCount = 0; flipCount < numCardsToFlip; flipCount++) {
      let cardFlipped = solitaireDeck.shift()

      setSolitaireDeck(solitaireDeck.filter(card => cardFlipped['id'] !== card['id']))
      setSolitairePile(solitairePile => [cardFlipped, ...solitairePile])
    }
  }

  return (
    <div className="PlayerGameArea">
    </div>
  )
}

export default PlayerGameArea
