import React from 'react'
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import Timeline from '@material-ui/lab/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineDot from '@material-ui/lab/TimelineDot'
import Typography from '@material-ui/core/Typography'
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent'


import { timelineElement } from '../utils/tileline'

const styles = (theme: Theme) =>
  createStyles({
    timeline: {
      marginTop: '10rem',
      marginBottom: '10rem',
      width: '100%',
      transform: 'scale(1.1)',
      boxSizing: 'border-box',
      '@media only screen and (max-device-width: 600px)': {
        transform: 'scale(1.0)',
      },
      '@media only screen and (max-device-width: 480px)': {
        marginTop: '5rem',
        marginBottom: '5rem',
      },
    },
    text: {
      fontSize: '1rem',
      fontWeight: 500,
      color: theme.palette.primary.contrastText,

      '& span': {
        fontWeight: 700,
        // color: '#7da1ba'
        borderBottom: `solid 2px ${theme.palette.secondary.main}`,
      }
    },
    date: {
      fontSize: '1rem',
      fontWeight: 500,
    }
  })

interface Props extends WithStyles<typeof styles> { }

class TimelineHistory extends React.Component<Props, {}> {

  constructor(props: Props){
    super(props)

    this.state = {
      changeAvatar: Boolean(Math.round(Math.random()))
    }
  }

  generateTimeline( { classes } ) {
    return (
      <React.Fragment>
        {timelineElement.map((element, index) => {
          return (
            <TimelineItem key={index}>
              <TimelineOppositeContent>
                <Typography color="textSecondary" className={classes.date}>{element.date}</Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot variant="outlined">
                  {element.icon}
                </TimelineDot>
                {(timelineElement.length-1 === index)? null : <TimelineConnector />}
              </TimelineSeparator >
              <TimelineContent className={classes.text}>{element.text}</TimelineContent>
            </TimelineItem>
          )
        })}
      </React.Fragment>
    )
  }

  render() {
    const { classes } = this.props

    return (
    <Timeline align="alternate" className={classes.timeline}>
      <this.generateTimeline classes={classes} />
    </Timeline>
    )
  }
}

export default withStyles(styles)(TimelineHistory)
