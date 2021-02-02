import Page from '../components/Page'
import React from 'react'
import SkillsPage from '../components/SkillContents'
import ThemeProps from '../utils/themeProps'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { SendData, github } from '../utils/githubData'
import ReactTooltip from 'react-tooltip'
import NoSsr from '@material-ui/core/NoSsr'


export default function Skills({ setTheme, isTheme, data }: ThemeProps & InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Page titleName="Skills" setTheme={setTheme} isTheme={isTheme} >
        <NoSsr>
          <ReactTooltip type={isTheme === 'dark'? 'light' : 'dark'} />
        </NoSsr>
        <SkillsPage data={data as SendData} />
      </Page>
    </div>
  )
}


export const getStaticProps: GetStaticProps = async () => {

  const data = await github()

  return {
    props: {
      data: data,
    },
    revalidate: 43200
  }
}
