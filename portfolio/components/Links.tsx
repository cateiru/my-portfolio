import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Center from '../components/Center'
import Button from '@material-ui/core/Button'
import { linkContents } from '../utils/links'



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '2rem 3rem 1rem 3rem',
    },
    item: {
      margin: '.5rem 0 0 0',
      textAlign: 'center',
    },
  })
)

const buttonStyle = makeStyles((theme: Theme) => ({
  button: ({colorLight, colorDark}: {colorLight: string, colorDark: string}) => ({
    color: theme.palette.text.secondary,
    textTransform: 'none',

    '&:hover': {
      color: theme.palette.type === 'dark'? colorDark : colorLight,
    }
  })
}))

export default function Links(){
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Center>
        <Grid container spacing={5} >
          { linkContents.map((element, index) => {
            const buttonClass = buttonStyle({
              colorLight: element.onCursorColorLight,
              colorDark: element.onCursorColorDark
            })
            return (
              <Grid item xs className={classes.item} key={index} >
                <Button className={buttonClass.button} startIcon={element.icon} color="primary" href={element.link}>
                  {element.name}
                </Button>
              </Grid>
            )
          }) }
        </Grid>
      </Center>
      </div>
  )
}
