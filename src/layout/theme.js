// This is where I define elements of my theme.
import { createMuiTheme } from "@material-ui/core"

export const theme = createMuiTheme()

//brand color primary
theme.palette.primary.main = "#EC973C"
theme.palette.secondary.main = "#3F310E"
// theme.palette.secondary.main = "#3F310E"
//brand text
theme.palette.text.primary = "#3F310E"
//brand gradient
theme.palette.text.secondary = "##DDD1B3 "
//brand background
theme.palette.background.default = "#F2E5C4"
theme.palette.error.main = "red"
theme.overrides.MuiBackdrop = "red"

//typography
theme.spacingFromHeader = theme.spacing(6)
theme.typography.fontFamily = "Source Sans Pro"
theme.typography.h1.fontFamily = "Berlin-Sans-FB"

theme.typography.h5 = {
  fontSize: "12px",
  fontWeight: 400,
  color: theme.palette.text.primary,
}

theme.typography.h4 = {
  fontSize: "14px",
  fontWeight: 500,
  color: theme.palette.text.primary,
}

theme.typography.h3 = {
  // fontSize: "16px",
  fontSize: "1.5vw",
  fontWeight: "600",
  color: theme.palette.text.primary,
}

theme.typography.body1 = {
  fontSize: "1vw",
  color: theme.palette.text.primary,
}

theme.typography.h1 = {
  // fontSize: "5rem",
  fontSize: "4vw",
  color: theme.palette.text.primary,
  fontWeight: 800,
}
