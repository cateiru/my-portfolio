import { useRouter } from 'next/router'
import Page from '../components/Page'
import ThemeProps from '../utils/themeProps'

/**
 * / ページにリダイレクト
 */
export default function About({ setTheme, isTheme }: ThemeProps) {
  const router = useRouter()
  if(typeof window !== 'undefined') {
    router.replace('/')
  }
  return (
    <Page titleName="About" setTheme={setTheme} isTheme={isTheme}>
      <div />
    </Page>
  )
};
