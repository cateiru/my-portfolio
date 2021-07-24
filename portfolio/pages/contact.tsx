import Page from '../components/Page'
import Box from '@material-ui/core/Box'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import ContactForm from '../components/ContactForm'
import ThemeProps from '../utils/themeProps'
import {GetServerSideProps, InferGetServerSidePropsType} from 'next';

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

export default function Contact({ setTheme, isTheme, title }: ThemeProps & InferGetServerSidePropsType<typeof getServerSideProps>) {
  const classes = useStyles()
  return (
    <div>
      <Page titleName="Contact" setTheme={setTheme} isTheme={isTheme} >
        <Box className={classes.title}>
          お問い合わせ
        </Box>
        <ContactForm title={title} />
      </Page>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const title = context.query.title || ''

    return {
        props: {
            title: title
        }
    }
}
