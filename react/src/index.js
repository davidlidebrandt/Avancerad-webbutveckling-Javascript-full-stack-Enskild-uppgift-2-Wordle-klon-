import React from "react";
import ReactDOM from "react-dom";
import * as ReactDOMClient from 'react-dom/client';
import App from "./App";
import "./scss/App.scss";

const el = document.getElementById("app");
let root = ReactDOMClient.createRoot(el);
root.render(<App></App>);
