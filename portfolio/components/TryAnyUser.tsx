import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import React from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
    },
    textArea: {
      width: '300px',
      marginRight: '.5rem',

      '@media only screen and (max-device-width: 480px)': {
        width: '250px',
      },
      '@media only screen and (max-device-width: 370px)': {
        width: '200px',
      },
    },
    description: {
      fontWeight: 300,
      fontSize: '1.7rem',
      margin: '1rem 1rem 2rem 1rem',

      '@media only screen and (max-device-width: 480px)': {
        fontSize: '1.2rem',
        margin: '1rem 1rem 2rem 1rem',
      },
      '@media only screen and (max-device-width: 370px)': {
        ontSize: '1rem',
      },
    },
    backdrop: {
      zIndex: 1400
    },
  })
)

export default function TryAnyUserForm( { text, initForm, loadError }: {text: string, initForm: string, loadError: boolean}) {
  const classes = useStyles()
  const router = useRouter()
  const [isTryAnyUser, setIsTryAnyUser] = React.useState(false)
  const [anyUserName, setAnyUserName] = React.useState(initForm)
  const [isError, setIsError] = React.useState(false)
  const [isLoad, setIsLoad] = React.useState(false)

  React.useEffect(() => {
    if(isTryAnyUser){
      setIsTryAnyUser(false)
      if(anyUserName === ''){
        setIsError(true)
        return
      }
      setIsError(false)
      setIsLoad(true)

      router.replace(`/skills/user?name=${anyUserName}`).then(() => {
        window.scrollTo(0, 0)
        setIsLoad(false)
      })
    }
  }, [isTryAnyUser])

  React.useEffect(() => {
    if(loadError){
      setIsLoad(false)
    }

  }, [loadError])

  return (
    <div className={classes.root}>
      <p className={classes.description}>{text}</p>
      <TextField
        label="GitHubユーザー名"
        size="small"
        variant="outlined"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setAnyUserName(event.target.value)}
        value={anyUserName}
        className={classes.textArea}
        error={isError}
        color='secondary' />
      <Button variant="contained" color='secondary' onClick={() => setIsTryAnyUser(true)}>Go!</Button>
      <Backdrop open={isLoad} className={classes.backdrop}>
          <CircularProgress color="secondary" />
      </Backdrop>
    </div>
  )
}
