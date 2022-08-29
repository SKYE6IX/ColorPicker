import sizes from "./sizes";
import bg from './Colored Shapes.svg'
export default {
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    overflow: "scroll",
     /* background by SVGBackgrounds.com */
    backgroundColor: "#394bad",
    backgroundImage: `url(${bg})`
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    "& h1":{
      [`@media (max-width: ${sizes.sm}px)`]:{
        fontSize: "1.2rem",
      }
    },
    "& a": {
      textDecoration: "none",
      color: "white",
      fontSize: "1.2rem",
      [`@media (max-width: ${sizes.sm}px)`]:{
        fontSize: "1rem",
      }
    },
  },
  palettes: {
    boxSizng: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "5%",
    [`@media screen and (max-width: ${sizes.md}px)`]:{
      gridTemplateColumns: "repeat(2, 50%)",
      gridGap: "3%",
    },
    [`@media screen and (max-width: ${sizes.sm}px)`]:{
      gridTemplateColumns: "repeat(1, 100%)",
      gridGap: "2%",
    },

  },
};


// [`@media (max-width: ${sizes.sm}px)`]: