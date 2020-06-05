import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux'
import App from './components/App.js';
import reducers from './reducers/reducers'
export default function init() {

  const rootElement = document.getElementById('root');
  const store = createStore(reducers, {});
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
  // render(<App/>, document.getElementById('root'));
}