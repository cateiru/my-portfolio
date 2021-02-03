import { useRouter } from 'next/router'
import Page from '../../components/Page'
import React from 'react'
import ThemeProps from '../../utils/themeProps'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import TryAnyUserForm from '../../components/TryAnyUser'
import { SendData } from '../../utils/githubData'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import axios from 'axios'
import SkillsPage from '../../components/SkillContents'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import ReactTooltip from 'react-tooltip'
import NoSsr from '@material-ui/core/NoSsr'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: 1400
    },
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



export default function AnyUser({ setTheme, isTheme, name }: ThemeProps & InferGetServerSidePropsType<typeof getServerSideProps>) {
  const classes = useStyles()
  const [isError, setIsError] = React.useState(false)
  const [data, setData] = React.useState<SendData | null>(null)
  const [isLoad, setIsLoad] = React.useState(false)

  React.useEffect(() => {
    setIsLoad(true)

    axios.get(`/api/github?name=${name}`)
      .then((response) => {
      setData(response.data as SendData)
      setIsLoad(false)
    }).catch((error) => {
      setData(null)
      setIsError(true)
      setIsLoad(false)
    })
  }, [name])

  return (
    <div>
      <Page titleName="Skills" setTheme={setTheme} isTheme={isTheme} >
        <NoSsr>
          <ReactTooltip type={isTheme === 'dark'? 'light' : 'dark'} />
        </NoSsr>
        <Snackbar open={isError} autoHideDuration={6000} onClose={() => setIsError(false)}>
          <MuiAlert elevation={6} variant="filled" onClose={() => setIsError(false)} severity="error">
            情報を取得できませんでした。<br />ユーザー名を確認してもう一度お試しください。
          </MuiAlert>
        </Snackbar>
        <Backdrop open={isLoad} className={classes.backdrop}>
          <CircularProgress color="secondary" />
        </Backdrop>
        <div className={classes.form}>
          <TryAnyUserForm text="他のGitHubアカウントで試す" initForm={name} />
        </div>
        <div>
          {data? <SkillsPage data={data} /> : null}
        </div>
      </Page>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      name: context.query.name
    }
  }
}
