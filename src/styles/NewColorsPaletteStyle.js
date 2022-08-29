export default {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    "&:hover svg":{
        color: 'white',
        transform: 'scale(1.5)'
    },
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0",
    padding: "10px",
    bottom: "0",
    color: "black",
    letterSpacing: "1px",
    fontSize: "14px",
    display: 'flex',
    justifyContent: 'Space-between',
  },
  deleteIcon:{
    transition: 'all 0.3s ease-in-out'
  },
};
