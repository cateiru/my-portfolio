import React from 'react'

import CakeIcon from '@material-ui/icons/Cake'
import SchoolIcon from '@material-ui/icons/School'
import ApartmentIcon from '@material-ui/icons/Apartment'


interface Timeline {
  text: JSX.Element,
  icon: JSX.Element,
  date: string
}

export const timelineElement: Timeline[] = [
  {
    text: <React.Fragment>生まれる</React.Fragment>,
    icon: <CakeIcon />,
    date: '2000/10/01'
  },
  {
    text: <React.Fragment><span>東京電機大学</span>入学</React.Fragment>,
    icon: <SchoolIcon />,
    date: '2019/04 - (2023/04)'
  },
  {
    text: <React.Fragment><span>都内AI開発企業</span>にてインターン</React.Fragment>,
    icon: <ApartmentIcon />,
    date: '2019/07 - 2021/06'
  }
]
