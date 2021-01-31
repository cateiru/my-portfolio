import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

export default function Undone({ text }: { text: string }) {
  const [isAlert, setIsAlert] = React.useState(true)

  return (
    <Snackbar open={isAlert} anchorOrigin={{ vertical: 'top', horizontal: 'center'}} onClose={() => {setIsAlert(false)}} >
      <MuiAlert severity="warning" variant="filled">
        {text}
      </MuiAlert>
    </Snackbar>
  )
}
