import Header from './Header'
import Footer from './Footer'
import * as React from 'react'
import { Theme }  from './DarkMode'

interface Props {
  titleName: string
  children: React.ReactNode
}

export default function Page(props: Props) {
  return (
    <div>
      <Header titleName={props.titleName} />
        {props.children}
      <Footer />
    </div>
  )
}
