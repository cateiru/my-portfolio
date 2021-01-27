import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

export default function Undone() {
  return (
    <Snackbar open={true} anchorOrigin={{ vertical: 'top', horizontal: 'center'}} >
      <MuiAlert severity="warning" variant="filled">
        このページは現在、作成中です。
      </MuiAlert>
    </Snackbar>
  )
}
