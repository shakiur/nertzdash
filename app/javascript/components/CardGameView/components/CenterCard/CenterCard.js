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

  function displayNum(card) {
    if(card) {
      return card['value']
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
      <div className={`leftHalfNum ${cardColor(centerPile[0])}`}>
        {displayNum(centerPile[0])}
      </div>
      <div className={`rightHalfSuit ${cardColor(centerPile[0])}`}>
        {displaySuit(centerPile[0])}
      </div>
    </div>
  )
}

export default CenterCard
