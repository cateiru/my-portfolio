import HomeIcon from '@material-ui/icons/Home'
import WorkIcon from '@material-ui/icons/Work'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ContactMailIcon from '@material-ui/icons/ContactMail'
import React from 'react'

export interface LinksType {
  name: string,
  icon: JSX.Element
}

export const links: LinksType[] = [
  {
  name: 'about',
  icon: <HomeIcon />
  },
  {
    name: 'works',
    icon: <WorkIcon />
  },
  {
    name: 'skills',
    icon: <AccountCircleIcon />
  },
  {
    name: 'contact',
    icon: <ContactMailIcon />
  }
]
