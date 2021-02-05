import Page from '../../components/Page'
import React from 'react'
import ThemeProps from '../../utils/themeProps'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import TryAnyUserForm from '../../components/TryAnyUser'
import { SendData, github } from '../../utils/githubData'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import SkillsPage from '../../components/SkillContents'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import ReactTooltip from 'react-tooltip'
import NoSsr from '@material-ui/core/NoSsr'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      margin: '4rem 1rem 1rem 1rem',

      '@media only screen and (max-device-width: 370px)': {
        marginTop: '4rem',
        marginLeft: 'auto',
        marginRight: 'auto'
      },
    }
  })
)



export default function AnyUser({ setTheme, isTheme, name, data }: ThemeProps & InferGetServerSidePropsType<typeof getServerSideProps>) {
  const classes = useStyles()
  const [isError, setIsError] = React.useState(false)

  React.useEffect(() => {
    if(!data && name){
      setIsError(true)
    }
  }, [data, name])

  return (
    <div>
      <Page titleName="Skills" setTheme={setTheme} isTheme={isTheme} >
        <NoSsr>
          <ReactTooltip type={isTheme === 'dark'? 'light' : 'dark'} effect='solid' />
        </NoSsr>
        <Snackbar open={isError} autoHideDuration={6000} onClose={() => setIsError(false)}>
          <MuiAlert elevation={6} variant="filled" onClose={() => setIsError(false)} severity="error">
            情報を取得できませんでした。<br />ユーザー名を確認してもう一度お試しください。
          </MuiAlert>
        </Snackbar>
        <div className={classes.form}>
          <TryAnyUserForm text="他のGitHubアカウントで試す" initForm={name} loadError={isError} />
        </div>
        <div>
          {data? <SkillsPage data={data} /> : null}
        </div>
      </Page>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let data: SendData | null = null

  if(typeof context.query.name === 'string'){
     data = await github(context.query.name)
  }

  return {
    props: {
      name: context.query.name || null,
      data: data
    }
  }
}
