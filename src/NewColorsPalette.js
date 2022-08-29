import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { withStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./styles/NewColorsPaletteStyle";

const NewColorsPalette = (props) => {
  const { color, classes, name, handleDelete } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    height: "25%",
    backgroundColor: color,
  };

  const handleClick = () => {
    handleDelete(name);
  };

  return (
    <div className={classes.root} ref={setNodeRef} style={style}>
      <div className={classes.boxContent}  >
        <span>{name}</span>
        <button  {...listeners} {...attributes} className={classes.drag}>DRAG</button>
        <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
      </div>
    </div>
  );
};

export default withStyles(styles)(NewColorsPalette);


