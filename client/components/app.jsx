import React from 'react';

class App extends React.Component {

  resetPrompt() {
    if (_.isEmpty(this.props.players)) {
      console.log(this.props);
      return (
        <div className="subtitle">Click Reset Players to generate player data.</div>
      )
    }
  }

  render() {

    return (
      <div className="outer">
        <div className="logo"></div>
        <h1 className="title">Leaderboard</h1>
        <ResetPlayers/>
        {this.resetPrompt()}
        <div>
          <PlayerList
            players = {this.props.players}
            selectedId = {this.props.selectedId} />
        </div>
        <SelectPlayer { ...this.props } />
      </div>
    );
  }
}

App.propTypes = {
  players: React.PropTypes.object,
  selectedId: React.PropTypes.string,
  selectedName: React.PropTypes.string,
  errorMessage: React.PropTypes.string
}

this.App = App;
