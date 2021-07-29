import React, { useState, useEffect, useContext, useCallback } from "react"
import {
  StaticQuery,
  graphql,
  Link,
  useStaticQuery,
  prefetchPathname,
} from "gatsby"

//styles / animation
import * as axios from "axios"
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
  Grid,
} from "@material-ui/core"
import DateFnsUtils from "@date-io/date-fns"
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers"

import {
  Add,
  Nature,
  RestoreFromTrash,
  Warning,
  AttachMoney,
  Spa,
  ShoppingBasket,
  Close,
} from "@material-ui/icons"
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
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    zIndex: 1,
    position: "relative",
  },
  "& * > h4": {
    fontWeight: 700,
  },
  invoice: {
    color: theme.palette.text.primary,
  },
  invoiceCard: {
    background: theme.palette.background.primary,
    borderRadius: theme.shape.brandBorderRadius,
    boxShadow: theme.shadows.brand,
    color: theme.palette.background.default,
  },
  card: {
    background: theme.palette.background.secondary,
    borderRadius: theme.shape.brandBorderRadius,
    boxShadow: theme.shadows.brand,
    color: theme.palette.background.default,
  },
  bookingCard: {
    background: theme.palette.background.secondary,
    borderRadius: theme.shape.brandBorderRadius,
    boxShadow: theme.shadows.brand,
    padding: theme.spacing(4),
  },
  inputArea: {
    border: theme.shape.brandBorder,
    boxShadow: theme.shadows.brand,
    marginTop: `${theme.spacing(1)}px !important`,
    marginBottom: `${theme.spacing(1)}px !important`,
    borderRadius: theme.shape.brandBorderRadius,
    padding: theme.spacing(2),
  },
  textField: {

  },
}))

//prettier-ignore

