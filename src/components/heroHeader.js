import React, { useState, useEffect, useContext } from "react"
import { StaticQuery, graphql, Link, useStaticQuery } from "gatsby"

//styles / animation
import { TransitionGroup } from "react-transition-group"

import { telstraTower } from "../../static/hardcoded-svgs"
import { heroGraphic } from "../../static/heroGraphic.js"
import { Button, Icon, Typography, Grid, makeStyles } from "@material-ui/core"
import { ContactPhoneRounded, Phone } from "@material-ui/icons"
import CustomButton from "./customButton.js"
// const _Button = styled(Button)`
//   background: orange;
//   color: black;
//   font-family: Berlin-Sans-FB;
// `


//makestyles for material ui
const useStyles = makeStyles(theme => ({
  heroGraphic: {
    [theme.breakpoints.down('lg')]: {
      opacity: .15,
      position: 'absolute',
      display: 'absolute',
      top: '-22.5%',
      zIndex: -1,
      order: 0,
      maxWidth:'800px'
    },
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
          marginBottom: "100px",
          paddingTop: '140px',
          paddingBottom: '100px',
          height:"150%",
          width:"110vw",
          zIndex: 0
          // boxShadow: "inset 0px -37px 34px -15px rgba(63, 49, 14, 0.15)",
        }}
      >
        <section className="col-xl-8 col-10 m-auto">
          {/* div wrapper only active on mobile breakpoint */}

          <div>
            <div className="d-flex flex-wrap justify-content-center">
              <div className="flex-column h-100 position-relative m-auto">
                {heroData.headline()}
                {heroData.description()} 
                  <Grid container spacing={4}  className="mt-4">
                    <Grid item xs={6}>
                      <CustomButton shadow action={() => ""} Icon={ContactPhoneRounded}>
                        Call for a free quote
                      </CustomButton>
                    </Grid>
                    <Grid item xs={6}>
                      <CustomButton shadow action={() => ""} Icon={Phone}>
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
