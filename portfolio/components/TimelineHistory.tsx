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
import Box from '@material-ui/core/Box'

import CakeIcon from '@material-ui/icons/Cake'
import SchoolIcon from '@material-ui/icons/School'
import ApartmentIcon from '@material-ui/icons/Apartment'
import FastfoodIcon from '@material-ui/icons/Fastfood'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const styles = (theme: Theme) =>
  createStyles({
    emphasis: {
      fontWeight: 700,
      // color: '#7da1ba'
      borderBottom: `solid 2px ${theme.palette.secondary.main}`,
    },
    timeline: {
      marginTop: '10rem',
      marginBottom: '5rem',
      width: '100%',
      transform: 'scale(1.1)',
      boxSizing: 'border-box',
      '@media only screen and (max-device-width: 600px)': {
        transform: 'scale(1.0)',
      },
    },
    text: {
      fontSize: '1rem',
    },
  })

interface Props extends WithStyles<typeof styles> { }

class TimelineHistory extends React.Component<Props, {}> {
  constructor(props: Props){
    super(props)

    this.state = {
      changeAvatar: Boolean(Math.round(Math.random()))
    }
  }


  render() {
    const { classes } = this.props

    return (
    <Timeline align="alternate" className={classes.timeline}>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography color="textSecondary" className={classes.text}>2000/10/01</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined">
            <CakeIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator >
        <TimelineContent className={classes.text}>生まれる</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>
          <Typography color="textSecondary" className={classes.text}>2017/07 - 2019/02</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" >
            <FastfoodIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className={classes.text}><Box><span className={classes.emphasis}>すき家</span>にてアルバイト</Box></TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>
          <Typography color="textSecondary" className={classes.text}>2019/04/01 - (2023/04)</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" >
            <SchoolIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className={classes.text}><span className={classes.emphasis}>東京電機大学</span> 入学</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>
          <Typography color="textSecondary" className={classes.text}>2019/07 - </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" >
            <ApartmentIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className={classes.text}><span className={classes.emphasis}>都内AI企業</span>にてインターン</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>
            <Typography color="textSecondary" className={classes.text}>いつか</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" >
            <FavoriteBorderIcon />
          </TimelineDot>
          {/* <TimelineConnector /> */}
        </TimelineSeparator>
        <TimelineContent className={classes.text}><span className={classes.emphasis}>つよつよになる！</span></TimelineContent>
      </TimelineItem>
    </Timeline>
    )
  }
}

export default withStyles(styles)(TimelineHistory)
