import React from 'react';

class PlayerItem extends React.Component {

  constructor(props) {
    super(props);
  }

  onClick(element, event) {
    // Since the delete button is on top of the list button, both elements
    // will fire a click event, stopPropagation will prevent this.
    event.stopPropagation();
    if(element==='delete'){
      Store.dispatch(Actions.deletePlayer(this.props.player));
      return;
    }else if(element==='self'){
      Store.dispatch(Actions.selectPlayer(this.props.player));
    }
  }

  getClassName() {
    return this.props.isSelected ? 'player selected' : 'player';
  }

  render() {
    return (
      <li
        className={ this.getClassName() }
        onClick={ this.onClick.bind(this, 'self') }>
        <span className='name'>{ this.props.player.name }</span>
        <span className='score'>{ this.props.player.score }</span>
        <span className='score'>
          <button onClick={ this.onClick.bind(this, 'delete') }>Delete</button>
        </span>
      </li>
    );
  }
}

PlayerItem.propTypes = {
  isSelected: React.PropTypes.bool.isRequired,
  player: React.PropTypes.object.isRequired
}

// Make it global.
this.PlayerItem = PlayerItem;
