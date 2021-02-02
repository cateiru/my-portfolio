
import * as React from 'react'
import NextLink from 'next/link'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Fab from '@material-ui/core/Fab'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import Zoom from '@material-ui/core/Zoom'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import { useCookies } from 'react-cookie'
import { CookieSetOptions } from 'universal-cookie'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import NoSsr from '@material-ui/core/NoSsr'
import { links } from '../utils/pageName'
import GitHubIcon from '@material-ui/icons/GitHub'
import ThemeProps, { SetTheme, IsTheme } from '../utils/themeProps'
import { HeadTitle } from './PageHead'
import Tooltip from '@material-ui/core/Tooltip'

interface Props extends ThemeProps {
  titleName: string
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
      paddingLeft: '2rem',
      fontSize: '1.7rem',
      fontWeight: 300,
      fontFamily: "'M PLUS 1p', sans-serif",
    },
    scrollTop: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      zIndex: 1400
    },
    list: {
      width: 250,
      fontFamily: "'M PLUS 1p', sans-serif",
      fontWeight: 300
    },
    listText: {
      fontFamily: "'M PLUS 1p', sans-serif",
      fontWeight: 400,
    },
    githubLink: {
      color : 'inherit',
      textDecoration: 'none',
      outline: 'none',
    }
  })
)

function ElevationScroll(props: {children: React.ReactElement}) {
  const trigger = useScrollTrigger()

  return React.cloneElement(props.children, {
    elevation: trigger ? 4 : 0
  })
}

function ScrollTop(props: {children: React.ReactNode}) {
  const classes = useStyles()
  const trigger = useScrollTrigger()

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.scrollTop}>
        {props.children}
      </div>
    </Zoom>
  );
}

function changeTheme(nowTheme: IsTheme, setTheme: SetTheme,
                     setCookie: (name: string, value: any, options?: CookieSetOptions) => void) {
  const change = (nowTheme: string) => {
    return nowTheme === 'light'? 'dark' : 'light'
  }
  const newTheme = change(nowTheme)

  setTheme(newTheme)
  setCookie('isTheme', newTheme, { path: '/' , sameSite: 'strict' })

}

function menuList(nowIndex: number) {
  const classes = useStyles()

  return (
    <div className={classes.list}>
      <Grid container alignItems="center" justify="center">
        <Grid item>
          <Box fontSize="h5.fontSize">
            MENU
          </Box>
        </Grid>
      </Grid>
      <List>
        {links.map((text, index) => (
          <NextLink href={`/${text.name}`} key={text.name}>
            <ListItem button key={text.name} selected={nowIndex === index}>
              <ListItemIcon>{text.icon}</ListItemIcon>
              <ListItemText primary={<Typography className={classes.listText} >{text.name.toUpperCase()}</Typography>} />
            </ListItem>
          </NextLink>
        ))}
      </List>
    </div>
  )
}

function titleToIndex(title: string): number {
  const titles = links.map((element) => (element.name.charAt(0).toUpperCase() + element.name.slice(1)))

  return titles.indexOf(title)
}

function ElevateAppBar(props: Props) {
  const classes = useStyles()

  const [cookies, setCookie, removeCookie] = useCookies(['isDark'])
  const [drawerOpen, setDrawer] = React.useState(false)

  return (
    <React.Fragment>
      <HeadTitle titleName={props.titleName} />
      <ElevationScroll>
        <AppBar>
          <Toolbar>
            <IconButton edge="start" aria-label="menu" onClick={() => setDrawer(true)}>
              <MenuIcon />
            </IconButton>
              <Typography variant="h6" className={classes.title}>
                {props.titleName}
              </Typography>
            <a href="https://github.com/yuto51942/my-portfolio" target="_blank" rel="noopener noreferrer" className={classes.githubLink}>
              <Tooltip title="プロジェクトページに移動" >
                <IconButton aria-label="jump github page">
                  <GitHubIcon />
                </IconButton>
              </Tooltip>
            </a>
            <NoSsr>
              <Tooltip title={props.isTheme === 'dark' ? 'ライトモードに変更' : 'ダークモードに変更' }>
                <IconButton onClick={() => (changeTheme(props.isTheme, props.setTheme, setCookie))} aria-label="change theme">
                    {(props.isTheme === 'dark')? (<Brightness7Icon />) : (<Brightness4Icon />)}
                </IconButton>
              </Tooltip>
            </NoSsr>
          </Toolbar>
        </AppBar>
      </ElevationScroll>

      <SwipeableDrawer anchor="left" open={drawerOpen} onClose={() => setDrawer(false)} onOpen={() => setDrawer(true)} >
        {menuList(titleToIndex(props.titleName))}
      </SwipeableDrawer>

      <Toolbar id="back-to-top-anchor" />
      <ScrollTop>
        <Fab color="secondary" size="medium" aria-label="ページのトップに戻る">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}

export default function Header(props: Props) {
  return (
    <header>
      <nav>
        <ElevateAppBar titleName={props.titleName} setTheme={props.setTheme} isTheme={props.isTheme} />
      </nav>
    </header>
  )
}
