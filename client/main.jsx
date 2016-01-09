import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

Meteor.startup(function() {
  window.addEventListener('DOMContentLoaded', () => {
    let root = document.createElement('root');
    document.body.appendChild(root);

    ReactDOM.render(
      <Provider store={store}>
        <div>
          <AppContainer />
          <DevTools/>
        </div>
      </Provider>
      ,
      root
    );
  });
});
