import Page from '../components/Page'
import MyAvatar from '../components/MyProfile'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    name: {
      fontFamily: "'M PLUS 1p', sans-serif"
    },
    nameEn: {
      fontFamily: "'Open Sans Condensed', sans-serif"
    }
  }),
)

function Center(props: {children: React.ReactNode}) {
  return (
    <Grid container alignItems="center" justify="center">
      <Grid item>
        {props.children}
      </Grid>
    </Grid>
  )
}

export default function About() {
  const classes = useStyles()

  return (
    <div>
      <Page titleName="About" >
        <MyAvatar />
        <Center>
          <Box fontSize="h3.fontSize" className={classes.name}>
            渡邊悠人
          </Box>
        </Center>
        <Center>
          <Box fontSize="h6.fontSize" className={classes.nameEn}>
            Yuto Watanabe
          </Box>
        </Center>
      </Page>
    </div>
  )
}
