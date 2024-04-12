import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App.jsx';

import theme from './MUI-Theme.js';
import Nights from './contexts/Nights.jsx';
import Players from './contexts/Players.jsx';
import DayNumber from './contexts/DayNumber.jsx';
import RemovedPlayers from './contexts/RemovedPlayers.jsx';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <RemovedPlayers>
      <DayNumber>
        <Nights>
          <Players>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Players>
        </Nights>
      </DayNumber>
    </RemovedPlayers>
  </ThemeProvider>
);
