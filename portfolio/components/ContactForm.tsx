import React from 'react'
import TextField from '@material-ui/core/TextField'
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import Center from './Center'
import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import axios from 'axios'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import Divider from '@material-ui/core/Divider'


interface State {
  mailAddress: string,
  name: string,
  title: string,
  text: string,
  mailIsError: boolean,
  isWrittenName: boolean,
  isWrittenText: boolean,
  isSend: boolean,
  isError: boolean,
  confirmation: boolean,
  errorName: string,
  errorMail: string,
  errorText: string,
  sending: boolean
}

interface UploadText {
  name: string,
  title: string,
  mail: string,
  text: string,
  date: string
}

const styles = (theme: Theme) =>
  createStyles({
    textAreaBox: {
      marginTop: '1rem',
      marginBottom: '2rem'
    },
    textAreaText: {
      marginTop: '3rem'
    },
    sendButton: {
      marginTop: '3rem',
      marginBottom: '3rem'
    },
    dialogText: {
      fontWeight: 500,
    },
    dialogTitle: {
      fontWeight: 400,
    },
    inputBox: {
      // width: '350px'
      width: '20rem',
      '@media only screen and (max-device-width: 480px)': {
        width: '17rem',
      },
      '@media only screen and (max-device-width: 280px)': {
        width: '15rem',
      }
    },
    backdrop: {
      zIndex: 1400
    }
})

interface Props extends WithStyles<typeof styles> { }

class ContactForm extends React.Component<Props, State> {

  constructor(props: Props){
    super(props)

    this.state = {
      mailAddress: '',
      title: '',
      text: '',
      name: '',
      mailIsError: false,
      isWrittenName: false,
      isWrittenText: false,
      sending: false,
      isSend: false,
      isError: false,
      confirmation: false,
      errorName: '',
      errorMail: '',
      errorText: ''
    }

    this.updateName = this.updateName.bind(this)
    this.checkMail = this.checkMail.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
    this.updateText = this.updateText.bind(this)
    this.send = this.send.bind(this)
    this.check = this.check.bind(this)
    this.confirmationDialog = this.confirmationDialog.bind(this)
  }

  checkMail(event: React.ChangeEvent<HTMLInputElement>) {
    const inputText = event.target.value
    const re = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/

    if(inputText.match(re) || inputText === ''){
      this.setState(() => ({
        mailIsError: false,
        mailAddress: inputText,
        errorMail: ''
      }))
    }else {
      this.setState(() => ({
        mailIsError: true,
        mailAddress: inputText,
      }))
    }
  }

  updateName(event: React.ChangeEvent<HTMLInputElement>) {
    const inputText = event.target.value
    this.setState(() => ({
      name: inputText,
      isWrittenName: false,
      errorName: ''
    }))
  }

  updateTitle(event: React.ChangeEvent<HTMLInputElement>) {
    const inputText = event.target.value
    this.setState(() => ({
      title: inputText,
    }))
  }

  updateText(event: React.ChangeEvent<HTMLInputElement>) {
    const inputText = event.target.value
    this.setState(() => ({
      text: inputText,
      isWrittenText: false,
      errorText: ''
    }))
  }

  confirmationDialog() {
    if(!this.check()){
      return
    }

    this.setState(() => ({
      confirmation: true
    }))
  }

  send() {
    const today = new Date()
    const nowTime = `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()} ${today.getHours()}:${today.getMinutes()}`

    const uploadText: UploadText = {
      title: this.state.title,
      name: this.state.name,
      mail: this.state.mailAddress,
      text: this.state.text,
      date: nowTime
    }

    this.setState(() => ({
      sending: true
    }))

    this.upload(uploadText)
  }

  upload(uploadText: UploadText) {
    axios
      .post("/api/form",
      uploadText,
      { headers: { Accept: "application/json" } })
      .then((response) => {
        this.setState(() => ({
          name: '',
          title: '',
          text: '',
          mailAddress: '',
          isSend: true,
          confirmation: false,
          sending: false
        }))
      })
      .catch((error) => {
        this.setState(() => ({
          isError: true,
          confirmation: false,
          sending: false
        }))
      })
  }

