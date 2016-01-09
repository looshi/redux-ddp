import React from 'react';

class SelectPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    selectedId = this.props.selectedId;
    selectedPlayerName = this.props.selectedPlayerName;
    store.dispatch(Actions.updateScore(selectedId, selectedPlayerName));
  }

  render() {
    if (this.props.selectedPlayerName) {
      return (
        <div className="details">
          <div className="name">{this.props.selectedPlayerName}</div>
          <button className="inc" onClick={this.handleClick}>
            Add 5 points
          </button>
        </div>
      );
    }
    else {
      return (
        <div className="message">Click a player to select</div>
      );
    }
  }
};

SelectPlayer.propTypes = {
  selectedName: React.PropTypes.string,
  selectedId: React.PropTypes.string
}

this.SelectPlayer = SelectPlayer
