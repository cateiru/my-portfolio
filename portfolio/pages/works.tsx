import Page from '../components/Page'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import WorksContents from '../components/WorksContents'
import Grid from '@material-ui/core/Grid'
import { GetStaticProps, InferGetStaticPropsType} from 'next'
import Box from '@material-ui/core/Box'
import React from 'react'
import fs from 'fs'
import path from 'path'
import { SetTheme, IsTheme } from '../utils/themeProps'
// import Undone from '../components/Undone'

interface WorkJsonData {
  title: string,
  explanation: string,
  tag: string[],
  imageSrc: string,
  projectPageLink: string,
  date: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '3rem .7rem 2rem .7rem',
    },
    guid: {
      lexBasis: 'auto',
      minWidth: '0%'
    }
  }),
)

interface WorkData extends WorkJsonData {
  id: string
}

function works(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const works: WorkData[] = props.works
  const classes = useStyles()

  return (
    <div>
      <Page titleName="Works" setTheme={props.setTheme as SetTheme} isTheme={props.isTheme as IsTheme} >
        <Box className={classes.root}>
        <Grid container spacing={5} direction="row" justify="space-around" alignItems="flex-start" className={classes.guid} >
          { works.map((element) => (
            <Grid item xs="auto" key={`grid_${element.id}`}>
              <WorksContents key={element.id} title={element.title} explanation={element.explanation}
                tag={element.tag} imageSrc={element.imageSrc} projectPageLink={element.projectPageLink}
                date={element.date} />
            </Grid>
          )).reverse() }
        </Grid>
        </Box>
      </Page>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {

  const dirPath = path.join(process.cwd(), 'data', 'works')
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
    date: data.date,
    id: id
  }
}

export default works

