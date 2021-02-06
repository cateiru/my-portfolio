import Box from '@material-ui/core/Box'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    copyright: {
      fontSize: 12,
      textAlign: 'center',
      margin: '3rem .5rem 1rem .5rem'
    },
  }),
)

export default function Footer() {
  const classes = useStyles()
  return (
    <footer>
      <Box className={classes.copyright}>
        Copyright (c) 2021 Yuto Watanabe
      </Box>
    </footer>
  )
}
