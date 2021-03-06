import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom";
import {App} from "./app/App";
import "./default-colors.scss"
import "./app/common/tables/tables-styles.scss"
import "./utils.css"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

/**
 *  <React.StrictMode> рендерит часть компонентов дважды в dev режиме для поиска ошибок, поэтому если видишь двойной запрос/etc - первый на проверку это StrictMode
 **/
root.render(
    <Router>
        <App/>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
