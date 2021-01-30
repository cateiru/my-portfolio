import Page from '../components/Page'
import Box from '@material-ui/core/Box'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import ContactForm from '../components/ContactForm'
import ThemeProps from '../utils/themeProps'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      textAlign: 'center',
      fontSize: '2rem',
      marginTop: '4rem',
      fontFamily: "'M PLUS 1p', sans-serif",
      fontWeight: 300,
    },
  })
)

export default function Contact({ setTheme, isTheme }: ThemeProps) {
  const classes = useStyles()
  return (
    <div>
      <Page titleName="Contact" setTheme={setTheme} isTheme={isTheme} >
        <Box className={classes.title}>
          お問い合わせ
        </Box>
        <ContactForm />
      </Page>
    </div>
  )
}
