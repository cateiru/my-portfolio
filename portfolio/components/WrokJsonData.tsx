import React from 'react'
import Divider from '@material-ui/core/Divider'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Undone from './Undone'

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
      fontWeight: 500,
      borderBottom: `solid 2px ${theme.palette.secondary.main}`,
    },
    header: {
      fontSize: '1.7rem',
      margin: '4rem 0 .5rem 0',
      fontFamily: "'M PLUS 1p', sans-serif",
      fontWeight: 400,

      '@media only screen and (max-device-width: 600px)': {
        clear: 'both'
      },
    },
    text: {
      fontSize: '1rem',
      wordWrap: 'break-word',
      margin: '0 0 0 0',
      lineHeight: '2.5rem',
      fontWeight: 300,
      letterSpacing: '.1rem',

      '@media only screen and (max-device-width: 600px)': {
        clear: 'both',
        letterSpacing: '0',
        lineHeight: '1.8rem',
      },
    },
    line: {
      margin: '0 0 1rem 0',
      backgroundColor: theme.palette.text.secondary,
      width: '300px',
    },
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

  const highlightText = text.split('**').map((element, _index) => {
    if(isHighlight) {
      isHighlight = false
      return (
        <React.Fragment key={_index}>
          <span className={classes.highlight}>{element}</span>
        </React.Fragment>
      )
    }else{
      isHighlight = true
      return (
        <React.Fragment key={`text${_index}`}>
          {element}
        </React.Fragment>
      )
    }
  })

  if(text === '') {
    return (
    <React.Fragment key={index}>
      <p className={classes.text}><br/></p>
    </React.Fragment>
  )
  }
  else if(isHeader) {
    return (
      <React.Fragment key={index}>
        <p className={classes.header}>
          {highlightText}
        </p>
        <Divider className={classes.line} />
      </React.Fragment>
    )
  }else {
    return (
      <React.Fragment key={index}>
        <p className={classes.text}>
          {highlightText}
        </p>
      </React.Fragment>
    )
  }
}

export function ChangeText({ texts }: { texts: string[] }) {
  const classes = useStyles()

  if(texts.length === 0) {
    return (
      <Undone text="このページは書きかけ、または書き忘れです。" />
    )
  }

  return (
    <React.Fragment>
      {texts.map((element, index) => analysisText(index, element))}
    </React.Fragment>
  )
}
