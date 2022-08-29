import React from "react";
import NewColorsPalette from "./NewColorsPalette";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function DragComponent(props) {
  const { colors, handleDelete,name } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    height: "100%",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {colors.map((color) => (
          <NewColorsPalette
            color={color.color}
            name={color.name}
            handleDelete={handleDelete}
          />
        ))}
    </div>
  );
}

export default DragComponent;
