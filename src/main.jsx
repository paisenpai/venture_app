/**
 * @fileoverview Entry point for the React application.
 * This file initializes the React application by rendering the root component (App)
 * into the DOM element with the ID 'root'. It also imports global styles.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Import global styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
