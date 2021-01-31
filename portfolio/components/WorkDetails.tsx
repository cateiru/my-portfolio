import React from 'react'
import { WorkJsonData } from './WrokJsonData'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Fab from '@material-ui/core/Fab'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import Box from '@material-ui/core/Box'
import { ChangeText } from './WrokJsonData'
import Chip from '@material-ui/core/Chip'
import LinkIcon from '@material-ui/icons/Link'
import GitHubIcon from '@material-ui/icons/GitHub'
import TwitterIcon from '@material-ui/icons/Twitter'
import Button from '@material-ui/core/Button'
// import Image from 'next/image'


interface Props {
  docData: WorkJsonData
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '100%',
      margin: '1.5rem 5rem 3rem 5rem',
      '@media only screen and (max-device-width: 1300px)': {
        margin: '1rem 2rem 3rem 2rem',
      },
      '@media only screen and (max-device-width: 600px)': {
        margin: '0 1rem 3rem 1rem',
      },
    },
    title: {
      margin: '1rem 0 1rem 0',
      fontSize: '2.5rem',
      fontFamily: "'M PLUS 1p', sans-serif",
      fontWeight: 300,
      '@media only screen and (max-device-width: 480px)': {
        fontSize: '2rem',
      },
    },
    textArea: {
      margin: '0'
    },
    backButton: {
      position: 'fixed',
      bottom: theme.spacing(2),
      left: theme.spacing(2),
      zIndex: 1100
    },
    figure: {
      width: '50%',
      float: 'right',
      margin: '1rem 0 1rem 2rem',

      '@media only screen and (max-device-width: 1300px)': {
        width: '50%',
        margin: '0 10px 0 10px',
        position: 'relative',
      },
      '@media only screen and (max-device-width: 1024px)': {
        width: '100%',
        position: 'relative',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    carousel: {
      textAlign: 'center',

      '& .thumb': {
        borderColor: `${theme.palette.primary.main} !important`,
        cursor: 'pointer',
      },
      '& .selected': {
        borderColor: `${theme.palette.secondary.main} !important`,
      },
      '& ul': {
        padding: '0',
      },

      width: '100%',
      height: 'auto',
    },
    tag: {
      margin: '.3rem .35rem 0',
      cursor: 'pointer',
    },
    tags: {
      margin: '0',
    },
    tagA: {
      color : 'inherit',
      textDecoration: 'none',
      outline: 'none',
    },
    link: {
      margin: '.2rem 0 0 0',
      whiteSpace: 'nowrap',
    },
    linkbutton: {
      margin: '0 0 0 0',

      '@media only screen and (max-device-width: 600px)': {
        margin: '1rem 0 0 0',
      },
    },
    wrapper: {
      display: 'flex',
      justifyContent: 'space-between',

      '@media only screen and (max-device-width: 600px)': {
        display: 'inline',
      },
    }
  }),
)

function ImageView({ images }: { images: string[]}) {
  const classes = useStyles()
  if(images.length === 0) {
    images.push(Boolean(Math.round(Math.random()))? '/NoImage_light.jpg': '/NoImage_dark.jpg')
  }

  return (
    <Carousel showThumbs showIndicators infiniteLoop
    showStatus={false} swipeable useKeyboardArrows dynamicHeight className={classes.carousel}>
      {images.map((image, index) => (
        <div key={index} >
          <img src={image} key={index}/>
          {/* <Image src={image} width={960} height={540} priority={true} key={index} /> */}
        </div>
      ))}
    </Carousel>
  )
}

function TagView( { tags }: { tags: string[] }) {
  const classes = useStyles()

  const tagElements = tags.map((element, index) => {
    return (
      <a href={`https://www.google.com/search?q=${element}`} target="_blank" rel="noopener noreferrer" className={classes.tagA} key={index}>
        <Chip variant="outlined" color="secondary" label={element} className={classes.tag} size="small" key={index} />
      </a>
    )
  })

  return (
    <React.Fragment>
      {tagElements}
    </React.Fragment>
  )
}

function LinkButton( { link, index }: {link: {host: string, url: string}, index: number} ) {
  const classes = useStyles()
  let icon = <LinkIcon />

  switch(link.host.toLowerCase()) {
    case 'github':
      icon = <GitHubIcon />
      break
    case 'twitter':
      icon = <TwitterIcon />
      break
  }

  return (
    <Button href={link.url} key={index} startIcon={icon} className={classes.linkbutton}>
      {link.host}
    </Button>
  )
}

export default function WorkDetails(props: Props) {
  const classes = useStyles()

  return (
    <div className={classes.root} key="root">
      <Link href="/works">
        <Fab color="secondary" size="medium" className={classes.backButton}>
          <ArrowBackIcon />
        </Fab>
      </Link>
      <div className={classes.title} >
        {props.docData.title}
      </div>
      <div className={classes.wrapper} key="tagAndLink">
        <div className={classes.tags} key="tag">
          <TagView tags={props.docData.tag} />
        </div>
        <div className={classes.link} key="link">
          {props.docData.links.map((element, index) => (
            <LinkButton link={element} index={index} key={index} />
          ))}
        </div>
      </div>
      <div className={classes.textArea} key="textArea">
        <figure className={classes.figure}>
          <Box boxShadow={10}>
            <ImageView images={props.docData.imgSrc} />
          </Box>
        </figure>
        <ChangeText texts={props.docData.text} />
      </div>
    </div>
  )
}
