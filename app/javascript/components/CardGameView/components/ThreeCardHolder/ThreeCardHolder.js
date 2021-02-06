import React from "react";
import Draggable from "react-draggable";

const ThreeCardHolder = ({ playerPos, playerUuid, cardDeck, threeCardArea }) => {
  function displayNumSuit(card) {
    if(card) {
      const cardNum = card[1]
      const cardSuit = card[2]

      return `${cardNum}${cardSuit}`
    }
  }

  function displaySuit(card) {
    if(card) {
      const cardSuit = card[2]

      return cardSuit
    }
  }

  function displaySuitNum(card) {
    if(card) {
      const cardNum = card[1]
      const cardSuit = card[2]

      return `${cardSuit}${cardNum}`
    }
  }

  function cardColor(card) {
    if(card) {
      const cardColor = card[3]

      return cardColor
    }
  }

  return (
    <div className="ThreeCardHolder">
      <div className="topCardPreview">
        <div className={`topNumSuit ${cardColor(threeCardArea[2])}`}>
          {displayNumSuit(threeCardArea[2])}
        </div>
      </div>
      <div className="middleCardPreview">
        <div className={`topNumSuit ${cardColor(threeCardArea[1])}`}>
          {displayNumSuit(threeCardArea[1])}
        </div>
      </div>
      <Draggable
      >
        <div className="bottomCard">
          <div className={`topNumSuit ${cardColor(threeCardArea[0])}`}>
            {displayNumSuit(threeCardArea[0])}
          </div>
          <div className={`middleSuit ${cardColor(threeCardArea[0])}`}>
            {displaySuit(threeCardArea[0])}
          </div>
          <div className={`bottomNumSuit ${cardColor(threeCardArea[0])}`}>
            {displaySuitNum(threeCardArea[0])}
          </div>
        </div>
      </Draggable>
    </div>
  )
}

export default ThreeCardHolder
