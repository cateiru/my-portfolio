/**
 * this code from material-ui sample code page 'https://github.com/mui-org/material-ui/tree/master/examples/nextjs
 */
import '../styles/globals.css'
import PropTypes from 'prop-types';
import PageHead from '../components/PageHead'
import { CookiesProvider } from 'react-cookie'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import * as React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflow: 'hidden',
    }
  })
)

export default function App({Component, pageProps}) {
  const classes = useStyles()
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

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
