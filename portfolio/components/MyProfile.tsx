import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import Center from './Center'
import {useClient} from './CheckClient'


interface State {
  changeAvatar: boolean,
  isClient: boolean
}

const styles = (theme: Theme) =>
  createStyles({
  icon: {
    marginTop: '10rem',
    marginBottom: '1rem',
    width: theme.spacing(13),
    height: theme.spacing(13),
    cursor: 'pointer'
  },
})

interface Props extends WithStyles<typeof styles> { }

class MyAvatar extends React.Component<Props, State> {

  constructor(props: Props){
    super(props)

    this.state = {
      changeAvatar: Boolean(Math.round(Math.random())),
      isClient: false
    }

    this.avatarChange = this.avatarChange.bind(this)
  }

  avatarChange() {
    this.setState(() => ({
      changeAvatar: !this.state.changeAvatar
    }))
  }

  componentDidMount() {
    if(typeof window !== 'undefined'){
      this.setState(() => ({
        isClient: true
      }))
    }
  }

  render() {
    const { classes } = this.props

    return (
    <Center>
      <Avatar alt="Yuto Watanabe" src={this.state.isClient ? this.state.changeAvatar ? "/myIcon1.png" : "/myIcon2.png" : null} onClick={this.avatarChange} className={classes.icon} />
    </Center>
    )
  }
}

export default withStyles(styles)(MyAvatar)
