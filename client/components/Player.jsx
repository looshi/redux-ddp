import React from 'react';

class PlayerItem extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    var playerId = this.props.player._id;
    var playerName = this.props.player.name;
    Store.dispatch(Actions.selectPlayer(playerId, playerName));
  }

  getClassName() {
    var selectedId = this.props.selectedPlayerId;
    var playerId = this.props.player._id;
    return (selectedId === playerId) ? 'player selected' : 'player';
  }

  render() {
    return (
      <li
        className={ this.getClassName() }
        onClick={ this.handleClick } >
        <span className="name">{ this.props.player.name } </span>
        <span className="score">{ this.props.player.score }</span>
      </li>
    );
  }
}

// Make it global.
this.PlayerItem = PlayerItem;
