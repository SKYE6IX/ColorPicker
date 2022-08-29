import React, { Component } from "react";
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import PaletteFooter from "./PaletteFooter";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import styles from "./styles/PaletteStyles";

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    this.state = {
      format: "hex",
    };
    this.changeFormat = this.changeFormat.bind(this);
  }
  gatherShades(palette, colorToFilterBy) {
    let shades = [];
    let allColors = palette.colors;

    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorToFilterBy)
      );
    }
    return shades.slice(1);
  }

  changeFormat(val) {
    this.setState({ format: val });
  }

  render() {
    const { format } = this.state;
    const { palette, classes } = this.props;
    const colorBoxes = this._shades.map((color) => (
      <ColorBox
        name={color.name}
        key={color.name}
        background={color[format]}
        showLink={false}
      />
    ));
    return (
      <div className={classes.palette}>
        <NavBar handleChange={this.changeFormat} showSlider={false} />
        <div className={classes.paletteColors}>
          {" "}
          {colorBoxes}
          <div className={classes.goBack}>
            <Link to={`/palette/${palette.id}`}>GO BACK</Link>
          </div>
        </div>
        <PaletteFooter
          paletteName={palette.paletteName}
          emoji={palette.emoji}
        />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
