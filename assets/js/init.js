import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux'
import App from './components/App';
import reducers from './reducers';
import { getCurrentUser } from './api/user';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function init() {
  const rootElement = document.getElementById('root');
  const store = createStore(reducers, composeWithDevTools());

  getCurrentUser(store.dispatch.bind(store), (err) => console.error(err));
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
}