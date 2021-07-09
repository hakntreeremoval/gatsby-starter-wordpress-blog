import React, { useState, useEffect, useContext } from "react"
import { StaticQuery, graphql, Link, useStaticQuery } from "gatsby"

//styles / animation
import { TransitionGroup } from "react-transition-group"

import { telstraTower } from "../../static/hardcoded-svgs"
import { heroGraphic } from "../../static/heroGraphic.js"
import { Button, Icon, Typography } from "@material-ui/core"
import { Phone } from "@material-ui/icons"
import CustomButton from "./customButton.js"
// const _Button = styled(Button)`
//   background: orange;
//   color: black;
//   font-family: Berlin-Sans-FB;
// `
import * as LottiePlayer from "@lottiefiles/lottie-player"

//prettier-ignore
export default function HeroHeader ({ context, headerGraphic, headline, headlineDescription }) {
  //prettier-ignore
  const { site: { siteMetadata: { title, description } } } = useStaticQuery(pageQuery);

  //configure what section is in view
  const [inProp, setInProp] = useState(false)
  useEffect(() => {
    setInProp(true)
  }, [])

  //prettier-ignore
  const _telstraTower = React.useCallback(() => (<div className="position-absolute overflow-hidden" style={{ right: "0px", top: "0px" }} dangerouslySetInnerHTML={{ __html: telstraTower }}></div>), []);

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
          className="col-5 position-relative h-100 d-none d-md-block m-auto"
          dangerouslySetInnerHTML={{ __html: heroGraphic }}
        ></div>
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
      <section className="hero-header position-relative">
        {_telstraTower()}
        <div className="m-auto col-9">
          <div className="d-flex flex-wrap justify-content-center">
            <div className="flex-column h-100 position-relative m-auto">
              {heroData.headline()}
              {heroData.description()}
              <div className="col-5 mt-3 w-100 grid-wrapper">
                <CustomButton shadow action={() => ""} Icon={Phone}>
                  Call for a free quote
                </CustomButton>
                <CustomButton shadow action={() => ""} Icon={Phone}>
                  Call us today!
                </CustomButton>
              </div>
            </div>

            {_heroGraphic()}
          </div>
        </div>
      </section>
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
