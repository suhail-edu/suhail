import React from 'react';
import { createRoot } from 'react-dom/client';
// Global styles first so component stylesheets (imported through App) cascade after them.
import './styles/tokens.css';
import './styles/base.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// The app (and the intro overlay, when it applies) is now mounted: drop the static boot screen
// on the next frame so the hand-off is seamless.
requestAnimationFrame(() => document.getElementById('boot')?.remove());
