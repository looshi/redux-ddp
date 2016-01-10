import React from 'react';

class ResetPlayers extends React.Component {

  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    Store.dispatch(Actions.resetPlayers());
  }

  render() {
    return (
      <div className="details">
        <button className="inc reset" onClick={this.handleClick}>
          Reset Player Data
        </button>
      </div>
    );
  }
};

this.ResetPlayers = ResetPlayers;