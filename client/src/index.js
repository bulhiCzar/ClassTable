import ReactDOM from 'react-dom';
import React from 'react';
import {compose, createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {rootReducer} from "./redux/rootReducer";
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import thunk from "redux-thunk";

const store = createStore(rootReducer, compose(
    applyMiddleware(
        thunk
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
    ,
    document.getElementById('root')
)

reportWebVitals();
