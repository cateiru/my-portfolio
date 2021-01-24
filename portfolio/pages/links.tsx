import Page from '../components/Page'
import Box from '@material-ui/core/Box';

export default function Links() {
  return (
    <div>
      <Page titleName="Links">
        <Box>
        {new Array(10000).fill('Hoge').join('\n')}
        </Box>
      </Page>
    </div>
  )
}
