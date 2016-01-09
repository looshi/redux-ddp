import React from 'react';

class PlayerItem extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.saveIcon = this.saveIcon.bind(this); // do i have to bind this ?
  }

  handleClick() {
    var playerId = this.props.player._id;
    var playerName = this.props.player.name;
    store.dispatch(Actions.selectPlayer(playerId, playerName));
  }

  getClassName() {
    var selectedId = this.props.selectedPlayerId;
    var playerId = this.props.player._id;
    return (selectedId === playerId) ? 'player selected' : 'player';
  }

  statusClassName() {
    let status = this.props.player.saveStatus;
    if(!status){
      return 'status';
    }
    return ((status === 'ok')||(status === 'pending')) ? 'status ok' : 'status error';
  }

  saveIcon() {
    let status = this.props.player.saveStatus || '';

    if (!_.isEmpty(this.props.player.transactions)) {
      let transactionCount = this.props.player.transactions.length;
      return (
        <span>
          <span className={this.statusClassName()}>Saving({transactionCount}) {status}</span>
        </span>
      )
    } else {
      return (
        <span className={this.statusClassName()}>
          <span className='saveIconSaved'>Saving(0) {status}</span>
        </span>
      )
    }
  }

  render() {
    return (
      <li
        className={ this.getClassName() }
        onClick={ this.handleClick } >
        <span className="name">{ this.props.player.name } </span>
        { this.saveIcon() }
        <span className="score">{ this.props.player.score }</span>
      </li>
    );
  }
}

// Make it global.
this.PlayerItem = PlayerItem;
