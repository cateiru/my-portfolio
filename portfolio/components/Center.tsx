import Grid from '@material-ui/core/Grid'

export default function Center(props: {children: React.ReactNode}) {
  return (
    <Grid container alignItems="center" justify="center">
      <Grid item>
        {props.children}
      </Grid>
    </Grid>
  )
}
