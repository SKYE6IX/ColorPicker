import React, { Component } from "react";
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@mui/styles";
import styles from './styles/PaletteStyles'

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 500,
      format: "hex",
    };
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }

  changeFormat(val) {
    this.setState({ format: val });
  }

  changeLevel(level) {
    this.setState({ level });
  }
  render() {
    const { level, format } = this.state;
    const { colors, paletteName, emoji, id } = this.props.palette;
    const {classes} = this.props
    const colorBoxes = colors[level].map((color) => (
      <ColorBox
        background={color[format]}
        name={color.name}
        key={color.id}
        paletteId={id}
        colorId={color.id}
        showLink={true}
      />
    ));
    return (
      <div className={classes.palette}>
        <div className="slider"></div>
        <NavBar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
          showSlider={true}
        />
        <div className={classes.paletteColors}>{colorBoxes}</div>
        <PaletteFooter paletteName={paletteName} emoji={emoji}/>
      </div>
    );
  }
}

export default withStyles(styles)(Palette);
