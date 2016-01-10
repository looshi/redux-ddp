import React from 'react';

class PlayerItem extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleClick() {
    var playerId = this.props.player._id;
    var playerName = this.props.player.name;
    Store.dispatch(Actions.selectPlayer(playerId, playerName));
  }

  handleDelete() {
    var playerId = this.props.player._id;
    var playerName = this.props.player.name;
    Store.dispatch(Actions.deletePlayer(playerId, playerName));
  }

  getClassName() {
    var selectedId = this.props.selectedPlayerId;
    var playerId = this.props.player._id;
    return (selectedId === playerId) ? 'player selected' : 'player';
  }

  render() {
    return (
      <li className={ this.getClassName() } >
        <span className="name" onClick={ this.handleClick }>{ this.props.player.name } </span>
        <span className="score">{ this.props.player.score }</span>
        <button onClick={ this.handleDelete }>Delete</button>
      </li>
    );
  }
}

// Make it global.
this.PlayerItem = PlayerItem;
