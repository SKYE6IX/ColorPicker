import sizes from "./sizes";
export default {
  palette: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  paletteColors: {
    height: "90%",
  },
  goBack: {
    width: "20%",
    height: (props) => (props.showLink ? "25%" : "50%"),
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    opacity: "1",
    backgroundColor: "black",
    "& a": {
      width: "100px",
      height: "30px",
      position: "absolute",
      display: "inline-block",
      top: "50%",
      left: "50%",
      marginLeft: "-50px",
      marginTop: "-15px",
      outline: "none",
      fontSize: "1rem",
      textAlign: "center",
      lineHeight: "30px",
      background: "rgba(255, 255, 255, 0.3)",
      textTransform: "uppercase",
      color: "white",
      border: "none",
      textDecoration: "none",
    },
    [`@media (max-width: ${sizes.sm}px)`]: {
      width: "100%",
      height: '10%'
    },
  },
  
};
