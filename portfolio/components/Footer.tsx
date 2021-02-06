import Box from '@material-ui/core/Box'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Links from './Links'
import Divider from '@material-ui/core/Divider'
import Center from '../components/Center'



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      margin: '3rem 1rem 1rem 1rem'
    },
    copyright: {
      marginTop: '2rem',
      fontSize: 12,
      textAlign: 'center',
      color: theme.palette.text.secondary
    },
    divider: {
      width: '80%',
      backgroundColor: theme.palette.text.secondary
    }
  }),
)

export default function Footer() {
  const classes = useStyles()
  return (
    <footer>
      <Center className={classes.divider}>
        <Divider />
      </Center>
      <Box className={classes.footer}>
        <Links />
        <p className={classes.copyright}>
        Copyright (c) 2021 Yuto Watanabe
        </p>
      </Box>
    </footer>
  )
}
