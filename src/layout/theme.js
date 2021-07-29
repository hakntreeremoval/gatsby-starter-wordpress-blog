// This is where I define elements of my theme.
import { createMuiTheme, createTheme } from "@material-ui/core"

export const theme = createTheme()


//convert object to a string, inject paramater input into the string object, then convert it back to an object 
export const objectTokenizer = (object,parameter) => {
  return JSON.stringify(object,null,2).replace(/"([a-zA-Z]+)"/g,(match,p1)=>{
    return `"${parameter[p1]}`
  })
}

//take input font size reduce it by a third, then recursively continue this pattern from breakpoints xl, lg, md, and sm as a function to output
const fontReducerForThemeBreakpoint = (fontSize,breakpoint="md",reduceRatio=0.66666667) => {
  return {
    fontSize: `${fontSize}`,
    [theme.breakpoints.down(breakpoint)]: { 
      fontSize: `${fontSize * reduceRatio}`,
    },
  }
} 


//brand color primary
theme.palette.primary.main = "#EC973C"
theme.palette.secondary.main = "#3F310E"
// theme.palette.secondary.main = "#3F310E"
//brand text
theme.palette.text.primary = "#3F310E"
//brand gradient
theme.palette.text.secondary = "#DDD1B3 "
//brand background
theme.palette.background.default = "#F2D7AC"
theme.palette.background.headline = "#F2E5C4"

//brand theme injections
theme.shadows.brand = "0px 4px 20px rgba(63, 49, 14, 0.6)"

theme.palette.background.secondary =
"linear-gradient(180deg, #795E1B 0%, #3F310E 55.21%)"

theme.palette.background.primary =
"linear-gradient(180deg, rgba(242, 229, 196, 0.2) 39.58%, rgba(226, 131, 21, 0.2) 73.44%), radial-gradient(107.14% 107.14% at 15.12% 13.17%, #F2E5C4 41.67%, #F5CB98 100%)"

theme.palette.error.main = "red"
theme.overrides.MuiBackdrop = "red"
theme.shape.brandBorderRadius = "25px"
theme.shape.brandBorder = "1px dashed #3f310e"

//typography
theme.spacingFromHeader = theme.spacing(6)
theme.typography.fontFamily = "Source Sans Pro"
theme.typography.h1.fontFamily = "Berlin-Sans-FB"

theme.typography.body1 = {
  fontSize: "20px",
  color: theme.palette.text.primary,
  background: "inherit",
  [theme.breakpoints.down("md")]: { 
    fontSize: "16px",
  },
}
theme.typography.h5 = {
  fontSize: "12px",
  fontWeight: 400,
  color: theme.palette.text.primary,
  [theme.breakpoints.down("md")]: { 
    fontSize: "12px",
  },
}

//used in some body text
theme.typography.h4 = {
  fontSize: "20px",
  fontWeight: 500,
  color: theme.palette.text.primary,
  [theme.breakpoints.down("md")]: { 
    fontSize: "13px",
  },
}

theme.typography.h3 = {
  // fontSize: "16px",
  fontSize: "33px",
  fontWeight: 200,
  color: theme.palette.text.primary,
  [theme.breakpoints.down("md")]: { 
    fontSize: "25px",
  },
}

theme.typography.h2 = {
  // fontSize: "5rem",
  fontSize: "51px",
  color: theme.palette.text.primary,
  fontWeight: 200,
  [theme.breakpoints.down("md")]: { 
    fontSize: "45px",
    textAlign: 'center',
  },
}

theme.typography.h1 = {
  // fontSize: "5rem",
  fontSize: "78px",
  color: theme.palette.text.primary,
  fontWeight: 800,
  [theme.breakpoints.down("md")]: { 
    fontSize: "52px",
  },
  [theme.breakpoints.down("sm")]: { 
    fontSize: "45px",
  },
}
