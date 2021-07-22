import React, { useState, useEffect, useContext, useCallback } from "react"
import {
  StaticQuery,
  graphql,
  Link,
  useStaticQuery,
  prefetchPathname,
} from "gatsby"

//styles / animation
import { TransitionGroup } from "react-transition-group"

import { quoteCalculator } from "../../static/hardcoded-svgs"
import { heroGraphic } from "../../static/heroGraphic.js"
import {
  Button,
  Icon,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  Slider,
  Switch,
  IconButton,
  Typography,
} from "@material-ui/core"
import { Phone } from "@material-ui/icons"
import CustomButton from "./customButton.js"

import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  typography: {
    color: theme.palette.background.default,
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  card: {
    background: theme.palette.background.secondary,
    borderRadius: theme.shape.brandBorderRadius,
    boxShadow: theme.shadows.brand,
    color: theme.palette.background.default,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}))

//prettier-ignore
export default function HeroHeader({ data, context, headerGraphic, headline, headlineDescription }) {
  const [quoteCalculatorState, changeQuoteCalculatorState] = React.useState({
    //tree costs
    canopyWidth: 0,

    treeWidth: 0,
    treeWidthCostMultiplier: 10, //1000% markup from centimetres width of tree

    treeHeight: 0,
    treeHeightCostMultiplier: 10, //1000% markup from centimetres height of tree

    stumpRemoval: false,
    stumpRemovalCostMultiplier: 2, //200% markup from centimetres width of tree

    //misc costs
    isPestPlant: false,
    pestPlantCostMultiplier: 0.1, //10%

    isRegulated: false,
    regulatedCostAmount: 200, //multiplier?

    //danger costs
    hazardDescription: "",

    //DANGERS
    isDangerous: false,
    dangersCost: 0,
    numberOfDangers: 0,
    dangers: {
      "large holes": 200,
      hollows: 125,
      "dying branches": 225,
      "tree leaning": 225,
      splits: 200,
      mushrooms: 100,
      "no ease of access": 200, //if not easily accessed
      "nearby fencing": 200,
    },

    //BIG DANGERS
    isExtremelyDangerous: false,
    extremeDangersCost: 0,
    numberOfExtremeDangers: 0,
    extremeDangers: {
      powerlines: 400,
      rot: 400,
      "pest damage": 400,
      "holes in tree": 400,
      "large tree": 400,
      "onto street": 400,
      "onto [another,others,etc.] property": 400,
      piping: 400,
    },

    //misc
    trimmingOnly: false,
    trimmingOnlyCostMultiplier: 0.05, //5%
    hedgeRemoval: false,
    hedgeRemovalCostMultiplier: 0.25, //25%

    treeWidthCost: 0,
    treeHeightCost: 0,
    canopyWidthCost: 0,
    totalCost: 0,
    discount: 0,
    discountPercentage: 0,
    location: "", //added via google maps api (in later update)
  })

  //re-calculate cost every time the quote state changes
  // prettier-ignore
  React.useEffect(() => {
    calculateTotalCost();

    invoiceFormat["Height of tree cost:"] = quoteCalculatorState.treeHeight * quoteCalculatorState.treeHeightCostMultiplier
    invoiceFormat["Width of tree cost"] = quoteCalculatorState.treeHeight *quoteCalculatorState.treeHeightCostMultiplier
    invoiceFormat["Number of trees cost"] = quoteCalculatorState.treeHeight *quoteCalculatorState.treeHeightCostMultiplier
    invoiceFormat["Detected dangers"] = quoteCalculatorState.numberOfDangers +quoteCalculatorState.numberOfExtremeDangers
    invoiceFormat["Cost of dangers"] = quoteCalculatorState.extremeDangersCost + quoteCalculatorState.dangersCost
    invoiceFormat["Discount Savings"] = quoteCalculatorState.discount + (quoteCalculatorState.totalCost * quoteCalculatorState.discountPercentage)

  }, [quoteCalculatorState])

  const calculateTotalCost = () => changeQuoteCalculatorState(prevState => ({
    // prettier-ignore
      ...prevState,
      totalCost: 0
        //tree costs
        + prevState.treeHeight * prevState.treeHeightCostMultiplier + prevState.treeWidth * prevState.treeWidthCostMultiplier
        //stump removal costs
        + prevState.stumpRemoval ? prevState.treeWidth * prevState.stumpRemovalCostMultiplier : 0
        //hedge removal costs
        + prevState.hedgeRemoval ? prevState.hedgeWidth * prevState.hedgeRemovalCostMultiplier : 0
        //stump tree costs
        + prevState.extremeDangersCost
        + prevState.dangersCost
        + prevState.regulatedCostAmount
        //discounting
        - prevState.discount
        * prevState.discountPercentage
  }))

  const calculateHeightCost = inputHeightInCentimetres =>
    changeQuoteCalculatorState(prevState => ({
      ...prevState,
      treeHeight: inputHeightInCentimetres,
    }))

  const calculateWidthCost = inputWidthInCentimetres =>
    changeQuoteCalculatorState(prevState => ({
      ...prevState,
      treeWidth: inputWidthInCentimetres,
    }))

  const calculateNumberOfTreesCost = numberOfTrees =>
    changeQuoteCalculatorState(prevState => ({
      ...prevState,
      numberOfTrees: numberOfTrees,
    }))

  const calculateStumpRemovalCost = () =>
    changeQuoteCalculatorState(prevState => ({
      ...prevState,
      stumpRemoval: !prevState.stumpRemoval,
    }))

  const calculateTreeHazardsCost = description => {
    const extremeDangersRegularExpression = new RegExp(
      "(?:(?:large holes)|(?:holes)|(?:dying branches)|(?:tree leaning)|(?:splits)|(?:mushrooms)|(?:no [ease of access,accessibility])|(?:nearby fencing))"
    ).exec(description)
    const dangerousDangerRegularExpression = new RegExp(
      "(?:(?:powerlines)|(?:rot)|(?:pest damage)|(?:holes in tree)|(?:large tree)|(?:onto street)|(?:onto [another,others,etc.] property)|(?:piping))"
    ).exec(description)

    //evaluate individual costs for each key term picked up
    //...

    changeQuoteCalculatorState(prevState => ({
      ...prevState,
      isDangerous: dangerousDangerRegularExpression.length > 0,
      isExtremelyDangerous: extremeDangersRegularExpression.length > 0,
      numberOfExtremeDangers: extremeDangersRegularExpression.length,
      numberOfDangers: dangerousDangerRegularExpression.length,
    }))
  }

  const centimetersToMilimetres = useCallback(cm => cm * 0.01, [])

  const milimeterToCentimetres = useCallback(milimeter => milimeter * 0.1, [])

  //ui
  const classes = useStyles()

  const sliderMarks = useCallback(
    (incrementCap = 100, increment = 10, displayText = "") => {
      return Array.from(Array(incrementCap).keys()).map(i => ({
        value: i * increment,
        label: i * increment.toString() + displayText,
      }))
    },
    []
  )
  const quoteCalculatorGraphic = useCallback(
    //prettier-ignore
    finalPrice => (
    <div className="position-relative mx-auto text-center" style={{ minHeight: "200px", color: "white" }}>
      <div style={{ minWidth: "200px", width: "100%" }} dangerouslySetInnerHTML={{ __html: quoteCalculator }}/>
      <Typography align="center" variant="h3" className={classes.typography + " position-absolute w-100"} style={{ top: "15%" }}>ESTIMATED COST</Typography>
      <Typography align="center" variant="body1" className={classes.typography + " position-absolute w-100"} style={{ top: "40%" }}>{finalPrice}</Typography>
    </div>
  ))

  //state is tied to quoteCalculatorState, therefore no need to turn into react state as it is already reactive
  let invoiceFormat = {
    "Height of tree cost:": 0,
    "Width of tree cost": 0,
    "Number of trees cost": 0,
    "Cost of dangers": 0,
    "Detected dangers": 0,
    "Discount savings": 0,
  }

  const showInvoice = React.useCallback(
    // prettier-ignore
    () => (
      <div className="position-relative text-center h-100 w-100 brand-section-bg d-flex flex-wrap p-4 mb-5 justify-content-evenly">
        {Object.keys(invoiceFormat).map(key => (
          <div className="d-flex flex-row">
            <Typography align="left" variant="h4" className={classes.typography + "w-25"}>{key}</Typography>
            <Typography align="left" variant="body2" className={classes.typography + "w-75"}>{invoiceFormat[key]}</Typography>
          </div>
        ))}
      </div>
    ),
    [quoteCalculatorState]
  )

  const valueText = value => `${value} cm`

  return (
    <section>
      {/* prettier-ignore */}
      <Typography variant="h1" component="h1" gutterBottom className="m-auto mb-3 mt-3 col-xl-8 col-10" style={{ fontWeight: "bolder" }}>
        QUOTE ESTIMATOR
      </Typography>
      <div className="position-relative mx-auto col-xl-8 col-10 d-flex flex-wrap justify-content-between">
        {/* prettier-ignore */}
        <Card className={(classes.root, classes.card) +" p-4 col-md-7 col-12 mb-3 brand-shadow"}>
          <CardHeader></CardHeader>

          <CardContent>
            <div className={classes.root}>
              <div>
                <Typography
                  component="h3"
                  variant="h3"
                  align="left"
                  className={classes.typography}
                  id="discrete-slider-always"
                  gutterBottom
                >
                  HEIGHT OF TREE
                </Typography>
                <Slider
                  step={10}
                  max={130}
                  marks={sliderMarks(14, 10)}
                  helperText="if the tree is above x mm, we will need to see the tree and quote it because it requires a permit and more detail to inspect it"
                  defaultValue={30}
                  valueLabelDisplay="on"
                  aria-labelledby="discrete-slider-always"
                  onChange={(event, value) => calculateHeightCost(value)}
                />
                {/* prettier-ignore */}
                <Typography component="h3" variant="h3" align="left" className={classes.typography} id="discrete-slider-always" gutterBottom >
                  WIDTH OF TREE
                </Typography>
                <Slider
                  step={10}
                  defaultValue={80}
                  valueLabelDisplay="on"
                  max={130}
                  marks={sliderMarks(14, 10)}
                  aria-labelledby="discrete-slider-always"
                  onChange={(event, value) => calculateWidthCost(value)}
                />
                {/* prettier-ignore */}
                <Typography component="h3" variant="h3" align="left" className={classes.typography} id="discrete-slider-always" gutterBottom>
                  NUMBER OF TREES
                </Typography>
                <Slider
                  step={1}
                  defaultValue={1}
                  valueLabelDisplay="on"
                  max={20}
                  marks={sliderMarks(21, 1, "")}
                  aria-labelledby="discrete-slider-always"
                  onChange={(event, value) => calculateNumberOfTreesCost(value)}
                />

                <div>
                {/* prettier-ignore */}
                  <Typography component="h3" variant="h3" align="left" className={classes.typography} id="discrete-slider-always" gutterBottom>
                    STUMP REMOVAL
                  </Typography>
                  <Switch
                    checked={quoteCalculatorState.stumpRemoval}
                    onChange={() => {}}
                    name="stump removal"
                    inputProps={{ "aria-label": "stump removal checkbox" }}
                    onChange={(event, value) =>
                      calculateStumpRemovalCost(value)
                    }
                  />
                </div>

                <Typography component="h3" variant="h3" align="left" className={classes.typography} id="discrete-slider-always" gutterBottom>
                  DESCRIBE THE TREE AND SURROUNDING AREA
                </Typography>
                <TextField
                  style={{ margin: 8 }}
                  placeholder="I have a tree thats close to powerlines that needs to be trimmed"
                  helperText="describe the surroundings around the tree/trees being removed, think about tree rot, powerlines, piping, splits, and cracks around the tree"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  onChange={(event, value) => calculateTreeHazardsCost(value)}
                />
              </div>
            </div>
            {/* {quoteCalculatorGraphic()} */}
          </CardContent>
        </Card>
        {/* prettier-ignore */}
        <Card className={(classes.root, classes.card) + " p-1 col-md-4 col-12 brand-shadow"}>
          <CardContent className="position-relative d-flex justify-content-between flex-column h-100">
            {showInvoice()}
            {quoteCalculatorGraphic(quoteCalculatorState.totalCost)}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

// const locations = [
// "ACT": 30$ travel fee *calculate the distance from kaleen from x amount per kilometre
// "NSW": 20-200$ out of state fee"
// ]

// number of trees = [
// 1: 0%
// >1: +10% waved
// ]

//in metres/cm *17$ per cm (width)
// canopy width = [

// 30cm: "500$"
// > 1.5: "regulated"
// ]

//in metres
// tree height = [
// 1:
// 12: "regulated"
// ]

//   regulated = "240$ + 20% deposit upfront + fees to hire specialists to assess precinct (charged after the tree is removed)"

// regulated means a tree will need approval from the conservator of fauna and flora
// due to covid applications are delayed for these permits

// is it a pest plant?? then it is not regulated

// base cost = "200$"
