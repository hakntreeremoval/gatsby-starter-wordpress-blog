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
  const marginAmount = "175px"

  const servicesData = [
    {
      image: treeCuttingImage,
      icon: "nah",
      title: "Tree Cutting",
      description:
        "Apon assessment we will determine the safest procedure to remove unwanted or unhealthy trees, we take qualification and training seriously, employees will always undertake removals correctly. If a tree is in a dangerous position we will assess the area and conduct the necessary precautions and use specialized equipment such as a climbing gear, cranes, scissor lifts, etc, to get the job done professionally and safely.",
    },
    {
      image: stumpRemovalImage,
      icon: "nah",
      title: "Stump Removal",
      description:
        "When the tree is cut down and the stump is left in place, it will attract a large variety of pests or fungi and rot inside and underneath. We provide a stump removal service when we cut down a tree or if the tree is already removed. We assess the biology and land to make educated decision's on how to better improve your land, we always have a conversation about the surrounding land to know exactly what you want removed and how it will play out for future plant development ",
    },
    {
      image: trimmingImage,
      icon: "nah",
      title: "Trimming",
      description:
        "We prune & trim shrubs, trees and hedges to maintain a beautiful environment, always encouraging healthy plant growth & fruition to prevent rotting and uncontrollable growth while also ensuring the safety of property.",
    },
    {
      image: conservationImage,
      icon: "nah",
      title: "Conservation",
      description:
        "All native trees will have seeds harvested and will be added to our nursery to regrow and donate, contact us if you are interested in getting the right kind of tree planted wherever and whenever",
    },
  ]

  const otherServicesData = [
    {
      image: emergencyImage,
      icon: "nah",
      title: "Emergencies",
      description: "Emergency services take top priority because we understand urgency, if you need to get an obstructing tree or bush out of the way as soon as possible we can help",
    },
    {
      image: firewoodImage,
      icon: "nah",
      title: "Firewood",
      description: "We cure and treat our firewood from the trees we cut down, with many months of drying our firewood is fantastic for fireplaces and we sell at highly competitive rates. We source our wood locally so that you can experience canberra right from your fireplace.",
    },
    {
      image: mulchImage,
      icon: "nah",
      title: "Mulch",
      description: "We sell bulk mulch of various kinds, our mulch is sorted based on the type of wood, and plant life that we put into it so that you can get a customized look and nutritional output from our mulch.",
    },
    {
      image: hedgeRemovalImage,
      icon: "nah",
      title: "Hedge removals",
      description: "We take our tooling, and expertise from cutting trees and apply it to cutting and trimming of hedges, or other large plants that are obstructing or detrimental to the look of your environment.",
    },
  ]

  return (
    <Layout>
      <HeroHeader />
      {/* services */}
      <CustomCard
        title="SERVICES"
        style={{ marginBottom: marginAmount }}
        id="#services"
        serviceData={servicesData}
      />
      {/* <AboutUs id="#aboutus" /> */}
      <QuoteCalculator style={{ marginBottom: marginAmount }} />
      {/* other services */}
      <CustomCard
        title="OTHER SERVICES"
        style={{ marginBottom: marginAmount }}
        id="#otherservices"
        serviceData={otherServicesData}
      />
    </Layout>
  )
}