export default React.memo(({ data, context, headerGraphic, headline, headlineDescription }) => {
  //#region quote calculation
  //in centimetres
  const defaultInput = {
    treeWidth: 30,
    treeHeight: 2,
    numberOfTrees: 1,
    stumpRemoval: true,
  }
  // let invoiceIcons = {
  //   "Cost per tree": Add,
  //   "Stump removal costs": RestoreFromTrash,
  //   "Cost of dangers": Warning,
  //   "Number of dangers": Warning,
  //   "HedgeRemovalCosts": Spa,
  //   "Discount": AttachMoney,
  //   "Number of trees cost": Add,
  //   "Total cost": AttatchMoney,
  // }

  //variable quote values in reflection to our rates
  const haknTreeRemovalRates = {
    treeWidthCostMultiplier: 10, //1000% markup from centimetres width of tree
    treeHeightCostMultiplier: 10, //1000% markup from meters height of tree
    stumpRemovalCostMultiplier: 0.3333333333333, //1/3 th eprice of the tree get the ceiling
    pestPlantCostMultiplier: 0.1, //10%
    trimmingOnlyCostMultiplier: 0.05, //5%
    hedgeRemovalCostMultiplier: 0.25, //25%

    regulatedCostAmount: 200, //multiplier?
    // regulatedCostMultiplier: 200, //multiplier?
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
    extremeDangers: {
      powerlines: 400,
      rot: 400,
      "pest damage": 400,
      "holes in tree": 400,
      "large tree": 400,
      "onto street": 400,
      "onto [another,others,etc.] property": 400,
      "piping": 400,
    },
  }

  const [quoteCalculatorState, changeQuoteCalculatorState] = React.useState({
    //tree costs
    canopyWidth: 0,
    treeWidth: defaultInput.treeWidth,
    treeHeight: defaultInput.treeHeight,
    stumpRemoval: defaultInput.stumpRemoval,
    numberOfTrees: defaultInput.numberOfTrees,

    //misc costs
    isPestPlant: false,
    isRegulated: false,

    //danger costs
    hazardDescription: "",

    //DANGERS
    dangersCost: 0,
    numberOfDangers: 0,

    //BIG DANGERS
    extremeDangersCost: 0,
    numberOfExtremeDangers: 0,

    //misc
    trimmingOnly: false,
    hedgeRemoval: false,

    totalCost: 0,
    discount: 0,
    discountPercentage: 0,
    location: "", //added via google maps api (in later update)
  })

  const [invoiceState, changeInvoiceState] = React.useState({
    "Cost per tree": 0,
    "Stump removal per tree cost": 0,
    "Cost of dangers": 0,
    "Number of dangers": 0,
    "HedgeRemovalCosts": 0,
    "Discount": 0,
    "Number of trees cost": 0,
    "Total cost": 0,
  })

  //every time the quote calculator state is changed, recalculate the invoice, calculated on component mount aswell
  useEffect(() => calculateTotalCost(), [, quoteCalculatorState])
  useEffect(() => calculateTotalCost(), [])

  const calculateTotalCost = () => {
    let truncateAmount = 2;
    let currentQuote = quoteCalculatorState
    // alert(!currentQuote.stumpRemoval)//value isnt updated when its needed to, this compensates for that
    let treeCosts = Number(Number((Math.round(currentQuote.treeHeight * haknTreeRemovalRates.treeHeightCostMultiplier)) + (currentQuote.treeWidth * haknTreeRemovalRates.treeWidthCostMultiplier)).toFixed(truncateAmount))
    let stumpRemovalCosts = Number(Number(currentQuote.stumpRemoval ? treeCosts * haknTreeRemovalRates.stumpRemovalCostMultiplier : 0).toFixed(truncateAmount))
    let dangerCosts = Number(Number(currentQuote.extremeDangersCost + currentQuote.dangersCost + currentQuote.isRegulated ? haknTreeRemovalRates.regulatedCostAmount : 0).toFixed(truncateAmount))
    let hedgeRemovalCosts = Number(Number(currentQuote.hedgeRemoval ? currentQuote.hedgeWidth * haknTreeRemovalRates.hedgeRemovalCostMultiplier : 0).toFixed(truncateAmount))
    let discounting = Number(Number(currentQuote.discount * currentQuote.discountPercentage).toFixed(truncateAmount))

    //calculates final value
    let numberOfTreesCost = Number(Number((treeCosts + stumpRemovalCosts + dangerCosts) * currentQuote.numberOfTrees).toFixed(truncateAmount))
    let totalCost = numberOfTreesCost
    //if number of trees is zero, no treeCosts
    // if(currentQuote.numberOfTrees === 0){
    //   treeCosts = 0
    //   stumpRemovalCosts = 0
    //   dangerCosts = 0
    // }

    //detail of costs in an object
    let treeCostsObject = {
      "Cost per tree": treeCosts,
      "Stump removal costs": stumpRemovalCosts,
      "Cost of dangers": dangerCosts,
      "Number of dangers": currentQuote.numberOfDangers + currentQuote.numberOfExtremeDangers,
      "HedgeRemovalCosts": hedgeRemovalCosts > 0 ? hedgeRemovalCosts : 0,
      "Discount": discounting,
      "Number of trees cost": numberOfTreesCost,
      "Total cost": totalCost,
    }
    // console.log(invoiceState)

    //only change the invoice state since the quote is only reactive to user input
    changeInvoiceState(treeCostsObject)
  };


  //#region tree cost calculations from user input
  const calculateHeightCost = React.useCallback(inputHeightInCentimetres => {
    changeQuoteCalculatorState(prevState => ({
      ...prevState,
      treeHeight: inputHeightInCentimetres,
    }))
  }, [quoteCalculatorState])

  const calculateWidthCost = React.useCallback(inputWidthInCentimetres => {
    changeQuoteCalculatorState(prevState => ({
      ...prevState,
      treeWidth: inputWidthInCentimetres,
    }))
  }, [quoteCalculatorState])

  const calculateNumberOfTreesCost = React.useCallback(numberOfTrees => {
    changeQuoteCalculatorState(prevState => ({
      ...prevState,
      numberOfTrees: numberOfTrees,
    }))
  }, [quoteCalculatorState])

  //switch is fucking inverted becauase its really dumb so ill fix it later
  const calculateStumpRemovalCost = React.useCallback((checked) => {

    //change the stump removal boolean to the checked value, ensure the state is updated then calculate the total cost
    changeQuoteCalculatorState(prevState => ({
      ...prevState,
      stumpRemoval: checked,
    }))
    // alert(quoteCalculatorState.stumpRemoval + " " + checked)
  }, [quoteCalculatorState])

  const calculateTreeHazardsCost = React.useCallback(description => {
    const extremeDangersRegularExpression = new RegExp(
      "(?:(?:large holes)|(?:holes)|(?:dying branches)|(?:tree leaning)|(?:splits)|(?:mushrooms)|(?:no [ease of access,accessibility])|(?:nearby fencing))"
    ).exec(description)
    const dangerousDangerRegularExpression = new RegExp(
      "(?:(?:powerlines)|(?:rot)|(?:pest damage)|(?:holes in tree)|(?:large tree)|(?:onto street)|(?:onto [another,others,etc.] property)|(?:piping))"
    ).exec(description)

    console.log(extremeDangersRegularExpression)
    console.log(dangerousDangerRegularExpression)

    //evaluate individual costs for each key term picked up
    changeQuoteCalculatorState(prevState => ({
      ...prevState,
      isDangerous: dangerousDangerRegularExpression.length > 0,
      isExtremelyDangerous: extremeDangersRegularExpression.length > 0,
      numberOfExtremeDangers: extremeDangersRegularExpression.length,
      numberOfDangers: dangerousDangerRegularExpression.length,
    }))
  }, [quoteCalculatorState])

  const centimetersToMilimetres = useCallback(cm => cm * 0.01, [])
  const centimetersToMeters = useCallback(cm => cm * 0.01, [])
  const milimeterToCentimetres = useCallback(milimeter => milimeter * 0.1, [])
  //#endregion tree cost calculations from user input

  //ui
  const classes = useStyles()

  const sliderMarks = useCallback(
    (incrementCap = 100, increment = 10, displayText = "cm", truncateAmount = 1, offset = 0) => {
      return Array.from(Array(Math.ceil((incrementCap + 1) / increment)/*compensate for zero indexing*/).keys()).map(i => ({
        value: (i * increment + offset).toFixed(truncateAmount),
        label: (i * increment + offset).toFixed(truncateAmount) + displayText,
      }))
    },
    []
  )
  const quoteCalculatorGraphic = useCallback(
    //prettier-ignore
    finalPrice => (
      <div className="position-relative mx-auto text-center w-100" style={{ marginTop: '25px', color: "white" }}>
        <div style={{ minWidth: "200px", zIndex: 0 }} className="position-absolute bottom-0 w-100 h-100" dangerouslySetInnerHTML={{ __html: quoteCalculator }} />
        <Typography align="center" variant="h4" gutterBottom className={classes.typography} style={{ fontWeight: 'bold' }}>ESTIMATED COST</Typography>
        <Typography align="center" variant="h2" gutterBottom className={classes.typography} >{
          invoiceState["Total cost"] + "$"}</Typography>
      </div>
    ), [, invoiceState])

  //state is tied to quoteCalculatorState, therefore no need to turn into react state as it is already reactive
  const showInvoice = React.useCallback(
    // prettier-ignore
    () => (
      //if invoiceState has all 0 then dont continue
      <Grid container spacing={1} className={classes.invoiceCard + " position-relative text-center mx-auto w-100 p-4 mb-6 justify-content-evenly"}>
        {Object.keys(invoiceState).map(key => invoiceState[key] > 0 &&
          <Grid container item xs={12} spacing={2} key={key}>
            <Grid item xs={8}>
              {/* <Icon color="primary">{inv}</Icon> */}
              <Typography align="left" variant="h4" className={classes.invoice + "w-100"}>{key}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography align="left" variant="body1" className={classes.invoice + "w-100"}>{invoiceState[key]}</Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    ),
    [, invoiceState]
  )
  //#endregion quoteCalculation

  ///#region booking
  //#region sms and google sheet api functions
  // this state is seperate from quote calculation, we send the quote invoices to google sheets and sms them along with this input thats specifically for booking
  const [bookingState, setBookingState] = React.useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    availibility: [
      new Date('2014-08-18T21:11:54'),
    ],

    city: '',
    state: '',
    zip: '',
    country: '',
    //get the current date in the format mm/dd/yyyy
    date: new Date('2014-08-18T21:11:54'),
    //get the current time 
    time: '',

    notes: '',
    isBooking: false,
    isBooked: false,
    isSMS: false,
    isGoogleSheet: false,
  });

  const makeABooking = (newBookingValue) => {
    //take object in paramater referencing a value from bookingState and change that value while including all others at there current state
    setBookingState({ ...bookingState, ...newBookingValue })
  }

  const submitBooking = React.useCallback(() => {
    sendToGoogleSheets(bookingState);
    sendSmsToHakn(bookingState);

    //mark booking as complete
    setBookingState({ ...bookingState, isBooked: true })
  }, [bookingState])


  //#region sms and google sheet api functions
  const salt = process.env.SALT
  const googleApiKey = process.env.GOOGLEAPIKEY
  const googleSheetsUrl = process.env.GOOGLESHEETSURL
  const googleSheetsUrlReadOnly = process.env.GOOGLESHEETSURLREADONLY
  const googlePrivateKey = process.env.GOOGLEPRIVATEKEY
  const googleSheetDocumentUrl = process.env.GOOGLESHEETDOCUMENTURL;

  const smsApiKey = process.env.SMSAPIKEY
  const rapidApiApp = process.env.RAPIDAPIAPP
  const rapidApiKey = process.env.RAPIDAPIKEY
  const rapidApiHost = process.env.RAPIDAPIHOST

  const clickSendUserName = process.env.CLICKSENDUSERNAME
  const clickSendApiKey = process.env.CLICKSENDAPIKEY

  //encrypt input with sha256 and a salted hash
  const encrypt = (input) => {
    const hash = crypto.createHash('sha256')
    const saltedInput = salt + input
    hash.update(saltedInput)
    const encrypted = hash.digest('hex')
    return encrypted
  }

  const decrypt = (encrypted) => {
    const hash = crypto.createHash('sha256')
    const saltedInput = salt + encrypted
    hash.update(saltedInput)
    const decrypted = hash.digest('hex')
    return decrypted
  }

  const sendToGoogleSheets = React.useCallback(({ firstName, lastName, phone, address, quoteEstimation }) => {
    var options = {
      method: 'POST',
      url: 'https://google-sheets-toolbox.p.rapidapi.com/',
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-key': '02205cebf5msh7dfde80a40b1478p19f9fajsna9c5b4a50f76',
        'x-rapidapi-host': 'google-sheets-toolbox.p.rapidapi.com'
      },
      data: {
        action: 'add rows',
        options: {
          addNewRows: [['firstname', firstName], ['lastname', lastName], ['phone', phone], ['address', address], ['quoteEstimation', quoteEstimation]],
          googleClientEmail: 'rapidapi-demo@coinsy-alpha.iam.gserviceaccount.com',
          googlePrivateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCVDX9BEIew4c2p\noxv/oglrGIHhzwZWfkwK9OeCJ07fDOGA7gH81Co2v+7yGzWW61i5T7dbFjsHuxwT\nwbNK4B5Vc1SRV8tSxJt5F5HQYRbieAxg80xswXHevmK/lxeVjlJ/kzGcs2Ajx0Kz\nBocLMUBAh20uEor1ROeBf05NZGXu8S03C5Khr5FLotWzPO7i37qpYbLba4ZeIHIn\nW27rQShvDs0LWn/vB/u6ATp5G2Mjl7OrI6h8IxjQNbilbexOnWHCZvsNfG4f1DUu\n/MeW2E87ofxjiZo1sc8qr9lZfBg0oVEGHnDc2glQJmNdxg1PuRsKeDOGNj/mv5uf\neWYnjkarAgMBAAECggEACFVI2Apki68UIHfOCOy2OhaUrFs2r39AIRywFMa90hqW\nQO8NjWUPNyBj64U56cYen72lMqJ7imMbnr8llvoQuBZKlBWkeGwlhQ+cR1omPWMY\nzhLMIwhtpVZfjvaTivj6A8fm7ivZJCbvw7KJukZ2oSTxJbJDspK3nrXPWuRSDpm3\nZOOOpRqj/FJqUWblqKjXXZNGUp9n9JMgI5CtcaHO7rAovU7vm19yN90DHAdVk474\ndUaSPHl/rpdPUhWXcTLSGGBVBjAq5QlLUadgM/thPSa5wI29KlQcneEp5yQA4O3v\nJCA/w3Uf+0AVsbjqOhF9edfYJKAl7FqfQfjJ6ysvgQKBgQDG9eA2SQX816tcSLpa\nifI3y+bNXGiz6Vyo7wuamKWPYNfDG75ndssYQFJipeKsNnH16uPOTydGL8A1pFXT\ny+3YUMPkBo2hphVpAgHlREapz8MQl8p0rlspSvcFNIKMxnZPztJLZJxMSr3IQpgg\nt02W4H4t2fV0nwZ3mpru6+BQdQKBgQC/yMnbLqa1gO8vXiDUGU/ijnu99RvLeHZS\nQTKxgZytJKL032w9whXuJMarmFxgFjEy1Y6y1hXNlwb8Mw58pb3W6jN7LtCKJ9h8\nCiL/tl75yTfe/YdpKDo3D/JqezMdh/Z1VYYBcBMEim8/T9Fr0/fYVTQDrwcLPr3r\nPnAUlMFWnwKBgQCnzbQ+1LPyHkvu14Ak4Hejy5tr1OaR5t45tPOKffgUx07yxbF/\nPdfpKkbR4KsfKARRrrxXwraTIa7xDxs8OKDvcp7k8Qn/Lj6chA7pOP6INiyFECC2\n7F8CorFYeIMrDC+4++ytnbudNOR/xHreDPuppsmFDnFQ3NbthT3rCJH2CQKBgQCR\njcc9dVOLD1b4oTzTHH7XmIHrsnos27kZRmg99fu+IL8Yj/TrjkDso7awhwsc1drz\nFMefjQGxLf1cLTfCfFvvH4KA7A/Tutf/lAXqAzRj6UZhFBPQSHqeTZkTHXu23vi7\nJnR05OVaHeK+r0pmxtIkus2mOhFjhHPJdXLE+/0cSwKBgFmXQSHousyeZBwaRIya\n3Xwt17yWxOoS0Mw6RWNDu4J7MiYlSpdzBxOD/qqDFHcRxi03/9xu9rVG19in64x5\n8nEEN133yBS/e9YHAjOj7MYuPs/hmD1NhKmrP0vxQmD0dWtTruB6wQf+oFpk02Al\nEJWyjwxBP9dIQBy+9CJleHaF\n-----END PRIVATE KEY-----\n',
          googleSheetId: '1ZFCz4jCEhlDgZg5Ii5OZVlmOQwffb8geY2N1NuR5_RE',
          googleSheetTabTitle: 'Clients'
        }
      }
    };


    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }, [])


  const sendSmsToHakn = React.useCallback(({ firstName, lastName, phone, address, quoteEstimation }) => {
    var options = {
      method: 'POST',
      url: 'https://inteltech.p.rapidapi.com/send.php',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-rapidapi-key': '02205cebf5msh7dfde80a40b1478p19f9fajsna9c5b4a50f76',
        'x-rapidapi-host': 'inteltech.p.rapidapi.com'
      },
      data: {
        username: 'temp-idk-test-dynamic',
        key: '1B490066-EA03-E39A-A18C-C4868E45CFAE',
        return: 'http://yourwebsite.com',
        schedule: '1377959755',
        senderid: 'MyCompany',
        message: `ALERT: client ${firstName + " " + lastName} has requested a quote with the following information, | quote-estimate: ${quoteEstimation} | address: ${address} | see google sheets: ${googleSheetDocumentUrl} `,
        sms: '+61459289772'
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }, [])
  //#endregion sms and google sheet api functions
  //#endregion booking

  return (
    <section id="#getaquote">
      {/* prettier-ignore */}
      <Typography variant="h2" gutterBottom className="m-auto mb-3 mt-3 col-xl-8 col-md-10 col-11" style={{ fontWeight: "bolder" }}>
        QUOTE ESTIMATOR
      </Typography>
      <div className="position-relative mx-auto col-xl-8 col-10 d-flex flex-wrap justify-content-between">
        {/* prettier-ignore */}
        <Card className={(classes.root, classes.card) + " p-3 col-md-7 col-12 mb-3"}>
          <CardContent>
            <Grid container justifyContent="center">

              <Grid container spacing={4} justifyContent="space-evenly" id="quoteCalculator">
                <Grid item xs={5} className={classes.inputArea}>
                  <Typography variant="h4" align="left" className={classes.typography} gutterBottom>
                    HEIGHT OF TREE {/*in metres, cap at 1.5 metres (excessive is a regulated tree)*/}
                  </Typography>
                  <Slider
                    step={.5}
                    max={12}
                    // marks={sliderMarks(12, .5,"m")}
                    marks={true}
                    defaultValue={2}
                    valueLabelDisplay="on"
                    aria-labelledby="discrete-slider-always"
                    onChange={(event, value) => calculateHeightCost(value)}
                  />
                </Grid>

                <Grid item xs={5} className={classes.inputArea}>
                  <Typography variant="h4" align="left" className={classes.typography}  gutterBottom >
                    WIDTH OF TREE {/*in centimetres, cap at 12cm*/}
                  </Typography>
                  <Slider
                    step={10}
                    defaultValue={30}
                    valueLabelDisplay="on"
                    max={130}
                    marks={true}
                    // dontshowticks 
                    aria-labelledby="discrete-slider-always"
                    onChange={(event, value) => calculateWidthCost(value)}
                    sx={{
                      "& .MuiSlider-rail":{
                        color: 'aqua',
                      },
                      "& .MuiSlider-thumb": {
                        '& * > .PrivateValueLabel-label-30': {
                          transform: 'rotate(225deg) !important',
                          '& * > .PrivateValueLabel-circle-29': {
                            transform: 'rotate(135deg) !important',
                            '& * > .PrivateValueLabel-offset-28': {
                              transform: 'scale(1) translateY(56px) !important'
                            }
                          },
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={11} className={classes.inputArea}>
                  <Typography variant="h4" align="left" className={classes.typography} gutterBottom>
                    NUMBER OF TREES
                  </Typography>
                  <Slider
                    step={1}
                    defaultValue={1}
                    valueLabelDisplay="on"
                    max={20}
                    marks={sliderMarks(20, 1, "", 0, 0)}
                    aria-labelledby="discrete-slider-always"
                    onChange={(event, value) => calculateNumberOfTreesCost(value)}
                  />
                </Grid>

                <Grid item container xs={11} className={classes.inputArea}>
                  <Grid item xs={3}>
                    <Typography variant="h4" align="left" className={classes.typography} gutterBottom>
                      STUMP REMOVAL
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Switch
                      checked={quoteCalculatorState.stumpRemoval}
                      color="primary"
                      name="stump removal"
                      inputProps={{ "aria-label": "stump removal checkbox" }}
                      onChange={(event, checked) => calculateStumpRemovalCost(checked)}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {bookingState.isBooking && !bookingState.isBooked && (
                <Grid container spacing={3} justifyContent="space-evenly" id="booking" className={classes.bookingCard}>
                  <CardActions>
                    {/* close icon button on this material ui grid container that closes the booking  */}
                    <IconButton onClick={() => makeABooking({ isBooking: false })}>
                      <Close color="primary" fontSize="large" />
                    </IconButton>
                  </CardActions>

                  <Grid item xs={12} className={classes.inputArea}>
                    <Typography variant="h3" align="left" className={classes.typography} gutterBottom>
                      DESCRIBE THE TREE AND SURROUNDING AREA
                    </Typography>
                    <TextField
                      style={{ margin: 8 }}
                      placeholder="I have a tree thats close to powerlines that needs to be trimmed"
                      helperText="describe the surroundings around the tree/trees being removed, think about tree rot, powerlines, piping, splits, and cracks around the tree"
                      fullWidth
                      multiline
                      maxRows={10}
                      margin="normal"
                      // InputLabelProps={{
                      //   shrink: true,
                      // }}
                      variant="outlined"
                      onChange={(event, value) => calculateTreeHazardsCost(value)}
                    />
                  </Grid>

                  <Grid item xs={6} >
                    <Typography variant="h4" align="left" className={classes.typography} id="discrete-slider-always" gutterBottom>
                      FULL NAME
                    </Typography>
                    <TextField
                      style={{ margin: 8 }}
                      placeholder="Mary sue"
                      helperText="Full name with first and last name"
                      fullWidth
                      multiline
                      maxRows={10}
                      margin="normal"
                      // InputLabelProps={{
                      //   shrink: true,
                      // }}
                      variant="outlined"
                      onChange={(event, value) => makeABooking({ fullName: value })}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="h4" align="left" className={classes.typography} id="discrete-slider-always" gutterBottom>
                      ADDRESS
                    </Typography>
                    <TextField
                      style={{ margin: 8 }}
                      placeholder="unit-number street-name suburb territory"
                      helperText="Unit number, street name, suburb, then the territory (ie: ACT)"
                      fullWidth
                      multiline
                      maxRows={10}
                      margin="normal"
                      // InputLabelProps={{
                      //   shrink: true,
                      // }}
                      variant="outlined"
                      onChange={(event, value) => makeABooking({ address: value })}
                    />
                  </Grid>

                  <Grid item container xs={12} className={classes.inputArea}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid item xs={6} className={classes.inputArea}>
                        <Typography variant="h3" align="left" className={classes.typography} id="discrete-slider-always" gutterBottom>
                          AVAILIBILITY
                        </Typography>
                      </Grid>
                      <Grid item xs={6} className={classes.inputArea}>
                        <KeyboardDatePicker
                          margin="normal"
                          id="date-picker-dialog"
                          label="Date picker dialog"
                          format="MM/dd/yyyy"
                          value={new Date()}
                          onChange={(event, value) => makeABooking({ date: value })}
                          KeyboardButtonProps={{ 'aria-label': 'change date', }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </CardContent>
          <CardActions>
            {/* toggle booking state */}
            <CustomButton
              shadow
              action={() => makeABooking({ isBooking: true })}
              label="Book Online"
              Icon={ShoppingBasket}
              color="secondary"
              disabled={bookingState.isBooked}
            >
              {bookingState.isBooking ? 'Submit booking' : 'Create a booking online'}
            </CustomButton>
          </CardActions>
        </Card>
        {/* prettier-ignore */}
        <Card className={(classes.root, classes.card) + " p-1 col-md-4 col-12 brand-shadow"}>
          <CardContent className="position-relative d-flex justify-content-end flex-column h-100">
            {showInvoice()}
            {quoteCalculatorGraphic()}
          </CardContent>
        </Card>
      </div>
    </section>
  )
})

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
