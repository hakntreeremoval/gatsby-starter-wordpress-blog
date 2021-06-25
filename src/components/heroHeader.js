import React, { useState, useEffect, useContext } from "react"
import { StaticQuery, graphql, Link, useStaticQuery } from "gatsby"

//styles / animation
import { TransitionGroup } from "react-transition-group"

import styled, { useTheme } from "@emotion/react"

import { heroGraphic, telstraTower } from "../../static/hardcoded-svgs"

//context
// import { GlobalStore } from "../../layout/layout"

const HeroHeader = styled.section`
  max-height: 35vh;
  z-index: 0;
`

const ThreeWrapper = styled.div`
  position: absolute;
  margin: auto;
  width: 100%;
  height: 100vh;
  left: 0px;
  margin-top: -250px;

  & #three-portfolio {
    background: transparent;
    position: absolute;
    height: 100vh;
    width: 100vw;
    z-index: 0;
    bottom: 0px;
  }
`
//prettier-ignore
export default React.memo(({ context, headerGraphic, headline, headlineDescription }) => {
    //prettier-ignore
    const {site:{siteMetadata:{title,description}}} = useStaticQuery(pageQuery);

    //configure what section is in view
    const [inProp, setInProp] = useState(false);
    useEffect(() => {
      setInProp(true);
    }, []);
    const theme = useTheme();

    return (
      <div className="row">
        <title>
          {title}
          {/* Beautiful<br />
                Scalable<br />
                Software<br /> */}
        </title>
        <div>{description}</div>
        <div className="buttons">
          <a href="#Contact" className="button -primary">
            
          </a>
          <a href="#Contact" className="button -primary">
             
          </a>
        </div>
      </div>
    );
  }
);

export const pageQuery = graphql`
  query heroHeaderQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
