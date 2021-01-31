/**
 * this code from material-ui sample code page 'https://github.com/mui-org/material-ui/tree/master/examples/nextjs
 */
import PropTypes from 'prop-types';
import PageHead from '../components/PageHead'
import { CookiesProvider } from 'react-cookie'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import * as React from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useCookies } from 'react-cookie'
import selectTheme from '../components/Theme'
import { ThemeProvider } from '@material-ui/core/styles'
import { GAToken, pageview, event} from '../utils/ga'



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflow: 'hidden',
    }
  })
)

function setTheme(prefersDarkMode: boolean, cookieTheme: string) {
  if(cookieTheme === 'undefined'){
    return prefersDarkMode? 'dark' : 'light'
  }else{
    return cookieTheme
  }
}

export default function App({Component, pageProps}) {
  const classes = useStyles()
  const [cookies, setCookie, removeCookie] = useCookies(['isTheme'])
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', {noSsr: true})
  const [isTheme, setIsTheme] = React.useState(setTheme(prefersDarkMode, cookies.isTheme))

  const theme = selectTheme(isTheme as 'dark' | 'light')

  // cookieが空のときに新しく値を設定する
  React.useEffect(() => {
    if(typeof cookies.isTheme === 'undefined'){
      const defaultTheme = prefersDarkMode ? 'dark' : 'light'
      setIsTheme(defaultTheme)
      setCookie('isTheme', defaultTheme, { path: '/' , sameSite: 'strict' })
    }
  }, [prefersDarkMode])

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, [])

  const router = useRouter()
  React.useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
  <div className={classes.root}>
    <CookiesProvider>
    <ThemeProvider theme={theme}>
        <PageHead />
        <Component {...pageProps} setTheme={setIsTheme} isTheme={isTheme} />
        </ThemeProvider>
    </CookiesProvider>
  </div>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}
