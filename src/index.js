import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import './css/index.css';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render ( 
    
        // <StrictMode>
            <App />
        // </StrictMode>
  );
