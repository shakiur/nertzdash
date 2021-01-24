import React from "react";
import PropTypes from "prop-types";
import Card from "../../components/Card/Card"
import CardHolder from "../../components/CardHolder/CardHolder"

export default class PlayerTable extends React.Component {
  static propTypes = {
    playerPos: PropTypes.number.isRequired
  }

  render() {
    const { playerPos } = this.props;

    return (
      <div className="PlayerTable">
        <div className="CardDeckArea">
          <Card playerPos={playerPos} />
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
