import React from "react";
import Draggable from "react-draggable";

const ThreeCardHolder = ({ playerPos, playerUuid, solitaireDeck, solitairePile }) => {
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
        <div className={`topNumSuit ${cardColor(solitairePile[2])}`}>
          {displayNumSuit(solitairePile[2])}
        </div>
      </div>
      <div className="middleCardPreview">
        <div className={`topNumSuit ${cardColor(solitairePile[1])}`}>
          {displayNumSuit(solitairePile[1])}
        </div>
      </div>
      <Draggable
      >
        <div className="bottomCard">
          <div className={`topNumSuit ${cardColor(solitairePile[0])}`}>
            {displayNumSuit(solitairePile[0])}
          </div>
          <div className={`middleSuit ${cardColor(solitairePile[0])}`}>
            {displaySuit(solitairePile[0])}
          </div>
          <div className={`bottomNumSuit ${cardColor(solitairePile[0])}`}>
            {displaySuitNum(solitairePile[0])}
          </div>
        </div>
      </Draggable>
    </div>
  )
}

export default ThreeCardHolder
