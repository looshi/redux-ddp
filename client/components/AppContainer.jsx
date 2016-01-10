import React from 'react';
import {connect} from 'react-redux';

class AppContainer extends React.Component {
  componentWillUnmount() {
  }

  render() {
    //debugger // checkout this.props with debugger!
    return (<App { ...this.props } />);
  }
}

// choose what state we send to comp. above and it's children, in
// this app we're sending everything at once, we're also splitting
// it out into three properties to match previous state shape, you
// could easily just return `state` for this small app

function mapStateToProps(state) {
  return {
    players: state.players,
    selectedId: state.userInterface.selectedId,
    selectedPlayerName: state.userInterface.selectedPlayerName,
    statusMessage: state.userInterface.statusMessage
  };
}

this.AppContainer = connect(mapStateToProps)(AppContainer);
