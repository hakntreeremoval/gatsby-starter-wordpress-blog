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
} from "@material-ui/core"
import { grass, styledContentBox } from "../../static/hardcoded-svgs"

//create jss styles to be used in the following component via const classes=useStyles()
const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    background: "none",
    textAlign: "center",
    padding: "0px",
  },
  serviceCard: {
    position: "relative",
    pointerEvents: "all",
    margin: "auto",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    top: 0,
    height: '100%',
    borderRadius: theme.shape.brandBorderRadius,
    boxShadow: 'none',
    background: theme.palette.background.primary,
    padding: theme.spacing(4),
    border: theme.shape.brandBorder,
    "&:hover": {
        boxShadow: theme.shadows.brand,
    }
  },
  serviceCardImage: {
    // { minWidth: "150px",maxWidth: "fit-content", mixBlendMode: "multiply" }
    width: "100%",
    height: "100%",
    background: "none",
    mixBlendMode: "multiply",
    maxWidth: '400px',      
    top: 0,
    position: "relative",
    // minWidth: '225px',      
    minWidth: '235px',      
  },
  media: {
    height: 0,
    // paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    margin: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.complex,
    }),
  },
  contentBox: {
    boxShadow: theme.shadows.brand,
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  sectionColor: {
    backgroundColor: theme.palette.text.primary,
  },
  section: {
    background: theme.palette.background.primary,
    boxShadow: theme.shadows.brand,
    borderRadius: theme.shape.brandBorderRadius,
  }
}))

export default React.memo(({ serviceData, title,id }) => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(Array.from(Array(serviceData.length).keys()).map((i) => i==0 ? true : false))
  
  const handleExpandClick = (index) => 
  //set index in array to true and allow it to be toggled, while all other items remain false
  setExpanded([...Array(serviceData.length).keys()].map((i) => i === index ? true : false))

  const contentBox = React.useCallback((img,index) => (
    <div
      onClick={() => handleExpandClick(index)}
      className={classes.serviceCardImage+" my-4 top-0 mx-auto"}
      dangerouslySetInnerHTML={{ __html: styledContentBox(img) }}
    />
  ))

  return (
    <section id={id}>
      <Typography
        variant="h2"
        gutterBottom
        className="m-auto mb-3 col-xl-8 col-md-10 col-11"
        style={{ fontWeight: "bolder" }}
      >
        {title}
      </Typography>
      <div className={classes.section+" col-xl-8 col-10 mx-auto p-4"}>
        <div className="d-flex flex-wrap">
          {serviceData.map((data,index) => (
            <div onClick={() => handleExpandClick(index)} className={classes.serviceCard} key={data.title}>
              <Card className={classes.root} elevation={0} key={data.title + Math.random()}>
                <CardContent>
                  <Typography
                    variant="h3"
                    className="m-auto"
                    color="secondary"
                    style={{ marginbottom: "-50px" }}
                  >
                    {data.title}
                  </Typography>
                </CardContent>
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
                <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography
                      align="left"
                      variant="body1"
                      color="secondary" 
                    >
                      {data.description}
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})
