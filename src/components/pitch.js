import React, { useContext, useEffect } from "react"

//ui
import { logoFull } from "../../static/hardcoded-svgs"
import {
  AppBar,
  Slide,
  Toolbar,
  Drawer,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  useScrollTrigger,
} from "@material-ui/core"
import { Link } from "gatsby"
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp"
import { red } from "@material-ui/core/colors"
import styled, { useTheme } from "@emotion/react"

const _Pitch = styled.div``

export default React.memo(
  ({ theme, themeState, boundActions, children, window }) => {
    //prettier-ignore
    const logo = React.useCallback(() => <div dangerouslySetInnerHTML={{ __html: logoFull }} />,[]);

    const pages = [
      { name: "About", url: "#about" },
      { name: "Services", url: "#services" },
      { name: "Contact", url: "#contact" },
    ]
    const pageNav = React.useCallback(
      () => (
        <div className="flex-nowrap justify-content-center">
          {pages.map(page => (
            <Link key={page.name} className="m-1" to={page.url}>
              {page.name.toUpperCase()}
            </Link>
          ))}
        </div>
      ),
      []
    )

    const trigger = useScrollTrigger({ target: window ? window() : undefined })
    return <></>
  }
)
