import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ChromePicker } from "react-color";
import { Button } from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@mui/styles";
import styles from "./styles/NewPaletteFormNavStyle";
import PaletteNameMetaForm from "./PaletteNameMetaForm";
import seedColors from "./seedColors";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import NewColorsPalette from "./NewColorsPalette";

//styled

const drawerWidth = 400;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

//*************************************************************/
//*********** FUNCTOIN SET *********************************** */
//*********************************************************** */
function NewPaletteForm(props) {
  const { palettes, maxColors = "20", classes } = props;
  const [open, setOpen] = useState(true);
  const [currentColor, setCurrentColor] = useState("teal");
  const [colors, setColors] = useState(seedColors[0].colors);
  const [newName, setNewName] = useState("");
  const [newPaletteName, setNewPaletteName] = useState("");
  const [showAddPaletteName, setShowAddPaletteName] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  //*************************************************************/
  //*********** USE EFFECT TO RUN VALIDATION ********************* */
  //*********************************************************** */
  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });

    ValidatorForm.addValidationRule("isColorUnique", (value) => {
      return colors.every(({ color }) => color !== currentColor);
    });
  });

  //*************************************************************/
  //*********** HANDLE FUCTIONS*********************************** */
  //*********************************************************** */

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = () => {
    const newColor = { color: currentColor, name: newName };
    setColors([...colors, newColor]);
    setNewName("");
  };

  const updateCurrentColor = (newColor) => {
    setCurrentColor(newColor.hex);
  };

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const submitNewPalette = (emoji) => {
    let newName = newPaletteName;
    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-"),
      colors: colors,
      emoji: emoji,
    };
    props.savedPalette(newPalette);
    props.history.push("/");
  };

  const handlePaletteName = (e) => {
    setNewPaletteName(e.target.value);
  };

  const removeSingleColor = (colorName) => {
    setColors(colors.filter((color) => color.name !== colorName));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setColors((colors) => {
        let oldIndex = colors.findIndex((color) => active.id === color.name);
        let newIndex = colors.findIndex((color) => over.id === color.name);
        return arrayMove(colors, oldIndex, newIndex);
      });
    }
  };

  const addRandomColors = () => {
    // Picking random colors from existing palettes
    const allColors = palettes.map((p) => p.colors).flat();
    // console.log(allColors)
    let rand;
    let randomColor;
    let isDuplicateColor = true;
    while (isDuplicateColor) {
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
      isDuplicateColor = colors.some(
        (color) => color.name === randomColor.name
      );
    }
    setColors([...colors, randomColor]);
  };

  const clearPalette = () => {
    setColors([]);
  };

  const paletteNameInput = () => {
    setShowAddPaletteName(true);
  };

  const hideAddPaletteName = () => {
    setShowAddPaletteName(false);
  };

  const paletteFull = colors.length >= maxColors;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* NAV BAR POSITION */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Create a palette
          </Typography>
        </Toolbar>
        <div className={classes.root}>
          <Button
            variant="contained"
            onClick={paletteNameInput}
            color="success"
          >
            Save
          </Button>
          {showAddPaletteName && (
            <PaletteNameMetaForm
              newPaletteName={newPaletteName}
              handlePaletteName={handlePaletteName}
              submitNewPalette={submitNewPalette}
              classes={classes}
              palettes={props.palettes}
              hideAddPaletteName={hideAddPaletteName}
            />
          )}
          <Link to="/" className={classes.goBackBtn}>
            <Button variant="contained" color="secondary">
              GO BACK
            </Button>
          </Link>
        </div>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* INSIDE DIVIDER */}
        <div className={classes.designPaletteContainer}>
          <Typography variant="h4">Design Your Palette</Typography>
          <div className={classes.clearRandomBtn}>
            <Button variant="contained" color="error" onClick={clearPalette}>
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={addRandomColors}
              disabled={paletteFull}
            >
              Random Color
            </Button>
          </div>
          {/* COLOR FORM PICKER */}
          <ChromePicker
            color={currentColor}
            onChangeComplete={updateCurrentColor}
            className={classes.colorPicker}
          />
          <ValidatorForm onSubmit={addNewColor} instantValidate={false}>
            <TextValidator
              className={classes.inputColorName}
              onChange={handleChange}
              name={newName}
              value={newName}
              fullWidth
              validators={["required", "isColorNameUnique", "isColorUnique"]}
              errorMessages={[
                "this field is required",
                "Color Name Must be Unique",
                "Color already added",
              ]}
            />
            <Button
              variant="contained"
              type="submit"
              color="success"
              style={{ backgroundColor: currentColor }}
              disabled={paletteFull}
              className={classes.addColorBtn}
            >
              {paletteFull ? "Palette Full" : "Add Colors"}
            </Button>
          </ValidatorForm>
        </div>
      </Drawer>
      {/* INSIDE PALETTE COLORS */}
      <Main open={open}>
        <DrawerHeader />
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={colors.map((color) => color.name)}
            strategy={rectSortingStrategy}
          >
            {colors.map((color) => (
              <NewColorsPalette
                key={color.name}
                id={color.name}
                name={color.name}
                handle={true}
                color={color.color}
                handleDelete={removeSingleColor}
              />
            ))}
          </SortableContext>
        </DndContext>
      </Main>
    </Box>
  );
}

export default withStyles(styles)(NewPaletteForm);
