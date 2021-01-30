import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import React from 'react'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Image from 'next/image'
import Chip from '@material-ui/core/Chip'
import Link from 'next/link'


interface Props extends WithStyles<typeof styles> {
  title: string,
  explanation: string,
  tag: string[],
  imageSrc: string,
  projectPageLink: string,
  date: string
}

interface State {
  image: string,
  mouseOn: boolean,
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '576px',
      height: 'auto',
      cursor: 'pointer',

      '@media only screen and (max-device-width: 600px)': {
        width: '400px'
      },
      '@media only screen and (max-device-width: 480px)': {
        width: '350px'
      },
      '@media only screen and (max-device-width: 280px)': {
        width: '250px',
      }
    },
    image: {
      width: '100%',
      height: 'auto',
    },
    explanation: {
      wordWrap: 'break-word'
    },
    tags: {
      margin: '0 .2rem .5rem .2rem',
    },
    tag: {
      margin: '.1rem .2rem .1rem .2rem',
      cursor: 'pointer',
    }
})

class WorksContents extends React.Component<Props, State> {
  constructor(props: Props){
    super(props)

    this.imageSelect = this.imageSelect.bind(this)
    this.statusTag = this.statusTag.bind(this)

    this.state = {
      image: this.imageSelect(),
      mouseOn: false,
    }
  }

  imageSelect(): string {
    if(this.props.imageSrc === '') {
      return Boolean(Math.round(Math.random()))? '/NoImage_light.jpg': '/NoImage_dark.jpg'
    }
    return this.props.imageSrc
  }

  statusTag(classes: Record<string, string>) {
    return this.props.tag.map((element, _) => {
      return <Chip variant="outlined" color="secondary" label={element} className={classes.tag} size="small" key={element} />
    })
  }

  render() {
    const { classes } = this.props

    return (
      <Box className={classes.root}>
        <Link href={this.props.projectPageLink} >
          <Card raised={!this.state.mouseOn}
                onMouseEnter={() => {this.setState(() => ({mouseOn: true}))}}
                onMouseLeave={() => {this.setState(() => ({mouseOn: false}))}}
          >
            <CardHeader title={this.props.title} subheader={this.props.date}/>
            <div className={classes.tags}>
              {this.statusTag(classes)}
            </div>
            <div className={classes.image}>
            <Image src={this.state.image} width={576} height={324}/>
            </div>
            <CardContent >
              <Typography variant="body2" color="textSecondary" component="p" className={classes.explanation}>
                {this.props.explanation}
              </Typography>
            </CardContent>
            <CardActions>

            </CardActions>
          </Card>
        </Link>
      </Box>
    )
  }
}

export default withStyles(styles)(WorksContents)
