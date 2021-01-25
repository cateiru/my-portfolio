import Header from './Header'
import Footer from './Footer'
import * as React from 'react'
import { useCookies } from 'react-cookie'
import CssBaseline from '@material-ui/core/CssBaseline'
import selectTheme from './Theme'
import { ThemeProvider } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

interface Props {
  titleName: string
  children: React.ReactNode
}

export default function Page(props: Props) {
  const [cookies, setCookie, removeCookie] = useCookies(['isDark'])
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', {noSsr: true})

  React.useEffect(() => {
    if(typeof cookies.isDark === 'undefined'){
      const defaultTheme = prefersDarkMode ? 'dark' : 'light'
      setCookie('isDark', defaultTheme, { path: '/' , sameSite: 'strict' })
    }
  }, [prefersDarkMode])

  const theme = selectTheme(cookies.isDark)

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header titleName={props.titleName}/>
          {props.children}
        <Footer />
      </ThemeProvider>
    </div>
  )
}
