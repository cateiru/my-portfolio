import TwitterIcon from '@material-ui/icons/Twitter'
import GitHubIcon from '@material-ui/icons/GitHub'
import {QiitaIcon} from './icons/qiitaIcon'
import {ZennIcon} from './icons/zenn'
import {NoteIcon} from './icons/note'
import InstagramIcon from '@material-ui/icons/Instagram'


export interface LinkContents {
  name: string
  link: string
  icon: JSX.Element
  onCursorColorLight: string
  onCursorColorDark: string
}

export const linkContents: LinkContents[] = [
  {
    name: 'Twitter',
    link: 'https://twitter.com/cateiru',
    icon: <TwitterIcon />,
    onCursorColorLight: '#1DA1F2',
    onCursorColorDark: '#1DA1F2',
  },
  {
    name: 'GitHub',
    link: 'https://github.com/cateiru',
    icon: <GitHubIcon />,
    onCursorColorLight: '#161c23',
    onCursorColorDark: '#f0f6fb',
  },
  {
    name: 'Qiita',
    link: 'https://qiita.com/cateiru',
    icon: <QiitaIcon />,
    onCursorColorDark: '#55C500',
    onCursorColorLight: '#55C500'
  },
  {
    name: 'Zenn',
    link: 'https://zenn.dev/cateiru',
    icon: <ZennIcon />,
    onCursorColorLight: '#3fa9ff',
    onCursorColorDark: '#3fa9ff'
  },
  {
    name: 'Instagram',
    link: 'https://www.instagram.com/yuto51942/',
    icon: <InstagramIcon />,
    onCursorColorLight: '#d92f7f',
    onCursorColorDark: '#d92f7f'
  },
  {
    name: 'note',
    link: 'https://note.com/cateiru',
    icon: <NoteIcon />,
    onCursorColorLight: '#41C9B4',
    onCursorColorDark: '#41C9B4'
  }
]
