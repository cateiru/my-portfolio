import React from 'react'
import Page from '../../components/Page'
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType} from 'next'
import { WorkJsonData } from '../../components/WrokJsonData'
import { SetTheme, IsTheme } from '../../utils/themeProps'
import WorkDetails from '../../components/WorkDetails'
import fs from 'fs'
import path from 'path'


function Work(props: InferGetStaticPropsType<typeof getStaticProps>){
  return (
    <div>
      <Page titleName="Works" setTheme={props.setTheme as SetTheme} isTheme={props.isTheme as IsTheme} >
        <WorkDetails docData={props.data} />
      </Page>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const dirPath = path.join(process.cwd(), 'data', 'works')
  const filePaths = fs.readdirSync(dirPath).map(
    (pathName) => path.basename(pathName, '.json')
  )

  const paths: {params: any}[] = filePaths.map((post) => ({
    params: {
       id: post,
    },
  }))

  return { paths: paths, fallback: false }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {
  const dirPath = path.join(process.cwd(), 'data', 'works', `${params.id as string}.json`)
  const fileData: WorkJsonData = JSON.parse(fs.readFileSync(dirPath, 'utf-8'))

  return { props: { data: fileData } }
}

export default Work
