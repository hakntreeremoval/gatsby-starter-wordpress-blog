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
  media: {
    height: 0,
    // paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    margin: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
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
}))

export default React.memo(({ serviceData, title }) => {
  const classes = useStyles()

  const [expanded, setExpanded] = React.useState(false)
  //prettier-ignore
  const handleExpandClick = () => setExpanded(!expanded)
  //prettier-ignore
  const contentBox = React.useCallback(img => (
    <div
      onClick={() => handleExpandClick()}
      className="my-4 top-0 mx-auto"
      style={{ minWidth: "250px",maxWidth: "250px", mixBlendMode: "multiply" }}
      dangerouslySetInnerHTML={{ __html: styledContentBox(img) }}
    />
  ))

  return (
    <section>
      <Typography
        variant="h2"
        gutterBottom
        className="m-auto mb-3 mt-3 col-xl-8 col-md-10 col-11"
        style={{ fontWeight: "bolder" }}
      >
        {title}
      </Typography>
      <div className="col-xl-8 col-10 brand-section-bg mx-auto p-4">
        <div className="d-flex flex-wrap">
          {serviceData.map(data => (
            <div className="position-relative mx-auto top-0" key={data.title}>
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
                {contentBox(data.image)}
                <CardActions
                  disableSpacing
                  style={{ marginTop: "-65px", zIndex: 25 }}
                >
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    color="secondary"
                    onClick={() => handleExpandClick()}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon
                      fontSize="large"
                      color="secondary"
                      className="brand-shadow brand-border-radius p-1 brand-primary"
                    />
                  </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
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
