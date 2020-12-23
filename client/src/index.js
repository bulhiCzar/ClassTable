import ReactDOM from 'react-dom';
import React from 'react';
import thunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux"
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import reportWebVitals from './reportWebVitals';
import {rootReducer} from "./redux/rootReducer";
import App from './App';
import './index.css';



const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk),
    )
)


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
