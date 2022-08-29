import React, { Component } from "react";
import { Link } from "react-router-dom";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Slider from "rc-slider";
import { withStyles } from "@mui/styles";
import styles from "./styles/NavBarStyles";
import "rc-slider/assets/index.css";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: "hex",
      open: false,
    };
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  handleFormatChange(e) {
    this.setState({
      format: e.target.value,
      open: true,
    });
    this.props.handleChange(e.target.value);
  }

  closeSnackbar() {
    this.setState({ open: false });
  }
  render() {
    const { level, changeLevel, showSlider, classes } = this.props;
    const { format } = this.state;
    return (
      <header className={classes.navBar}>
        <div className={classes.logo}>
          <Link to="/">reactcolorpiker</Link>
        </div>
        {showSlider && (
          <div>
            <span>Level: {level}</span>
            <div className={classes.slider}>
              <Slider
                defaultValue={level}
                min={100}
                max={900}
                step={100}
                onAfterChange={changeLevel}
                trackStyle={{ backgroundColor: "transparent" }}
                railStyle={{ height: `8px` }}
                handleStyle={{
                  backgroundColor: "green",
                  outline: "none",
                  border: `2px solid green`,
                  boxShadow: "none",
                }}
              />
            </div>
          </div>
        )}
        <div className={classes.selectContainer}>
          <Select value={format} onChange={this.handleFormatChange}>
            <MenuItem value="hex"> HEX - #ffff</MenuItem>
            <MenuItem value="rgb"> RGB - rgb 255, 255, 255</MenuItem>
            <MenuItem value="rgba"> RGBA - rgb 255, 255, 255, 1.0</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.open}
          autoHideDuration={3000}
          message={<span id="message-id">Format Change!!!</span>}
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          action={[
            <IconButton color="inherit" onClick={this.closeSnackbar}>
              <CloseIcon />
            </IconButton>,
          ]}
          onClose={this.closeSnackbar}
        ></Snackbar>
      </header>
    );
  }
}

export default withStyles(styles)(NavBar);
