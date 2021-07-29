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
// import { styled } from "@material-ui/core/styles"

export default function Navigation({ theme, themeState, children, window }) {
  const [drawerState, setDrawerState] = React.useState(false)

  const toggleDrawer = () => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }
    setDrawerState(!drawerState)
  }

  const list = React.useCallback(
    () => (
      <div
        role="presentation"
        onClick={toggleDrawer()}
        onKeyDown={toggleDrawer()}
        className="p-5 m-5"
      >
        <List>
          {["Contact", "Services", "About Us", "Other Services"].map(
            (text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
      </div>
    ),
    []
  )

  const menuIcon = React.useCallback(
    color => (
      <div
        style={{ fill: color }}
        className="mx-auto"
        dangerouslySetInnerHTML={{ __html: customMenuIcon }}
      />
    ),
    []
  )

  const logo = React.useCallback(
    color => (
      <div
        style={{ fill: color }}
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
    { name: "Contact Us", url: "#contact" },
    { name: "Services", url: "#services" },
    { name: "Get a quote", url: "#getaquote" },
    { name: "Other Services", url: "#otherservices" },
  ]

  const boldCurrentPage = React.useCallback((name, i) => {
    if (i !== 0) return name
    else return <b>{name}</b>
  }, [])

  const navigateTo = page => {
    if (page[0] === "#") document.getElementById(page)?.scrollIntoView()
    // window.location.hash = page.url
  }

  const pageNav = React.useCallback(
    () => (
      <div className="justify-content-evenly d-none d-md-block">
        {pages.map((page, i) => (
          <Link
            key={page.name}
            className="m-1"
            to={page.url}
            style={{
              textDecoration: "none",
              color: "#534213",
              fontFamily: "Berlin-Sans-FB",
            }}
            onClick={event => navigateTo(page.url)}
          >
            {boldCurrentPage(page.name.toUpperCase(), i)}
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
        <Button className="p-0" onClick={toggleDrawer()}>
          {menuIcon()}
        </Button>
        <Drawer anchor="left" open={drawerState} onClose={toggleDrawer()}>
          {/* {list(anchor)} */}
        </Drawer>
      </React.Fragment>
    ),
    []
  )

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
