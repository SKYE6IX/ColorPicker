import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Picker from "@emoji-mart/react";

function PaletteNameMetaForm(props) {
  const [stage, setStage] = useState("name");

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      return props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  });

  const {
    newPaletteName,
    handlePaletteName,
    submitNewPalette,
    classes,
    hideAddPaletteName,
  } = props;

  const chooseEmoji = () => {
    setStage("emoji");
  };

  const savePalette = (emoji) => {
    submitNewPalette(emoji.native);
  };

  return (
    <div>
      <Dialog open={stage === "emoji"} onClose={hideAddPaletteName}>
        <Picker onEmojiSelect={savePalette} />
      </Dialog>

      <Dialog open={stage === "name"} onClose={hideAddPaletteName}>
        <DialogTitle>Choose a palette name</DialogTitle>
        <ValidatorForm onSubmit={chooseEmoji}>
          <DialogContent>
            <DialogContentText>
              Please enter a Unique name for your palette
            </DialogContentText>
            <TextValidator
              label="Palette Name"
              name={newPaletteName}
              value={newPaletteName}
              fullWidth
              onChange={handlePaletteName}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["Enter Palette Name", "Name Already Exist"]}
              className={classes.form}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={hideAddPaletteName}>Cancel</Button>
            <Button
              variant="contained"
              color="success"
              type="submit"
              className={classes.savePaletteButton}
            >
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}

export default PaletteNameMetaForm;
