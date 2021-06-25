import React, { Component, useEffect, useState, useCallback } from "react"

import { useCookies } from "react-cookie"

import { Link, useStaticQuery, graphql, StaticQuery } from "gatsby"

import styled, {
  ThemeProvider,
  jsx,
  ClassNames,
  useTheme,
  Global,
  css,
} from "@emotion/react"

import Footer from "./footer"
import TableOfContents from "./table-of-contents"
import Container from "@material-ui/core/Container"
import { Fab, useScrollTrigger, Zoom } from "@material-ui/core"

import { Helmet } from "react-helmet"
import Navigation from "./navigation"
import { logo } from "../../static/hardcoded-svgs"

import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp"
{
  /* <script type='text/javascript' charset='utf-8'>
  window.liveSiteAsyncInit = function() {
    LiveSite.init({
      id : 'WI-TUG6LDJQODFDUW08P2ZD'
    });
  };
  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0],
        p = 'https://',
        r = Math.floor(new Date().getTime() / 1000000);
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = p + "d2ra6nuwn69ktl.cloudfront.net/assets/livesite.js?" + r;
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'livesite-jssdk'));
</script> */
}

export default React.memo(({ children, window }) => {
  //prettier-ignore
  const { site: { siteMetadata: { title, description } } } = useStaticQuery(
    graphql`
  query layoutQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`);

  const scrollToTop = event => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    )

    if (anchor) {
      anchor.scrollIntoView({
        disableHysteresis: true,
        threshold: 150,
        behavior: "smooth",
        block: "center",
      })
    }
  }

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  })

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      {/* <CssBaseline /> */}
      <Navigation />

      <div className="row" id="back-to-top-anchor">
        <div className="col-12">{children}</div>
        {/* <TableOfContents /> */}
      </div>

      <Footer />
      <Zoom in={trigger} role="presentation">
        <Fab
          onClick={scrollToTop}
          size="small"
          style={{ bottom: "25px", right: "25px", position: "fixed" }}
          aria-label="scroll back to top"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
    </>
  )
})
