import React from 'react'
import { WorkJsonData } from '../utils/wrokJsonData'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Fab from '@material-ui/core/Fab'
import Image from 'next/image'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'

interface Props {
  docData: WorkJsonData
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '1rem',
    },
    title: {
      fontSize: '2.5rem',
    },
    backButton: {
      position: 'fixed',
      bottom: theme.spacing(2),
      left: theme.spacing(2),
      zIndex: 1400
    },
    image: {
      margin: '1rem 15rem 1rem 15rem',
    },
    carousel: {
      textAlign: 'center',
      '& .thumb': {
        borderColor: `${theme.palette.primary.main} !important`,
      },
      '& .selected': {
        borderColor: `${theme.palette.secondary.main} !important`,
      }
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
          <img src={`/_next/image?url=${image}&w=1920&q=75`} key={index}/>
        </div>
      ))}
    </Carousel>
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
      <div className={classes.image}>
        <ImageView images={props.docData.imgSrc} />
      </div>
    </div>
  )
}
