import React from 'react'
import { WorkJsonData } from './WrokJsonData'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Fab from '@material-ui/core/Fab'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
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
      margin: '1.5rem 5rem 3rem 5rem',
    },
    title: {
      margin: '1rem 0 1rem 0',
      fontSize: '2.5rem',
      fontFamily: "'M PLUS 1p', sans-serif",
      fontWeight: 300,
    },
    textArea: {
      margin: '1rem 0 0 0'
    },
    backButton: {
      position: 'fixed',
      bottom: theme.spacing(2),
      left: theme.spacing(2),
      zIndex: 1400
    },
    image: {
      margin: '1rem 100px 1rem 100px',
    },
    figure: {
      width: '700px',
      float: 'left',
      margin: '1rem 2rem 1rem 0'

      // '@media only screen and (max-device-width: 600px)': {
      //   width: '400px'
      // },
      // '@media only screen and (max-device-width: 480px)': {
      //   width: '350px'
      // },
      // '@media only screen and (max-device-width: 280px)': {
      //   width: '250px',
      // },
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

      width: '100%',
      height: 'auto',
    },
    tag: {
      margin: '0 .5rem 0 0',
      cursor: 'pointer',
    },
    tags: {
      margin: 0,
    },
    tagA: {
      color : 'inherit',
      textDecoration: 'none',
      outline: 'none',
    },
    link: {
    },
    linkbutton: {
      margin: '0 0 0 .5rem',
    },
    wrapper: {
      display: 'flex',
      justifyContent: 'space-between',
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
      <a href={`https://www.google.com/search?q=${element}`} target="_blank" rel="noopener noreferrer" className={classes.tagA}>
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

function LinkButton( { link, key }: {link: {host: string, url: string}, key: number} ) {
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
    <Button href={link.url} key={key} startIcon={icon} className={classes.linkbutton}>
      {link.host}
    </Button>
  )
}

export default function WorkDetails(props: Props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Link href="/works">
        <Fab color="secondary" size="medium" className={classes.backButton}>
          <ArrowBackIcon />
        </Fab>
      </Link>
      <div className={classes.title}>
        {props.docData.title}
      </div>
      <div className={classes.wrapper}>
        <div className={classes.tags}>
          <TagView tags={props.docData.tag} />
        </div>
        <div className={classes.link}>
          {props.docData.links.map((element, index) => (
            <LinkButton link={element} key={index} />
          ))}
        </div>
      </div>
      <div className={classes.textArea}>
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
