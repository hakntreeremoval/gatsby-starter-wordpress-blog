import React, { useContext, useEffect } from "react"

//ui
import {
  List,
  Slide,
  Drawer,
  AppBar,
  Button,
  Divider,
  Toolbar,
  ListItem,
  ListItemText,
  useScrollTrigger,
  SwipeableDrawer,
} from "@material-ui/core"
import { Menu } from "@material-ui/icons"

import { Link } from "gatsby"
import { red } from "@material-ui/core/colors"
import {
  customMenuIcon,
  logoFull,
  logoMedium,
  logoSmall,
  menuIcon,
} from "../../static/hardcoded-svgs"
import { ClassNames } from "@emotion/react"
import { makeStyles } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({
  drawer: {
    "& .MuiDrawer-paper": {
      background: theme.palette.background.primary,
    },
  },
  drawerList: {
    padding: theme.spacing(5),
    margin: theme.spacing(3),
  },
}));

export default function Navigation({ theme, themeState, children, window }) {
  const classes = useStyles();
  const [drawerState, setDrawerState] = React.useState(false)
  // const iOS = typeof navigator != 'null' ? /iPad|iPhone|iPod/.test(navigator?.userAgent) : false;

  const toggleDrawer = React.useCallback(event => setDrawerState(
    (drawerState) => !drawerState
  ), [])

  const menuIcon = React.useCallback(
    color => (
      <div
        style={{ fill: color }}
        className="mx-auto"
        dangerouslySetInnerHTML={{ __html: customMenuIcon }}
      />
    ), [])

  const logo = React.useCallback(
    color => (
      <div
        style={{ fill: color }}
        onClick={navigateTo("#top")}
        className="d-none d-xl-block d-md-none"
        dangerouslySetInnerHTML={{ __html: logoFull }}
      />
    ),
    []
  )
  const mediumLogo = React.useCallback(
    color => (
      <div
        onClick={navigateTo("#top")}
        style={{ fill: color }}
        className="d-lg-block d-xl-none d-block"
        dangerouslySetInnerHTML={{ __html: logoMedium }}
      />
    ),
    []
  )

  const smallLogo = React.useCallback(
    color => (
      <div
        onClick={navigateTo("#top")}
        style={{ fill: color }}
        className="d-block d-md-none"
        dangerouslySetInnerHTML={{ __html: logoSmall }}
      />
    ),
    []
  )

  const pages = [
    // { name: "Contact Us", url: "#contact" },
    { name: "Services", url: "#services" },
    { name: "Get a quote", url: "#getaquote" },
    { name: "Other Services", url: "#otherservices" },
  ]

  const boldCurrentPage = React.useCallback((name, i) => {
    if(typeof window === "undefined") return//we are on server side
    if (pages[i].url === document.location.hash) return <b>{name}</b>
    else return name
  }, [])

  const navigateTo = page => {
    if(typeof window === "undefined") return//we are on server side
    if (page[0] === "#") document.getElementById(page)?.scrollIntoView()
    // window.location.hash = page.url
  }

  const pageNav = React.useCallback(
    () => (
      <div className="justify-content-evenly d-none d-md-block">
        {pages.map((page, i) => (
          <Link
            key={page.name} 
            to={page.url}
            style={{
              fontSize: '1.2rem',
              marginLeft: '15px',
              marginRight: '15px',
              textDecoration: "none",
              color: "#534213",
              fontFamily: "Berlin-Sans-FB",
            }}
            onClick={event => navigateTo(page.url)}
          >
            {page.name}
            {/* {boldCurrentPage(page.name.toUpperCase(), i)} */}
          </Link>
        ))}
      </div>
    ),
    []
  )

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
  })

  //contains drawer for the menu
  const drawerSwitch = React.useCallback(
    () => (
      <React.Fragment key="drawer">
        <Button className="p-0" onClick={e => toggleDrawer(e)}>
          {menuIcon()}
        </Button>
        <SwipeableDrawer
          // isableBackdropTransition={!iOS} 
          // disableDiscovery={iOS}
          onOpen={() => setDrawerState(true)}
          onClose={() => setDrawerState(false)}
          anchor="right" open={drawerState}
          className={classes.drawer}
        >
          {list()}
        </SwipeableDrawer>
      </React.Fragment>
    ), [drawerState])

  const list = React.useCallback(
    () => (
      <div
        role="presentation"
        onClick={e => toggleDrawer(e)}
        onKeyDown={e => toggleDrawer(e)}
        className={classes.drawerList}
      >
        <List>
          {pages.map(
            (page, index) => (
              <ListItem button key={page.name} onClick={e => {
                navigateTo(page.url);
                toggleDrawer();
              }}>
                <Link
                  key={page.name} to={page.url} onClick={event => navigateTo(page.url)}
                  style={{
                    textDecoration: "none",
                    color: "#534213",
                    fontFamily: "Berlin-Sans-FB",
                  }}
                >
                  {boldCurrentPage(page.name, index)}
                </Link>
              </ListItem>
            )
          )}
        </List>
      </div>
    ), [drawerState])

  return (
    <Slide appear={true} direction="down" in={!trigger}>
      <AppBar
        elevation={!trigger ? 6 : 0}
        position="sticky"
        style={{
          background: "#F2E5C4",
          padding: "25px",
          boxShadow: "none",
        }}
      >
        <Toolbar className="justify-content-between px-3">
          {logo("#3F310E")}
          {mediumLogo("#3F310E")}
          {/* {smallLogo("#3F310E")} */}

          {pageNav()}

          {drawerSwitch()}
        </Toolbar>
      </AppBar>
    </Slide>
  )
}
