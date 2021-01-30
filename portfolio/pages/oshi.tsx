import Page from '../components/Page'
import Undone from '../components/Undone'
import ThemeProps from '../utils/themeProps'

export default function Oshi({ setTheme, isTheme }: ThemeProps) {
  return (
    <div>
      <Page titleName="Oshi" setTheme={setTheme} isTheme={isTheme} >
        <Undone />
      </Page>
    </div>
  )
}
