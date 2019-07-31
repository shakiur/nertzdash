import React from "react";
import PropTypes from "prop-types";
import { Icon, Label } from 'semantic-ui-react';

class SelectPlayers extends React.Component {
  state = {
    players: [],
    selectedPlayers: [],
    test: false
  }
  componentDidMount() {
    fetch('/api/v1/players.json')
      .then((response) => { return response.json() })
      .then((data) => {
        this.setState({players: data})
      });

  }

  renderselectedPlayerLabels() {
    return this.state.selectedPlayers.map((player) => {
      return (
        <Label
          key={`selected-${player.id}`}
        >
          {player.name}
          <Icon name='delete' />
        </Label>
      )
    })
  }

  renderAllPlayerLabels() {
    return this.state.players.map((player) => {
      return (
        <Label
          key={player.id}
          onClick={() => this.addToSelectedPlayers(player)}
        >
          {player.name}
        </Label>
      )
    })
  }

  addToSelectedPlayers(player) {
    this.state.selectedPlayers.push(player)
    this.setState({selectedPlayers: this.state.selectedPlayers})
  }

  render () {
    return (
      <div id="SelectPlayers">
        <h1>Who's Playing?</h1>
        <section className="selected-players">
          {this.renderselectedPlayerLabels()}
        </section>
        <section className="all-players">
          {this.renderAllPlayerLabels()}
        </section>
      </div>
    );
  }
}

export default SelectPlayers
