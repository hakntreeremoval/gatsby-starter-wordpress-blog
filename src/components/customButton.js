import React, { useState, useEffect, useContext } from "react"

import { makeStyles } from "@material-ui/core/styles"
import { Button, Icon, Typography } from "@material-ui/core"

// raise elevation on hover for material ui buttton
const useStyles = makeStyles(theme => ({
  root: {
    "&:hover": {
      background: theme.palette.background.secondary,
      color: theme.palette.text.secondary,
      boxShadow: theme.shadows.brand,
    },
    background: theme.shadows.brand,
    // margin: theme.spacing(3),
    // "& > *": {
    // },
  },
}))

//prettier-ignore
export default function CustomButton ({Icon,shadow,children,action}) {
 const classes = useStyles()

  return (
    // raise elevation on hover for material ui buttton
      <Button 
        onClick={()=>action && action()}
        className={ classes.root +` brand-border-radius no-wrap justify-content-between px-3 ${shadow && "brand-shadow"}`}
        color="primary"
        endIcon={<Icon className="brand-shadow brand-border-radius m-1 p-2" style={{minWidth: "35px",minHeight: "35px"}} />}
        size="large"
        variant="contained"
      >
          {children}
      </Button>
  )
}
