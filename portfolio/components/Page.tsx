import Header from './Header'
import Footer from './Footer'
import * as React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import ThemeProps from '../utils/themeProps'


interface Props extends ThemeProps {
  titleName: string
  children: React.ReactNode
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      display: 'flex',
      flexFlow: 'column',
      minHeight: '150vh',
    },
    main: {
      flex: 1
    }
  })
)

export default function Page(props: Props) {
  const classes = useStyles()

  return (
    <div className={classes.body}>
        <CssBaseline />
        <Header titleName={props.titleName} setTheme={props.setTheme} isTheme={props.isTheme} />
        <main className={classes.main}>
          {props.children}
        </main>
        <Footer />
    </div>
  )
}
