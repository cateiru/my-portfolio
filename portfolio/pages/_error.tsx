import Center from '../components/Center'
import Page from '../components/Page'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    center: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      fontFamily: "'M PLUS 1p', sans-serif",
      fontWeight: 300,
      transform: 'translateY(-50%) translateX(-50%)',
      '-webkit-transform': 'translateY(-50%) translateX(-50%)',
      fontSize: '38px',

      '@media only screen and (max-device-width: 600px)': {
        fontSize: '30px',
      },
      '@media only screen and (max-device-width: 480px)': {
        fontSize: '24px',
      },
      '@media only screen and (max-device-width: 360px)': {
        fontSize: '20px',
      },
      '@media only screen and (max-device-width: 280px)': {
        fontSize: '17px',
      },
    }
  })
)

export default function About() {
  const classes = useStyles()

  return (
    <Page titleName="Error" >
      <p className={classes.center} color="primary">
        404 | Not Found.
      </p>
    </Page>
  )
};
