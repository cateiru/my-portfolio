import Page from '../components/Page'
import MyAvatar from '../components/MyProfile'
import { makeStyles, Theme, createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import TimelineHistory from '../components/TimelineHistory'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Center from '../components/Center'
import NextLink from 'next/link'
import Divider from '@material-ui/core/Divider'
import { links } from '../utils/pageName'
import ThemeProps from '../utils/themeProps'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    name: {
      fontFamily: "'M PLUS 1p', sans-serif",
      fontWeight: 100,
      textAlign: 'center',
    },
    nameEn: {
      fontFamily: "'Open Sans Condensed', sans-serif",
      textAlign: 'center',
      marginBottom: '3rem'
    },
    divider: {
      width: '80%',
      backgroundColor: theme.palette.text.secondary
    }
  }),
)


const buttonTheme = (theme: Theme) => (createStyles({
  jump: {
    flexGrow: 1,
    marginBottom: '10rem',
    width: '100%',
    margin: '0 auto',
    boxSizing: 'border-box',
    '@media only screen and (max-device-width: 600px)': {
      width: '10%'
    },
  },
  button: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  item: {
    textAlign: 'center',
    boxSizing: 'border-box',
  }
}))

interface Props extends WithStyles<typeof buttonTheme> {}

const jumpButton: React.FC<Props> = ({ classes }: Props) => (
  <div className={classes.jump}>
    <Center>
      <Grid container spacing={5} >
        { links.map((element, _) => {
        if(element.name !== 'about'){
          return (
            <Grid item xs className={classes.item} key={element.name}>
              <NextLink href={`/${element.name}`}>
                <Button variant="outlined" className={classes.button}>
                  {element.name.toUpperCase()}
                </Button>
              </NextLink>
            </Grid>
          )
        }
        }) }
      </Grid>
    </Center>
  </div>
  )

const CustomButton = withStyles(buttonTheme)(jumpButton)

export default function About({ setTheme, isTheme }: ThemeProps) {
  const classes = useStyles()

  return (
    <div>
      <Page titleName="About" setTheme={setTheme} isTheme={isTheme} >
        <MyAvatar />
          <Box fontSize="h3.fontSize" className={classes.name}>
            渡邊悠人
          </Box>
          <Box fontSize="h6.fontSize" className={classes.nameEn}>
            Yuto Watanabe
          </Box>
          <CustomButton />
          <Center className={classes.divider}>
            <Divider />
          </Center>
          <TimelineHistory />
      </Page>
    </div>
  )
}
