import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CardHolder from "../../components/CardHolder/CardHolder"
import CenterCard from "../../components/CenterCard/CenterCard"

const CenterTable = ({
  centerPile1,
  setCenterPile1
}) => {
  function cardBorderStyle(card) {
    if(card) {
      return 'solidLineCard'
    } else {
      return 'dashedLineCard'
    }
  }

  return (
    <div className="CenterTable">
      <div className="CardHolderVerticalArea">
        <CenterCard centerPile={centerPile1} />
        <CardHolder/>
        <CardHolder/>
      </div>
      <div className="CardHolderVerticalArea">
        <CardHolder/>
        <CardHolder/>
        <CardHolder/>
      </div>
      <div className="CardHolderVerticalArea">
        <CardHolder/>
        <CardHolder/>
        <CardHolder/>
      </div>
      <div className="CardHolderVerticalArea">
        <CardHolder/>
        <CardHolder/>
        <CardHolder/>
      </div>
      <div className="CardHolderVerticalArea">
        <CardHolder/>
        <CardHolder/>
        <CardHolder/>
      </div>
      <div className="CardHolderVerticalArea">
        <CardHolder/>
        <CardHolder/>
        <CardHolder/>
      </div>
      <div className="CardHolderVerticalArea">
        <CardHolder/>
        <CardHolder/>
        <CardHolder/>
      </div>
      <div className="CardHolderVerticalArea">
        <CardHolder/>
        <CardHolder/>
        <CardHolder/>
      </div>
    </div>
  )
}

export default CenterTable
