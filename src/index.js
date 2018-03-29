import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import 'assets/css/material-dashboard-react.css';

import Auth from 'auth';

import configStore from './configStore.js';
let { store, persistor } = configStore();

ReactDOM.render(
    <Provider store={ store }>
        <PersistGate loading={ null } persistor={ persistor }>
            <Auth />
        </PersistGate>
    </Provider>
, document.getElementById('root'));
