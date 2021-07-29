import * as React from "react"
import { makeStyles } from "@material-ui/core/styles"
import clsx from "clsx"
import { red } from "@material-ui/core/colors"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Grid,
} from "@material-ui/core"
import { grass, styledContentBox } from "../../static/hardcoded-svgs"

//create jss styles to be used in the following component via const classes=useStyles()
const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 700,
    margin: 'auto',
    background: "none",
    textAlign: "center",
    padding: "0px",
    transition: theme.transitions.create("all", {
      duration: theme.transitions.duration.complex,
    }),
  },
  serviceCard: {
    order: 1,
    position: "relative",
    pointerEvents: "all",
    top: 0,
    maxHeight: 400,
    margin: `${theme.spacing(1)}px !important`,//override grid spacing because its shiiiiiit in this case
    borderRadius: theme.shape.brandBorderRadius,
    boxShadow: 'none',
    background: theme.palette.background.primary,
    padding: theme.spacing(3),
    border: theme.shape.brandBorder,
    "&:hover": {
      boxShadow: theme.shadows.brand,
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
    transition: theme.transitions.create(["padding",'width','height','box-shadow'], {
      duration: theme.transitions.duration.complex,
    }),
  },
  //same as service card except on mobile it takes full width
  expandedCard: { 
    order: 0,
    position: "relative",
    margin: "auto",
    height: '100%',
    borderRadius: theme.shape.brandBorderRadius,
    boxShadow: 'none',
    background: theme.palette.background.primary,
    padding: theme.spacing(3),
    border: theme.shape.brandBorder,
    "&:hover": {
      boxShadow: theme.shadows.brand,
    }, 
    transition: theme.transitions.create(["padding",'width','height','box-shadow'], {
      duration: theme.transitions.duration.complex,
    }),
  }, 
  serviceCardImage: {
    // { minWidth: "150px",maxWidth: "fit-content", mixBlendMode: "multiply" }
    width: "50%",
    height: "100%",
    background: "none",
    mixBlendMode: "multiply",      
    top: 0,
    position: "relative",  
  },
  expand: {
    transform: "rotate(0deg)",
    width: '100%',
    margin: "auto",
  },
  contentBox: {
    boxShadow: theme.shadows.brand,
  },
  expandOpen: {
    transform: "rotate(180deg)",
  }, 
  section: {
    // background: theme.palette.background.primary,
    // boxShadow: theme.shadows.brand,
    borderRadius: theme.shape.brandBorderRadius,
  },
  cardTypography: {
    border: theme.shape.brandBorder,
    borderRadius: theme.shape.brandBorderRadius,
    padding: theme.spacing(4),
    background: theme.palette.background.default,
  },
  typography: {
    // textAlign: 'center',
    height: '60px',
    padding: '0px !important',
  }
}))

export default React.memo(({ serviceData, title,id }) => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(Array.from(Array(serviceData.length).keys()).map((i) => /*i==0 ? true :*/false))
  
  const handleExpandClick = (index) => 
  //set index in array to true and allow it to be toggled, while all other items remain false
  setExpanded([...Array(serviceData.length).keys()].map((i) => i === index ? !expanded[i] : false))

  const contentBox = React.useCallback((img,index) => (
    <div
      onClick={() => handleExpandClick(index)}
      className={classes.serviceCardImage+" my-4 top-0 mx-auto"}
      dangerouslySetInnerHTML={{ __html: styledContentBox(img) }}
    />
  ))

  const anyExpanded = React.useCallback((index) => expanded.some((e) => e), [expanded])

  return (
    <section id={id}>
      <Typography
        variant="h2"
        gutterBottom
        align="center"
        className="m-auto mb-3 col-xl-8 col-md-10 col-11"
        style={{ fontWeight: "bolder" }}
      >
        {title}
      </Typography>
      <div className={classes.section+" col-xl-8 col-11 mx-auto"}>
        {/* <div className="d-flex flex-wrap justify-content-center"> */}
        <Grid container justifyContent={`${anyExpanded()?'left':'center'}`}>
          {serviceData.map((data,index) => (
            <Grid item 
              xs={expanded[index]?12:3}
              md={expanded[index]?12:3}
              lg={expanded[index]?12:3}
              xl={expanded[index]?12:2}
              onClick={() => handleExpandClick(index)} className={expanded[index]?classes.expandedCard:classes.serviceCard} key={data.title}
            >
              <Card className={classes.root} elevation={0} key={data.title + Math.random()}>
                  <Typography
                    variant="h3"
                    align="center"
                    className={classes.typography}
                    color="secondary"
                    style={{ marginbottom: "-50px" }}
                  >
                    {data.title}
                  </Typography>
                {contentBox(data.image,index)}
                <CardActions
                  disableSpacing
                  style={{ marginTop: "-65px", zIndex: 25 }}
                >
                {/* large button */}
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded[index],
                    })}
                    color="secondary"
                    aria-expanded={expanded[index]}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon
                      fontSize="large"
                      color="secondary"
                      className="brand-shadow brand-border-radius p-1 brand-primary"
                    />
                  </IconButton>
                </CardActions>
                <Collapse in={expanded[index]} timeout="auto">
                  <CardContent>
                    <Typography
                      align="left"
                      variant="body1"
                      color="secondary" 
                      className={classes.cardTypography}
                    >
                      {data.description}
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  )
})
