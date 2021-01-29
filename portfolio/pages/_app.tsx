/**
 * this code from material-ui sample code page 'https://github.com/mui-org/material-ui/tree/master/examples/nextjs
 */
import PropTypes from 'prop-types';
import PageHead from '../components/PageHead'
import { CookiesProvider } from 'react-cookie'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import * as React from 'react'
import * as gtag from '../utils/gtag'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflow: 'hidden',
    }
  })
)

export default function App({Component, pageProps}) {
  const classes = useStyles()
  const router = useRouter()

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, [])

  React.useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
  <div className={classes.root}>
    <CookiesProvider>
        <PageHead />
        <Component {...pageProps} />
    </CookiesProvider>
  </div>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}
