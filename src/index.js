import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './store/reducer';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = process.env.NODE_ENV === 'development' 
                        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
                        : null || compose;
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
));
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
