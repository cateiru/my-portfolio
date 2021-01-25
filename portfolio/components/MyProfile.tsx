import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import Center from './Center'


interface State {
  changeAvatar: boolean
}

const styles = (theme: Theme) =>
  createStyles({
  icon: {
    marginTop: '7rem',
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
      changeAvatar: Boolean(Math.round(Math.random()))
    }

    this.avatarChange = this.avatarChange.bind(this)
  }

  avatarChange() {
    this.setState(() => ({
      changeAvatar: !this.state.changeAvatar
    }))
  }

  render() {
    const { classes } = this.props

    return (
    <Center>
      <Avatar alt="Yuto Watanabe" src={this.state.changeAvatar ? "/myIcon1.png" : "/myIcon2.png"} onClick={this.avatarChange} className={classes.icon} />
    </Center>
    )
  }
}

export default withStyles(styles)(MyAvatar)
