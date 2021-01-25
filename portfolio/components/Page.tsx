import Header from './Header'
import Footer from './Footer'
import * as React from 'react'
import { useCookies } from 'react-cookie'
import CssBaseline from '@material-ui/core/CssBaseline'
import selectTheme from './Theme'
import { ThemeProvider } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

interface Props {
  titleName: string
  children: React.ReactNode
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      display: 'flex',
      flexFlow: 'column',
      minHeight: '100vh'
    },
    main: {
      flex: 1
    }
  })
)

export default function Page(props: Props) {
  const classes = useStyles()
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
    <div className={classes.body}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header titleName={props.titleName}/>
        <main className={classes.main}>
          {props.children}
        </main>
        <Footer />
      </ThemeProvider>
    </div>
  )
}
