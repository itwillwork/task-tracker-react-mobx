import React from 'react';
import {render} from 'react-dom';
import App from './components/templates/App/App';

import './main.css';
import "babel-polyfill";

render(<App />, document.getElementById('root'));