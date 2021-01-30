import FavoriteIcon from '@material-ui/icons/Favorite'
import HomeIcon from '@material-ui/icons/Home'
import WorkIcon from '@material-ui/icons/Work'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ShareIcon from '@material-ui/icons/Share'
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
    name: 'links',
    icon: <ShareIcon />
  },
  {
    name: 'oshi',
    icon: <FavoriteIcon />
  },
  {
    name: 'contact',
    icon: <ContactMailIcon />
  }
]
