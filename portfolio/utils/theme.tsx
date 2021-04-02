import { Theme } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { grey, lightBlue, blue } from "@material-ui/core/colors";


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
        main: grey[50],
      },
      secondary: {
        main: lightBlue[300],
      },
      background: {
        default: '#ffffff',
        paper: '#ffffff',
      },
      text: {
        secondary: '#a3a3a3'
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
        main: "#434857",
        contrastText: '#fff'
      },
      secondary: {
        main: blue[600],
      },
      background: {
        default: "#1c202b",
        paper: "#1c202b",
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