  check(): boolean {
    let isTrueSend = true
    let _isWrittenName = false
    let _isWrittenText = false
    let _isWrittenMail = false

    let _errorMail = ''
    let _errorName = ''
    let _errorText = ''

    if(this.state.mailAddress.length <= 0 || this.state.mailIsError) {
      isTrueSend = false
      _isWrittenMail = true
      _errorMail = '例: example@example.com'
    }
    if(this.state.name.length <= 0) {
      _isWrittenName = true
      isTrueSend = false
      _errorName = '名前を記述してください。'
    }
    if(this.state.text.length <= 0) {
      _isWrittenText = true
      isTrueSend = false
      _errorText = '内容を記述してください。'
    }

    this.setState(() => ({
      isWrittenName: _isWrittenName,
      isWrittenText: _isWrittenText,
      mailIsError: _isWrittenMail,
      errorMail: _errorMail,
      errorName: _errorName,
      errorText: _errorText
    }))

    return isTrueSend
  }

  render() {
    const { classes } = this.props

    return (
      <form autoComplete="off">
        <div>
          <Center className={classes.textAreaBox}>
            <TextField required id="name" label="Your name" onChange={this.updateName} error={this.state.isWrittenName}
                       value={this.state.name} color="secondary" helperText={this.state.errorName} inputProps={{className: classes.inputBox }} />
          </Center>
          <Center className={classes.textAreaBox}>
            <TextField required id="email" label="E-mail address" error={this.state.mailIsError} helperText={this.state.errorMail}
                       autoComplete="email" onChange={this.checkMail} value={this.state.mailAddress} color="secondary" inputProps={{className: classes.inputBox }} />
          </Center>
          <Center className={classes.textAreaBox}>
            <TextField id="subject" label="Subject" onChange={this.updateTitle} value={this.state.title} color="secondary" inputProps={{className: classes.inputBox }} />
          </Center>
          <Center className={classes.textAreaBox}>
            <TextField
              id="body-text"
              label="Text"
              required
              multiline
              rows={8}
              onChange={this.updateText}
              variant="outlined"
              className={classes.textAreaText}
              error={this.state.isWrittenText}
              value={this.state.text}
              color="secondary"
              helperText={this.state.errorText}
              inputProps={{className: classes.inputBox }}
            />
          </Center>
          <Center className={classes.sendButton}>
            <Button variant="outlined" color="secondary" onClick={this.confirmationDialog} endIcon={<SendIcon />}>
              SEND
            </Button>
          </Center>
        </div>

        <Dialog
        open={this.state.confirmation}
        // TransitionComponent={Transition}
        keepMounted
        onClose={() => {this.setState(() => ({confirmation: false}))}}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        >

        <DialogTitle id="alert-dialog-slide-title" ><span className={classes.dialogTitle}>送信しますか？</span></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" component={'span'} color="textSecondary" className={classes.dialogText}>
            【名前】 {this.state.name}<br />
            【メールアドレス】 {this.state.mailAddress} <br />
            【件名】 {this.state.title} <br />
            【内容】 <br />
            <pre className={classes.dialogText}>
              {this.state.text}
            </pre>
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={() => {this.setState(() => ({confirmation: false}))}} >
            キャンセル
          </Button>
          <Button onClick={this.send} type='submit' color="secondary">
            送信
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={this.state.isSend} autoHideDuration={6000} onClose={() => {this.setState(() => ({isSend: false}))}}>
        <MuiAlert onClose={() => {this.setState(() => ({isSend: false}))}} severity="success" variant="filled">
          送信しました。
        </MuiAlert>
      </Snackbar>
      <Snackbar open={this.state.isError} autoHideDuration={6000}>
        <MuiAlert onClose={() => {this.setState(() => ({isError: false}))}} severity="error" variant="filled">
          送信できませんでした。<br />
          時間をおいてもう一度試していただくか、"yuto.w51942@gmail.com" にお問い合わせください。
        </MuiAlert>
      </Snackbar>

      <Backdrop open={this.state.sending} className={classes.backdrop} >
        <CircularProgress color="inherit" />
      </Backdrop>
      </form>
    )
  }
}

export default withStyles(styles)(ContactForm)
