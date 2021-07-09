import React, { useState, useEffect, useContext } from "react"
import { StaticQuery, graphql, Link, useStaticQuery } from "gatsby"

//styles / animation
import { TransitionGroup } from "react-transition-group"

import { telstraTower } from "../../static/hardcoded-svgs"
import { heroGraphic } from "../../static/heroGraphic.js"
import { Button, Icon, Typography } from "@material-ui/core"
import { Phone } from "@material-ui/icons"
import CustomButton from "./customButton.js"
import * as LottiePlayer from "@lottiefiles/lottie-player"

//prettier-ignore
export default function HeroHeader ({ context, headerGraphic, headline, headlineDescription }) {
  //configure what section is in view
  const [inProp, setInProp] = useState(false)
  useEffect(() => {
    setInProp(true)
  }, [])
 
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
      {/* <section className="hero-header position-relative">
        
      </section> */}
    </>
  )
}
