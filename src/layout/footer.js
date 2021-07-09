import React, { Component, useEffect, useState, useCallback } from "react"

import { Link, useStaticQuery, graphql } from "gatsby"

// import { InlineIcon } from "@iconify/react"
// import chevronRight from "@iconify/icons-mdi/chevron-right";
// import githubLogo from "@iconify/icons-fa-brands/github-square";
// import linkedinLogo from "@iconify/icons-ion/logo-linkedin";
// import instagramLogo from "@iconify/icons-ri/instagram-fill";
import { logoFull, grass } from "../../static/hardcoded-svgs"

import { Box, Container, TableFooter, Typography } from "@material-ui/core"
import { pageQuery } from "./layout"
import { styled } from "@material-ui/core/styles"

export default function HeroHeader({ children }) {
  const pages = [
    { name: "home", url: "#home" },
    { name: "about", url: "#about" },
    { name: "services", url: "#services" },
    { name: "contact", url: "#contact" },
  ]
  //prettier-ignore
  const grassSvg = React.useCallback((placement,color) => (
    <div
      className="w-100 h-100 m-auto display-absolute position-relative"
      style={Object.assign(
        { [placement]: "-105px" },
        placement == "bottom" && { transform: "rotate(180deg)" },
        {fill: color},
      )}
      dangerouslySetInnerHTML={{ __html: grass }}
    />
  ))

  const logo = React.useCallback(
    color => (
      <div
        className="d-none d-md-block col-6"
        style={{ fill: color }}
        dangerouslySetInnerHTML={{ __html: logoFull }}
      />
    ),
    []
  )

  return (
    // prettier-ignore
    <footer className="footer row p-5 align-items-center brand-secondary mt-5" style={{ minHeight: "150px", minWidth: "100%" }}>
      {grassSvg("top", "#3F310E")}
      <div className="col-10 position-relative">
        <div>{logo("#F2E5C4")}</div>
          
        <div className="col-6 d-flex flex-column justify-content-between">
          <Typography component="h2">{"Contact us for a free quote"}</Typography>
          <div className="d-flex flex-column justify-content-evenly brand-secondary">
            <Typography component="h4">{"Phone"}</Typography>
            <Typography component="h4">{"Email"}</Typography>
            <Typography component="h4">{"ABN"}</Typography>
          </div>
        </div>
      </div>
    </footer>
  )
}
