import NightsActions from './contexts/NightsActions.jsx';
import Players from './contexts/Players.jsx';
import DayNumber from './contexts/DayNumber.jsx';
import theme from './MUI-Theme.js';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

export default function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <NightsActions>
        <DayNumber>
          <Players>
            <BrowserRouter>{children}</BrowserRouter>
          </Players>
        </DayNumber>
      </NightsActions>
    </ThemeProvider>
  );
}
