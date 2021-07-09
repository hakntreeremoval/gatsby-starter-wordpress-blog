import React, { useState, useEffect, useContext } from "react"

import { makeStyles } from "@material-ui/core/styles"
import { Button, Icon, Typography } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}))

//prettier-ignore
export default function CustomButton ({Icon,shadow,children,action}) {
 const classes = useStyles()

  //configure what section is in view
  const [inProp, setInProp] = useState(false);
  useEffect(() => {
    setInProp(true);
  }, []);

  return (
    <>
      <Button
        onClick={()=>action && action()}
        className={`brand-border-radius no-wrap justify-content-between px-3 ${shadow && "brand-shadow"}`}
        color="primary"
        endIcon={<Icon className="brand-shadow brand-border-radius p-1" />}
        size="large"
        variant="contained"
      >
          {children}
      </Button>
    </>
  )
}
