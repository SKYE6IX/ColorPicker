import React from "react";
import { withStyles } from "@mui/styles";
import styles from "./styles/MiniPaletteStyles";
import DeleteIcon from "@mui/icons-material/Delete";

const MiniPalette = React.memo((props) => {
  const {
    classes,
    paletteName,
    emoji,
    colors,
    singlePalettePage,
    id,
    showDeleteDialog,
  } = props;

  const miniColorBoxes = colors.map((color) => (
    <div
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}
    ></div>
  ));

  function handleClick() {
    singlePalettePage(id);
  }

  function handleDelete(e) {
    e.stopPropagation();
    showDeleteDialog(id);
  }
  return (
    <div className={classes.root} onClick={handleClick}>
      <DeleteIcon
        className={classes.deleteIcon}
        style={{ transition: "all 0.3s ease-in-out" }}
        onClick={handleDelete}
      />
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
});

export default withStyles(styles)(MiniPalette);
