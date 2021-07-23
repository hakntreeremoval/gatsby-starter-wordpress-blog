import React, { Component, useEffect, useState, useCallback } from "react"

import { Link, useStaticQuery, graphql } from "gatsby"

// import { InlineIcon } from "@iconify/react"
// import chevronRight from "@iconify/icons-mdi/chevron-right";
// import githubLogo from "@iconify/icons-fa-brands/github-square";
// import linkedinLogo from "@iconify/icons-ion/logo-linkedin";
// import instagramLogo from "@iconify/icons-ri/instagram-fill";
import { logoFull, grass } from "../../static/hardcoded-svgs"

import {
  Box,
  Container,
  TableFooter,
  Typography,
  Ic,
  Grid,
  IconButton,
} from "@material-ui/core"
import { pageQuery } from "./layout"
import { ContactPhoneRounded, Facebook, Twitter, Instagram } from "@material-ui/icons"

import { makeStyles } from "@material-ui/core/styles"
import CustomButton from "../components/customButton"

const useStyles = makeStyles(theme => ({
  typography: {
    color: theme.palette.background.default,
    alignSelf: "center",
    marginBottom: theme.spacing(3),
  },
  footer: {
    //make all descendents that are a h3 have a bold font weight
    "& * > h3": {
      fontWeight: 1000,
    },
  }
}))

export default function HeroHeader({ children }) {
  const pages = [
    { name: "home", url: "#home" },
    { name: "about", url: "#about" },
    { name: "services", url: "#services" },
    { name: "contact", url: "#contact" },
  ]

  const haknDetails = {
    phone: '0459289772',
    email: "hakntreeremoval@gmail.com",
  }

  //ui
  //prettier-ignore
  const grassSvg = React.useCallback((placement, color) =>
    <div className="w-100 h-100 m-auto display-absolute position-relative" style={Object.assign({ [placement]: "-105px" }, placement == "bottom" && { transform: "rotate(180deg)" }, { fill: color },)}
      dangerouslySetInnerHTML={{ __html: grass }}
  />,[])

  //prettier-ignore
  const logo = React.useCallback(color =>
    <div className="mx-auto w-100 h-100" style={{ fill: color, maxHeight: '125px', marginTop: '-25px' }}
      dangerouslySetInnerHTML={{ __html: logoFull }}
    />, [])

  const classes = useStyles()


    const socialMediaLinks = [
      {name: "Facebook",url: "https://www.facebook.com/hakntreeremoval/services",Icon: Facebook },
      {name: "Instagram",url: "https://www.instagram.com/hakntreeremoval/",Icon: Instagram },
      {name: "Twitter",url: "https://twitter.com/HAKNtreeremoval",Icon: Twitter },
      // {name: "Gumtree",url: "https://www.gumtree.com.au/s-ad/canberra-city/landscaping-gardening/hakn-tree-removal/1276807127",Icon: "gumtree" },
    ]
  return (
    // prettier-ignore
    <footer className={classes.footer + " footer p-5 brand-secondary mt-2"} style={{ minHeight: "150px", minWidth: "100%" }}>
      {grassSvg("top", "#3F310E")}
      {/* materialui grid with two columns */}
      <Grid container spacing={6} className="col-10 m-auto">
        <Grid item md={6} xs={12}>
          {logo("#F2E5C4")}
        </Grid>
        <Grid item md={6} xs={12}>
          <div className="d-flex flex-row justify-content-between m-auto" item xs={12}>
            {/* make typography element not line break, so that in this div className="d-flex flex-row justify-content-between my-0" item two items are side by side */}
            <Grid item xs={6}>
                <Typography variant="h3" align="left" className={classes.typography}>{"Phone"}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h4" align="left" className={classes.typography}>{haknDetails.phone}</Typography>
            </Grid>
          </div>
          <div className="d-flex flex-row justify-content-between my-0" item xs={12}>
            <Grid item xs={6}>
              <Typography variant="h3" align="left" className={classes.typography}>{"Email"}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h4" align="left" className={classes.typography}>{haknDetails.email}</Typography>
            </Grid>
          </div>
          <div className="d-flex flex-row justify-content-between my-0" item xs={12}>
            <Grid item xs={6}>
              <Typography variant="h3" align="left" className={classes.typography}>{"Social media"}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h4" align="left" className={classes.typography + " d-flex flex-row justify-content-start"}>
              {socialMediaLinks.map(({name,url,Icon}) => 
                  <IconButton
                    aria-label={name}
                    color="inherit"
                    aria-owns={url}
                    aria-haspopup="true"
                    className="d-block p-2"
                    onClick={() => { window.open(url, '_blank') }}
                    
                  >
                  <Icon fontSize="medium"/>
                  </IconButton>
              )}
              </Typography>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </footer>
  )
}
