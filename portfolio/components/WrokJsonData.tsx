import React from 'react'
import Divider from '@material-ui/core/Divider'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

export interface WorkJsonData {
  title: string,
  explanation: string,
  tag: string[],
  imgSrc: string[],
  links: {
    host: string,
    url: string,
  }[],
  date: string,
  text: string[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    highlight: {
      fontWeight: 700,
      borderBottom: `solid 2px ${theme.palette.secondary.main}`,
    },
    header: {
      fontSize: '2rem',
      fontWeight: 700,
      margin: '1rem 0 .5rem 0'
    },
    text: {
      fontSize: '1rem',
      wordWrap: 'break-word'
    },
    line: {
      backgroundColor: theme.palette.text.secondary,
    }
  }),
)

/**
 * ヘッダー、ハイライトを追加します。
 * - `**` で囲んだ場合その行がハイライトされます。
 * - `## ` で開始した場合、ヘッダー行となります。
 *
 * @param text テキスト
 */
function analysisText(index: number, text: string){
  const classes = useStyles()
  let isHeader = false
  let isHighlight = false

  if(text.match(/^\#\#\s.*$/g)){
  // Header
  isHeader = true
  text = text.slice(2)
  }

  const highlightText = text.split('**').map(element => {
    if(isHighlight) {
      isHighlight = false
      return (
        <span className={classes.highlight}>{element}</span>
      )
    }else{
      isHighlight = true
      return <span>{element}</span>
    }
  })

  if(isHeader) {
    return (
      <React.Fragment>
        <p className={classes.header} key={index}>
          {highlightText}
        </p>
        <Divider className={classes.line} />
      </React.Fragment>
    )
  }else {
    return (
      <p className={classes.text} key={index}>
        {highlightText}
      </p>
    )
  }
}

export function ChangeText({ texts }: { texts: string[] }) {
  const classes = useStyles()

  if(texts.length === 0) {
    return <div />
  }

  return (
    <React.Fragment>
      {texts.map((element, index) => analysisText(index, element))}
    </React.Fragment>
  )
}
