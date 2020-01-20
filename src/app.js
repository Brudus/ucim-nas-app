import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import { startSetWords } from './actions/words';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/style.scss';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

store.dispatch(startSetWords()).then(() => {
    ReactDOM.render(jsx, document.getElementById('app'));
})

