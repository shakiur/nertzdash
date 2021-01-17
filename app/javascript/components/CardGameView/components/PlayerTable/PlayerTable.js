import './PlayerTable.scss'

import React from "react";
import Draggable from "react-draggable";
import PropTypes from "prop-types";
import CardHolder from "../../components/CardHolder/CardHolder"

export default class PlayerTable extends React.Component {
  render() {
    return (
      <div className="PlayerTable">
        <div className="CardDeckArea">
          <Draggable>
            <div className="Card">
            </div>
          </Draggable>
        </div>
        <div className="CardDisplayArea">
        </div>
        <div className="SolitaireArea">
          <CardHolder/>
        </div>
        <div className="SolitaireArea">
          <CardHolder/>
        </div>
        <div className="SolitaireArea">
          <CardHolder/>
        </div>
        <div className="SolitaireArea">
          <CardHolder/>
        </div>
      </div>
    )
  }
}
