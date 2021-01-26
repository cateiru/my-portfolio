import { Theme } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { deepOrange, grey, lightBlue, blue } from "@material-ui/core/colors";


export default function selectTheme(theme: 'dark'|'light'): Theme {
  if(theme === 'dark'){
    return darkTheme()
  }

  return lightTheme()
}

function lightTheme(): Theme {
  return createMuiTheme({
    palette: {
      type: "light",
      primary: {
        main: grey[100],
      },
      secondary: {
        main: lightBlue[300],
      },
      background: {
        default: grey[50],
        paper: grey[50],
      },
      text: {
        secondary: '#bababa'
      }
    },
    typography: {
      fontFamily: "'Noto Sans JP', sans-serif",
    }
  })
}

function darkTheme(): Theme {
  return createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: grey[800],
        contrastText: '#fff'
      },
      secondary: {
        main: blue[600],
      },
      background: {
        default: grey[900],
        paper: grey[900],
      },
      text: {
        secondary: '#737373'
      }
    },
    typography: {
      fontFamily: "'Noto Sans JP', sans-serif",
    }
  })
}
