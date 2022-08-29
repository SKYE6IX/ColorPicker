export default{
    root: {
      backgroundColor: "white",
      border: "2px solid black",
      borderRadius: "5px",
      padding: "0.5rem",
      position: "relative",
      cursor: "pointer",
      "&:hover svg ": {
        opacity: 1
      },
    },
    colors: {
      backgroundColor: "gray",
      height: "150px",
      width: "100%",
      borderRadius: "5px",
      overflow: "hidden",
    },
    title: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "0",
      color: "black",
      paddingTop: "0.5rem",
      fontSize: "1rem",
      position: "relative",
    },
    emoji: {
      marginLeft: "0.5rem",
      fontSize: "1.5rem",
    },
    miniColor: {
      height: "25%",
      width: "20%",
      display: "inline-block",
      margin: "0 auto",
      position: "relative",
      marginBottom: "-3.5px",
    },
    deleteIcon:{
      color: 'white',
      backgroundColor: 'red',
      width: '20px',
      height: '20px',
      position: 'absolute',
      right: '0px',
      top: '0px',
      padding: '5px',
      zIndex: '10',
      opacity: 0,
    },
  };