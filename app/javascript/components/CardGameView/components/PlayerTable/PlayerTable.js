import React from "react";
import PropTypes from "prop-types";
import Card from "../../components/Card/Card"
import CardHolder from "../../components/CardHolder/CardHolder"

export default class PlayerTable extends React.Component {
  static propTypes = {
    playerPos: PropTypes.number.isRequired,
    playerUuid: PropTypes.string.isRequired
  }

  render() {
    const { playerPos, playerUuid } = this.props;

    return (
      <div className="PlayerTable">
        <div className="CardDeckArea">
          <Card
            playerPos={playerPos}
            playerUuid={playerUuid}
          />
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
