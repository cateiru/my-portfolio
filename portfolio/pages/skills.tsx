import Page from '../components/Page'
import React from 'react'
import SkillsPage from '../components/SkillContents'
import ThemeProps from '../utils/themeProps'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { SendData, github } from '../utils/githubData'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


export default function Skills({ setTheme, isTheme, data, isError }: ThemeProps & InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [error, setError] = React.useState(isError as boolean)

  return (
    <div>
      <Page titleName="Skills" setTheme={setTheme} isTheme={isTheme} >
        <Snackbar open={error} onClose={() => setError(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center'}}>
          <MuiAlert elevation={6} variant="filled" severity="error" onClose={() => setError(false)} >
            Githubから情報を取得できませんでした。
          </MuiAlert>
        </Snackbar>
        {isError? <div /> : <SkillsPage isTheme={isTheme} data={data as SendData} />}
      </Page>
    </div>
  )
}


export const getServerSideProps: GetServerSideProps = async () => {

  const data = await github()

  if(typeof data === 'undefined'){
    return {
      props: {
        data: {},
        isError: true
      },
    }
  }

  return {
    props: {
      data: data,
      isError: false
    },
  }
}
