import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LegalAssistanceApp from "./ui_components/SideBar";

const colortheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1a237e',
    },
    secondary: {
      main: '#29b6f6',
    },
  },
  spacing: 12,
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 14,
  },
});


const App = () => {
  return (
      <ThemeProvider theme={colortheme}>
      <CssBaseline />
        <LegalAssistanceApp />
      </ThemeProvider>
  )
}

export default App;