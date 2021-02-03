import Page from '../components/Page'
import React from 'react'
import SkillsPage from '../components/SkillContents'
import ThemeProps from '../utils/themeProps'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { SendData, github } from '../utils/githubData'
import ReactTooltip from 'react-tooltip'
import NoSsr from '@material-ui/core/NoSsr'
import TryAnyUserForm from '../components/TryAnyUser'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      textAlign: 'center',
      fontSize: '8rem',
      fontWeight: 900,
      margin: '5% 1rem 5% 1rem',
      fontFamily: "'M PLUS 1p', sans-serif",

      background: '-webkit-linear-gradient(45deg, #6372f2, #62c5f0 20%, #a8f590 90%)',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',

      '& p': {
        display: 'inline-block',
        margin: '1rem 1rem 1rem 1rem'
      },

      '@media only screen and (max-device-width: 1024px)': {
        fontSize: '6rem',
        margin: '5rem 1rem 0 1rem',
      },
      '@media only screen and (max-device-width: 600px)': {
        fontSize: '4.3rem',
        margin: '5rem 2rem 0 2rem',
      },
      '@media only screen and (max-device-width: 480px)': {
        fontSize: '13vw',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    userTry: {
      margin: '3rem 1rem 3rem 1rem',
    }
  })
)

export default function Skills({ setTheme, isTheme, data }: ThemeProps & InferGetStaticPropsType<typeof getStaticProps>) {
  const classes = useStyles()

  return (
    <div>
      <Page titleName="Skills" setTheme={setTheme} isTheme={isTheme} >
        <NoSsr>
          <ReactTooltip type={isTheme === 'dark'? 'light' : 'dark'} />
        </NoSsr>
        <div className={classes.title}>
          <p>My GitHub</p>
        </div>
        <SkillsPage data={data as SendData} />
        <div className={classes.userTry}>
          <TryAnyUserForm text='あなたのGitHubアカウントで試す' initForm='' />
        </div>
      </Page>
    </div>
  )
}


export const getStaticProps: GetStaticProps = async () => {

  const data = await github('yuto51942')

  return {
    props: {
      data: data,
    },
    revalidate: 43200
  }
}
