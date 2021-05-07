import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import LandingPage from './components/LandingPage';

function App() {
  let theme = createMuiTheme({
    palette: {
      secondary: {
        main:'#FFFFFF'
      }
    },
    typography: {
      h1: {
        fontSize:'1.5rem'
      },
      body1:{
        fontSize:'0.875rem'
      },
      body2:{
        fontSize:'0.875rem'
      },
      subtitle1:{
        fontSize: '0.75rem'
      }
    },
    overrides: {
      MuiTableRow: {
        root: {
          "&:last-child td": {
            borderBottom: 0
          }
        }
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <LandingPage />
    </ThemeProvider>
  );
}

export default App;