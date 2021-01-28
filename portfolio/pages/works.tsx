import Page from '../components/Page'
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import WorksContents from '../components/WorksContents'
import { GetStaticProps, InferGetStaticPropsType} from 'next'
import Box from '@material-ui/core/Box'
import React from 'react'
import fs from 'fs'
import path from 'path'
// import Undone from '../components/Undone'

interface Props {
  works: WorkData[]
}

interface WorkJsonData {
  title: string,
  explanation: string,
  tag: string[],
  imageSrc: string,
  projectPageLink: string
}

interface WorkData extends WorkJsonData {
  id: string
}

function works(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const works: WorkData[] = props.works

  console.log(works)
  return (
    <div>
      <Page titleName="Works" >
        <Box>
          { works.map((element) => (
             <WorksContents
              title={element.title}
              explanation={element.explanation}
              tag={element.tag}
              imageSrc={element.imageSrc}
              projectPageLink={element.projectPageLink} / >
          ))}
        </Box>
      </Page>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {

  const dirPath = path.join(process.cwd(), 'works')
  const filePaths = fs.readdirSync(dirPath)
  const worksData = []

  filePaths.forEach((filePath, _) => {
    worksData.push(readWorksJsonData(path.join(dirPath, filePath)))
  })

  return {
    props: {
      works: worksData
    }
  }
}

function readWorksJsonData(filePath: string): WorkData {
  const data: WorkJsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  const id = path.basename(filePath, '.json')

  return {
    title: data.title,
    explanation: data.explanation,
    tag: data.tag,
    imageSrc: data.imageSrc,
    projectPageLink: data.projectPageLink,
    id: id
  }
}

export default works

