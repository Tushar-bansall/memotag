import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'; // 👈 This is missing in your code
import App from './App.jsx';
import 'leaflet/dist/leaflet.css'; // 👈 Make sure to import this too!

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
