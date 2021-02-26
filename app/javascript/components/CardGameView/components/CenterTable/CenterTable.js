import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CardHolder from "../../components/CardHolder/CardHolder"
import CenterCard from "../../components/CenterCard/CenterCard"

const CenterTable = ({
  centerPile1,
  centerPile2,
  centerPile3,
  centerPile4,
  centerPile5,
  centerPile6,
  centerPile7,
  centerPile8,
  centerPile9,
  centerPile10,
  centerPile11,
  centerPile12,
  centerPile13,
  centerPile14,
  centerPile15,
  centerPile16,
  centerPile17,
  centerPile18,
  centerPile19,
  centerPile20,
  centerPile21,
  centerPile22,
  centerPile23,
  centerPile24
}) => {
  return (
    <div className="CenterTable">
      <div className="CardHolderVerticalArea">
        <CenterCard centerPile={centerPile1} />
        <CenterCard centerPile={centerPile9} />
        <CenterCard centerPile={centerPile17} />
      </div>
      <div className="CardHolderVerticalArea">
        <CenterCard centerPile={centerPile2} />
        <CenterCard centerPile={centerPile10} />
        <CenterCard centerPile={centerPile18} />
      </div>
      <div className="CardHolderVerticalArea">
        <CenterCard centerPile={centerPile3} />
        <CenterCard centerPile={centerPile11} />
        <CenterCard centerPile={centerPile19} />
      </div>
      <div className="CardHolderVerticalArea">
        <CenterCard centerPile={centerPile4} />
        <CenterCard centerPile={centerPile12} />
        <CenterCard centerPile={centerPile20} />
      </div>
      <div className="CardHolderVerticalArea">
        <CenterCard centerPile={centerPile5} />
        <CenterCard centerPile={centerPile13} />
        <CenterCard centerPile={centerPile21} />
      </div>
      <div className="CardHolderVerticalArea">
        <CenterCard centerPile={centerPile6} />
        <CenterCard centerPile={centerPile14} />
        <CenterCard centerPile={centerPile22} />
      </div>
      <div className="CardHolderVerticalArea">
        <CenterCard centerPile={centerPile7} />
        <CenterCard centerPile={centerPile15} />
        <CenterCard centerPile={centerPile23} />
      </div>
      <div className="CardHolderVerticalArea">
        <CenterCard centerPile={centerPile8} />
        <CenterCard centerPile={centerPile16} />
        <CenterCard centerPile={centerPile24} />
      </div>
    </div>
  )
}

export default CenterTable
