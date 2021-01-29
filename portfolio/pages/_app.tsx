/**
 * this code from material-ui sample code page 'https://github.com/mui-org/material-ui/tree/master/examples/nextjs
 */
import PropTypes from 'prop-types';
import PageHead from '../components/PageHead'
import { CookiesProvider } from 'react-cookie'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import * as React from 'react'
import ReactGA from 'react-ga'


function initGA(token) {
  ReactGA.initialize(token)
}

function logPageView() {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}


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
  const GAToken = process.env.NEXT_PUBLIC_GA_TOKEN

  React.useEffect(() => {
    initGA(GAToken)
    // `routeChangeComplete` won't run for the first page load unless the query string is
    // hydrated later on, so here we log a page view if this is the first render and
    // there's no query string
    if (!router.asPath.includes('?')) {
      logPageView()
    }

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, [])

  React.useEffect(() => {
    // Listen for page changes after a navigation or when the query changes
    router.events.on('routeChangeComplete', logPageView)
    return () => {
      router.events.off('routeChangeComplete', logPageView)
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
