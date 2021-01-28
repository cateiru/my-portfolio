import { useRouter } from 'next/router'
import Page from '../components/Page'

/**
 * / ページにリダイレクト
 */
export default function About() {
  const router = useRouter()
  if(typeof window !== 'undefined') {
    router.replace('/')
  }
  return (
    <Page titleName="About" >
      <div />
    </Page>
  )
};
