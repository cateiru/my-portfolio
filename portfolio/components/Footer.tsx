import Center from "./Center"
import Box from '@material-ui/core/Box'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    copyright: {
      fontFamily: "'Open Sans Condensed', sans-serif",
      fontSize: 12,
    }
  }),
)

export default function Footer() {
  const classes = useStyles()
  return (
    <footer>
      <Center>
        <Box className={classes.copyright}>
          Copyright (c) 2021 Yuto Watanabe
        </Box>
      </Center>
    </footer>
  )
}
