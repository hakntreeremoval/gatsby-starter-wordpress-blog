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
  menuIcon,
} from "../../static/hardcoded-svgs"
// import { styled } from "@material-ui/core/styles"

export default function Navigation({ theme, themeState, children, window }) {
  const [drawerState, setDrawerState] = React.useState(false)

  const toggleDrawer = () => event => {
    //prettier-ignore
    if (event.type === "keydown" &&(event.key === "Tab" || event.key === "Shift")) {return}

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
    () => <div dangerouslySetInnerHTML={{ __html: customMenuIcon }} />,
    []
  )

  const drawerSwitch = React.useCallback(
    () => (
      <React.Fragment key="drawer">
        <Button startIcon={menuIcon()} onClick={toggleDrawer()} />
        <Drawer anchor="left" open={drawerState} onClose={toggleDrawer()}>
          {/* {list(anchor)} */}
        </Drawer>
      </React.Fragment>
    ),
    []
  )

  //prettier-ignore
  const logo = React.useCallback(
    color => (
      <div
        style={{ fill: color }}
        className="d-none d-md-block"
        dangerouslySetInnerHTML={{ __html: logoFull }}
      />
    ),
    []
  )
  //prettier-ignore
  const smallLogo = React.useCallback(() => (<div className="d-block d-md-none" dangerouslySetInnerHTML={{ __html: logoMedium }}/>),[])

  const pages = [
    { name: "Contact Us", url: "#contact" },
    { name: "Services", url: "#services" },
    { name: "About Us", url: "#aboutus" },
    { name: "Other Services", url: "#otherservices" },
  ]
  const boldCurrentPage = React.useCallback((name, i) => {
    if (i !== 0) return name
    else return <b>{name}</b>
  }, [])
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
        <Toolbar className="justify-content-between">
          {logo("#3F310E")}
          {smallLogo()}
          {pageNav()}
          {drawerSwitch()}
        </Toolbar>
      </AppBar>
    </Slide>
  )
}
