import Box from '@material-ui/core/Box'
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
    },
    text: {
      fontSize: '1rem',
    },
    textBox: {

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
function analysisText(text: string){
  const classes = useStyles()
  let isHeader = false
  let isHighlight = false

  if(text.match(/^\#\#\s.*$/g)){
  // Header
  isHeader = true
  }

  const highlightText = text.split('**').map(element => {
    if(isHighlight) {
      return (
        <span className={classes.highlight}>{element}</span>
      )
    }else{
      return element
    }
  })

  if(isHeader) {
    return (
      <div className={classes.header}>
        {highlightText}
      </div>
    )
  }else {
    return (
      <div className={classes.text}>
        {highlightText}
      </div>
    )
  }
}

export function changeText(texts: string[]) {
  const classes = useStyles()

  return (
    <Box className={classes.textBox}>
      {texts.map(element => analysisText(element))}
    </Box>
  )
}
