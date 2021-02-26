import React, { useState, useEffect } from "react";

const CenterCard = ({
  centerPile
}) => {
  function cardBorderStyle(card) {
    if(card) {
      return 'solidLineCard'
    } else {
      return 'dashedLineCard'
    }
  }

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
    <div className={`centerCard ${cardBorderStyle(centerPile[0])}`}>
      <div className={`topNumSuit ${cardColor(centerPile[0])}`}>
        {displayNumSuit(centerPile[0])}
      </div>
      <div className={`middleSuit ${cardColor(centerPile[0])}`}>
        {displaySuit(centerPile[0])}
      </div>
      <div className={`bottomNumSuit ${cardColor(centerPile[0])}`}>
        {displaySuitNum(centerPile[0])}
      </div>
    </div>
  )
}

export default CenterCard
