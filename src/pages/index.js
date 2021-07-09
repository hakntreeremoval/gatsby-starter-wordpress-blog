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
