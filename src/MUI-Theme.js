import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {},
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: 0,
          background: '#0284c7',
          boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.2)',
          '&:hover': {
            background: 'rgba(14, 165, 233, 0.85)',
            boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.3)',
          },
        },
      },
      defaultProps: {
        variant: 'contained',
      },
    },
  },
});

export default theme;
