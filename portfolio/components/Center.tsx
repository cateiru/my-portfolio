import Grid from '@material-ui/core/Grid'

export default function Center(props: {children: React.ReactNode, className?: string}) {
  return (
    <Grid container alignItems="center" justify="center">
      <Grid item className={props.className}>
        {props.children}
      </Grid>
    </Grid>
  )
}
