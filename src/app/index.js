import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import persistState from 'redux-localstorage';

import reducers from './reducers';
import HeaderComponent from './components/header';

const persistedState =
    localStorage.getItem('redux') ? JSON.parse(localStorage.getItem('redux')) : {};
const enhancer = compose(persistState());
const store = createStore(reducers, persistedState, enhancer);

const render = App => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <App/>
            </Provider>
        </AppContainer>
        , document.querySelector('.container'));
};

render(HeaderComponent);

if (module.hot) {
    module.hot.accept('./components/header', () => render(HeaderComponent));
}