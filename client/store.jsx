import React from 'react';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

const rootReducer = combineReducers({
  userInterface: Reducers.userInterface,
  players: Reducers.players,
});

// Create and configure the Redux Dev tool component.
// https://github.com/gaearon/redux-devtools
DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-q'>
    <LogMonitor theme='solarized'/>
  </DockMonitor>
);

const finalCreateStore = compose(
  // Middleware you want to use in development would be added here.
  // applyMiddleware(example),
  // Required! Enable Redux DevTools with the monitors you chose:
  DevTools.instrument()
)(createStore);


Store = finalCreateStore(rootReducer);
