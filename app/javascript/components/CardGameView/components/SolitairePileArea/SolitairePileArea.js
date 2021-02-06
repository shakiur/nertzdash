import React from "react"
import Draggable from "react-draggable";

const SolitairePileArea = ({ playerPos, playerUuid, solitairePile }) => {
  function displayNumSuit(card) {
    if(card) {
      return `${card['value']}${card['suit']}`
    }
  }

  function displaySuit(card) {
    if(card) {
      return card['suit']
    }
  }

  function displaySuitNum(card) {
    if(card) {
      return `${card['suit']}${card['value']}`
    }
  }

  function cardColor(card) {
    if(card) {
      return card['color']
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

export default SolitairePileArea
