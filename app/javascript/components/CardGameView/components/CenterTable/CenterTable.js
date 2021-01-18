import './CenterTable.scss'

import React from "react";
import PropTypes from "prop-types";
import CardHolder from "../../components/CardHolder/CardHolder"

export default class CenterTable extends React.Component {
  render() {
    return (
      <div className="CenterTable">
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
        <div className="CardHolderVerticalArea">
          <CardHolder/>
          <CardHolder/>
          <CardHolder/>
        </div>
      </div>
    )
  }
}
