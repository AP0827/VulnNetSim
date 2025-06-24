import { createTheme } from '@mui/material/styles';

export const matrixTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2E7D32', // Forest green
      light: '#4CAF50',
      dark: '#1B5E20',
    },
    secondary: {
      main: '#2E7D32',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
    },
    text: {
      primary: '#2E7D32',
      secondary: '#4CAF50',
    },
  },
  typography: {
    fontFamily: '"Courier New", monospace',
    h6: {
      fontWeight: 600,
      letterSpacing: '0.05em',
    },
    body1: {
      letterSpacing: '0.02em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: 'none',
          fontWeight: 600,
          letterSpacing: '0.05em',
          border: '1px solid #2E7D32',
          '&:hover': {
            backgroundColor: 'rgba(46, 125, 50, 0.1)',
            border: '1px solid #4CAF50',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '&:before': {
            borderColor: '#2E7D32',
          },
          '&:after': {
            borderColor: '#2E7D32',
          },
        },
        icon: {
          color: '#2E7D32',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: '#2E7D32',
          },
          '&:hover fieldset': {
            borderColor: '#4CAF50',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#2E7D32',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid #2E7D32',
        },
      },
    },
  },
}); 