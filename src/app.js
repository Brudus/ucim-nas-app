import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/style.scss';
import { addWord } from './actions/words';

const store = configureStore();

store.dispatch(addWord({ source: "Hallo", destination: "Zdravo", repeatAt: Date.now() }));
store.dispatch(addWord({ source: "Willkommen", destination: "Dobrodošli", repeatAt: Date.now() }));

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));