import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import main from './reducers/photoFilter'
import { createStore } from 'redux'
import GeneratorForm from './generatorForm'
import {Provide} from './FilterContext'

// const store = createStore(main,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
    <App />
    , document.getElementById('root')
);
registerServiceWorker();
