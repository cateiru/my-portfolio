import Page from '../components/Page'
import Undone from '../components/Undone'
import ThemeProps from '../utils/themeProps'

export default function Links({ setTheme, isTheme }: ThemeProps) {
  return (
    <div>
      <Page titleName="Links" setTheme={setTheme} isTheme={isTheme} >
        <Undone text="このページは現在作成中です。" />
      </Page>
    </div>
  )
}
