/**
 * @fileoverview Entry point for the React application.
 * This file initializes the React application by rendering the root component (App)
 * into the DOM element with the ID 'app'. It also imports global styles.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
