import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class SelectPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    Store.dispatch(Actions.updateScore(this.props.selectedPlayer));
  }

  statusMessage() {
    let {code} = this.props.statusMessage;
    let className = code === 200 ? 'message ok' : 'message error';
    // This animation doesn't work at all, TODO : fix it.
    return (
      <ReactCSSTransitionGroup
        transitionName='message'
        transitionAppear={true}
        transitionAppearTimeout={2000}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}>
          <div className={className}>{this.props.statusMessage.text}</div>
      </ReactCSSTransitionGroup>
    )
  }

  render() {
    if (this.props.selectedPlayer._id) {
      return (
        <div className="details">
          <div className="name">{this.props.selectedPlayer.name}</div>
          <button className="inc" onClick={this.handleClick}>
            Add 5 points
          </button>
          { this.statusMessage() }
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
  selectedPlayer: React.PropTypes.object.isRequired
}

this.SelectPlayer = SelectPlayer
