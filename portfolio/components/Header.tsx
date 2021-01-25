
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
import useMediaQuery from '@material-ui/core/useMediaQuery'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import WorkIcon from '@material-ui/icons/Work'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ShareIcon from '@material-ui/icons/Share'
import Box from '@material-ui/core/Box'
import selectTheme from './Theme'
import Grid from '@material-ui/core/Grid'
import {useClient} from './CheckClient'
import ContactMailIcon from '@material-ui/icons/ContactMail';


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
    },
    list: {
      width: 250,
      fontFamily: "'M PLUS 1p', sans-serif",
      fontWeight: 300
    },
    listText: {
      fontFamily: "'M PLUS 1p', sans-serif",
      fontWeight: 400,
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

function changeTheme(theme: 'dark' | 'light' | undefined): string {
  if(theme === 'light'){
    return 'dark'
  }
  return 'light'
}

function menuList(nowIndex: number) {
  const classes = useStyles()
  const linkItem = ['', 'works', 'skills', 'links', 'contact']
  const linkIcons = [<HomeIcon />, <WorkIcon />, <AccountCircleIcon />, <ShareIcon />, <ContactMailIcon />]
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
        {['ABOUT', 'WORKS', 'SKILLS', 'LINKS', 'CONTACT'].map((text, index) => (
          <NextLink href={`/${linkItem[index]}`} key={text}>
            <ListItem button key={text} selected={nowIndex === index}>
              <ListItemIcon>{linkIcons[index]}</ListItemIcon>
              <ListItemText primary={<Typography className={classes.listText} >{text}</Typography>} />
            </ListItem>
          </NextLink>
        ))}
      </List>
    </div>
  )
}

function titleToIndex(title: string): number {
  const titles = ['About', 'Works', 'Skills', 'Links']

  return titles.indexOf(title)
}

function ElevateAppBar(props: {titleName: string}) {
  const classes = useStyles()

  const [cookies, setCookie, removeCookie] = useCookies(['isDark'])
  const [drawerOpen, setDrawer] = React.useState(false)

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')


  if(typeof cookies.isDark === 'undefined'){
    const defaultTheme = prefersDarkMode ? 'dark' : 'light'
    setCookie('isDark', defaultTheme, { path: '/' , sameSite: 'strict' })
  }

  const theme = selectTheme(cookies.isDark)
  const isClient = useClient()

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar>
          <Toolbar>
            <IconButton edge="start" aria-label="menu" onClick={() => setDrawer(true)}>
              <MenuIcon />
            </IconButton>
              <Typography variant="h6" className={classes.title}>
                {props.titleName}
              </Typography>
            <IconButton onClick={() => (setCookie('isDark', changeTheme(cookies.isDark), { path: '/' , sameSite: 'strict'}))}>
              {isClient ? (cookies.isDark === 'dark')? (<Brightness7Icon />) : (<Brightness4Icon />) : null}
            </IconButton>
          </Toolbar>
        </AppBar>
      </ElevationScroll>

      <SwipeableDrawer anchor="left" open={drawerOpen} onClose={() => setDrawer(false)} onOpen={() => setDrawer(true)} >
        {menuList(titleToIndex(props.titleName))}
      </SwipeableDrawer>

      <Toolbar id="back-to-top-anchor" />
      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}

export default function Header(props: {titleName: string}) {
  return (
    <header>
      <nav>
        <ElevateAppBar titleName={props.titleName} />
      </nav>
    </header>
  )
}
