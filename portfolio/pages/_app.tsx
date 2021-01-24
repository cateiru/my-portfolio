/**
 * this code from material-ui sample code page 'https://github.com/mui-org/material-ui/tree/master/examples/nextjs
 */
import '../styles/globals.css'
import PropTypes from 'prop-types';
import PageHead from '../components/PageHead'
import { CookiesProvider } from 'react-cookie';
import * as React from 'react'

export default function App({Component, pageProps}) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
  <React.Fragment>
    <CookiesProvider>
      <PageHead />
      <Component {...pageProps} />
    </CookiesProvider>
  </React.Fragment>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}
