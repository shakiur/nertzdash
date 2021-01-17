import './PlayerTable.scss'

import React from "react";
import Draggable from "react-draggable";
import PropTypes from "prop-types";

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
          <div className="CardHolder">
          </div>
        </div>
        <div className="SolitaireArea">
          <div className="CardHolder">
          </div>
        </div>
        <div className="SolitaireArea">
          <div className="CardHolder">
          </div>
        </div>
        <div className="SolitaireArea">
          <div className="CardHolder">
          </div>
        </div>
      </div>
    )
  }
}
