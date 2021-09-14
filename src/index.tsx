import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import setupAxios from './api/SetupAxios';
import App from './containers/App';

import './index.css';

setupAxios(axios);

ReactDOM.render(<App />, document.getElementById('root'));
