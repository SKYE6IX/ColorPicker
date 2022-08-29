import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard"; // use to copy things to clipboard
import { Link } from "react-router-dom";
import chroma from "chroma-js";
import { withStyles } from "@mui/styles";
import styles from "./styles/ColorBoxStyles";

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
    };
    this.changeCopyState = this.changeCopyState.bind(this);
  }

  //Changing the copying state
  changeCopyState() {
    this.setState({ copied: true }, () =>
      setTimeout(() => this.setState({ copied: false }), 1500)
    );
  }
  render() {
    const { background, name, paletteId, colorId, showLink, classes } =
      this.props;
    const { copied } = this.state;
    const isDarkColor = chroma(background).luminance() <= 0.07;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className={classes.ColorBox}>
          <div
            style={{ background }}
            className={`${classes.copyOverlay} ${
              copied && classes.showOverLay
            }`}
          />
          <div className={`${classes.copyMsg} ${copied && classes.showMsg}`}>
            <h1>copied!!!</h1>
            <p className={classes.copyText}>{background}</p>
          </div>
          <div className="copy-container">
            <div className={classes.boxContent}>
              <span className={classes.colorName}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {showLink && (
            <Link
              to={`/palette/${paletteId}/${colorId}`}
              onClick={(e) => e.stopPropagation()}
            >
              <span className={classes.seeMore}> More</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);
