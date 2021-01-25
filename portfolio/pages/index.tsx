import Page from '../components/Page'
import MyAvatar from '../components/MyProfile'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Center from '../components/Center'

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
