import React from "react";
import PropTypes from "prop-types";
import { Button } from 'semantic-ui-react';
import SelectPlayers from "../SelectPlayers/SelectPlayers";

class ExperimentalView extends React.Component {
  state = {
    showSelectPlayers: false
  }

  showSelectPlayers() {
    this.setState({showSelectPlayers: true});
  }

  render () {
    return (
      <div id="ExperimentalView">
        {!this.state.showSelectPlayers && <Button onClick={() => this.showSelectPlayers()}>Start Game</Button>}
        {this.state.showSelectPlayers && <SelectPlayers/>}
      </div>
    );
  }
}

export default ExperimentalView
