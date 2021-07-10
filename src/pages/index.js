<<<<<<< HEAD
import * as React from "react"
import Layout from "../layout/layout"
import HeroHeader from "../components/heroHeader"
import AboutUs from "../components/aboutUs"
import QuoteCalculator from "../components/quoteCalculator"
import CustomCard from "../components/customCard"

//services
import treeCuttingImage from "../../static/images/tree-cutting.jpeg"
import stumpRemovalImage from "../../static/images/stump-removal.jpeg"
import trimmingImage from "../../static/images/trimming.jpeg"

//other services
import mulchImage from "../../static/images/mulch.jpg"
import firewoodImage from "../../static/images/firewood.jpeg"
import emergencyImage from "../../static/images/emergency-services.jpg"
import conservationImage from "../../static/images/conservation.jpg"
import hedgeRemovalImage from "../../static/images/hedge-removal.jpg"

export default function Index() {
  const marginAmount = "150px"

  const servicesData = [
    {
      image: treeCuttingImage,
      icon: "nah",
      title: "Tree Cutting",
      description:
        "Apon assessment we will determine the safest procedure to remove unwanted or unhealthy trees, we ensure qualified and trained employees will undertake removals correctly. If a tree is in a dangerous position we will assess the area and conduct the necessary precautions such as a crane or scissor lift.",
    },
    {
      image: stumpRemovalImage,
      icon: "nah",
      title: "Stump Removal",
      description:
        "When the tree is cut down and the stump is left in place it will attract pests or fungi. We provide a stump removal service when we cut down a tree or if the tree is already removed. Inform us if you intend to use the area for other trees, shrubs or flowers to ensure the stump is completely removed. ",
    },
    {
      image: trimmingImage,
      icon: "nah",
      title: "Trimming",
      description:
        "Employees can prune & trim shrubs, trees and hedges to maintain a beautiful shape, encourage healthy plant growth & fruiting to prevent rotting and uncontrollable growth and also ensure the safety of property and pedestrians.",
    },
    {
      image: conservationImage,
      icon: "nah",
      title: "Conservation",
      description:
        "All native trees will have seeds harvested and will be added to our nursery to regrow and donate in the future (our nursery currently is currently in production keep posted for when we are poen to give away little saplings)",
    },
  ]

  const otherServicesData = [
    {
      image: emergencyImage,
      icon: "nah",
      title: "Emergency tree services",
      description: "adsfsdafasdfasdfadsfasdffdsfdsdsfadfsafdas",
    },
    {
      image: firewoodImage,
      icon: "nah",
      title: "Firewood",
      description: "adsfsdafasdfasdfadsfasdffdsfdsdsfadfsafdas",
    },
    {
      image: mulchImage,
      icon: "nah",
      title: "Mulch sales and mulching",
      description: "adsfsdafasdfasdfadsfasdffdsfdsdsfadfsafdas",
    },
    {
      image: hedgeRemovalImage,
      icon: "nah",
      title: "Hedge removals",
      description: "adsfsdafasdfasdfadsfasdffdsfdsdsfadfsafdas",
    },
  ]

  return (
    <Layout>
      <HeroHeader id="back-to-top-anchor" />
      {/* services */}
      <CustomCard
        style={{ marginBottom: marginAmount }}
        id="#services"
        serviceData={servicesData}
      />
      {/* <AboutUs id="#aboutus" /> */}
      <QuoteCalculator />
      {/* other services */}
      <CustomCard
        style={{ marginBottom: marginAmount }}
        id="#otherservices"
        serviceData={otherServicesData}
      />
    </Layout>
  )
}
=======
import React, { useState, useEffect, useMemo } from "react"
import Layout, { GlobalStore } from "../layout/layout"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import styled from "@emotion/react"

import HeroHeader from "../components/heroHeader"
import Pitch from "../components/pitch"
import Experience from "../components/experience"
import Skills from "../components/skills"
import Contact from "../components/contact"

// <video preload="true" controls loop autoPlay="true">
//                       <source src="https://imgur.com/5QFU0PB.mp4" />
// </video>

{
  /**mailchimp integration
      <script id="mcjs">!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/fbbcaa0fa5cc9f5e4f2ae3d09/a9757ed9e8d1f6abfc04086cf.js");</script>
      */
}
const IndexPage = React.memo(
  (
    {
      //returned from pageQuery as props
      // data: {
      //   allMarkdownRemark: { edges },
      // },
    }
  ) => {
    return (
      <Layout>
        <HeroHeader
          // headerGraphic="./assets/svg/portfolio-graphic.png"
          headlineDescription="I create software applications for online businesses like you, so you can focus on getting your users needs fulfilled"
          headline={
            <>
              Beautiful, scalable
              <br />
              software.
            </>
          }
        />
        <Pitch />
        <Experience />
        <Skills />
        <Contact />
      </Layout>
    )
  }
)

export default IndexPage

//autorun at gatsby rebuild-cycle
// export const pageQuery = graphql`
//   query indexPageQuery {
//     allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
//       edges {
//         node {
//           id
//           excerpt(pruneLength: 250)
//           frontmatter {
//             date(formatString: "MMMM DD, YYYY")
//             path
//             title
//             thumbnail_
//           }
//         }
//       }
//     }
//   }
// `;
>>>>>>> 86ce37acba6944a50153517562eee9e2154d8efd
