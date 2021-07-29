import React, { useState, useEffect, useContext } from "react"
import { StaticQuery, graphql, Link, useStaticQuery } from "gatsby"

//styles / animation
import { TransitionGroup } from "react-transition-group"

import { telstraTower } from "../../static/hardcoded-svgs"
import { heroGraphic } from "../../static/heroGraphic.js"
import { Button, Icon, Typography, Grid, makeStyles } from "@material-ui/core"
import { RateReview, Call, Visibility } from "@material-ui/icons"
import CustomButton from "./customButton.js"
// const _Button = styled(Button)`
//   background: orange;
//   color: black;
//   font-family: Berlin-Sans-FB;
// `


//makestyles for material ui
const useStyles = makeStyles(theme => ({
  heroGraphic: {
    [theme.breakpoints.down('md')]: {
      // opacity: .15,
      // position: 'absolute',
      // display: 'absolute',
      // top: '-22.5%',
      // zIndex: -1,
      // order: 0,
      // maxWidth:'800px',
      visibility: 'hidden',
      display: 'none'
    },
    display: 'block',
    visibility: 'visible',
    position: 'relative',
    zIndex: -1,
  }
}))

//prettier-ignore
export default function HeroHeader ({ context, headerGraphic, headline, headlineDescription }) {
  //prettier-ignore
  const { site: { siteMetadata: { title, description } } } = useStaticQuery(pageQuery);

  const classes = useStyles()

  //prettier-ignore
  const _telstraTower = React.useCallback(() => (<div className="position-absolute overflow-hidden d-none d-lg-block" style={{ right: "0px", top: "10%",zIndex:0 }} dangerouslySetInnerHTML={{ __html: telstraTower }}></div>), []);

  const heroData = {
    headline: () => (
      <Typography variant="h1" component="h1" gutterBottom>
        SWIFT &<br />
        ELEGANT TREE
        <br />
        MAINTENENCE
      </Typography>
    ),
    description: () => (
      <Typography component="body" variant="body1" gutterBottom>
        At HAKN tree removal, we provide a trusted alternative
        <br />
        for customers, eliminating the uncertainty when hiring
        <br />a tree specialist
      </Typography>
    ),
  }

  //prettier-ignore
  const _heroGraphic = React.useCallback(
    () => (
      <>
        <div 
          className={classes.heroGraphic + " col-5 h-100 m-auto"}
          dangerouslySetInnerHTML={{ __html: heroGraphic }}
          style={{maxWidth: "700px"}}
        />
        {/* <LottiePlayer
        src="../../static/animations/removal.json"
        mode="bounce"
        background="transparent"
        speed="1"
        style="width: 300px; height: 300px;"
        hover
        loop
        controls
        autoplay
        /> */}
        </>
    ),
    []
  )
  return (
    <>
      <div
        style={{
          background: "#F2E5C4",
          marginTop: '-80px',
          marginBottom: "20px",
          paddingTop: '140px',
          paddingBottom: '0px',
          height:"150%",
          width:"110vw",
          zIndex: 0
          // boxShadow: "inset 0px -37px 34px -15px rgba(63, 49, 14, 0.15)",
        }}
      >
        <section className="col-xl-8 col-10 m-auto" id="home">
          {/* div wrapper only active on mobile breakpoint */}

          <div>
            <div className="d-flex flex-wrap justify-content-center">
              <div className="flex-column h-100 position-relative m-auto">
                {heroData.headline()}
                {heroData.description()} 
                  <Grid container spacing={4}  className="mt-4 mx-sm-auto">
                    <Grid item md={6} xs={12} className="p-0">
                      <CustomButton shadow action={() => document.getElementById("getaquote").scrollIntoView()} Icon={RateReview}>
                        Get a free quote
                      </CustomButton>
                    </Grid>
                    <Grid item md={6} xs={12} className="px-0">
                      <CustomButton shadow action={() => window.location.href = "tel:+610459289772"} Icon={Call}>
                        Call us today!
                      </CustomButton>
                    </Grid>
                  </Grid> 
              </div>
              {_heroGraphic()}
              {/* active on mobile breakpoint */}
              <div className="col-5 mt-3 mx-auto w-100 grid-wrapper d-sm-none">
              </div>
            </div>
          </div>
          {_telstraTower()}
          {/* <div className="brand-section-bg d-sm-none d-block p-4"></div> */}
        </section>
      </div>
    </>
  )
}

export const pageQuery = graphql`
  query heroHeaderQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
