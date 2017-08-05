import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import persistState from 'redux-localstorage';

import '../styles/scss/main.scss';

import reducers from './reducers';
import HeaderComponent from './components/header';

const persistedState =
    localStorage.getItem('redux') ? JSON.parse(localStorage.getItem('redux')) : {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(persistState());
// const enhancer = compose(persistState());
const store = createStore(reducers, persistedState, enhancer);

const render = App => {
    ReactDOM.render(
        <AppContainer>
            <BrowserRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
            </BrowserRouter>
        </AppContainer>
        , document.querySelector('.container'));
};

render(HeaderComponent);

if (module.hot) {
    module.hot.accept('./components/header', () => render(HeaderComponent));
    module.hot.accept('./reducers', () => store.replaceReducer(reducers));
}