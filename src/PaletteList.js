import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@mui/styles";
import styles from "./styles/PaletteListStyles";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { blue, red } from "@mui/material/colors";

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteDialog: false,
      paletteId: "",
    };
    this.goToPalette = this.goToPalette.bind(this);
    this.handleShowDeleteDialog = this.handleShowDeleteDialog.bind(this);
    this.handleCloseShowDeleteDialog =
      this.handleCloseShowDeleteDialog.bind(this);
    this.handleDeletePalette = this.handleDeletePalette.bind(this);
  }
  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }
  
  handleShowDeleteDialog(id) {
    this.setState({
      showDeleteDialog: true,
      paletteId: id,
    });
  }

  handleCloseShowDeleteDialog() {
    this.setState({
      showDeleteDialog: false,
      paletteId: "",
    });
  }

  handleDeletePalette() {
    this.props.removePalette(this.state.paletteId);
    this.setState({
      showDeleteDialog: false,
    });
  }
  render() {
    const { palettes, classes } = this.props;
    const { showDeleteDialog } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Demo Colors</h1>
            <Link to="/palette/new">Create Palette</Link>
          </nav>
          <div className={classes.palettes}>
            {palettes.map((palette) => (
              <MiniPalette
                {...palette}
                singlePalettePage={this.goToPalette}
                key={palette.id}
                showDeleteDialog={this.handleShowDeleteDialog}
                // removePalette={removePalette}
              />
            ))}
          </div>
          <Dialog
            open={showDeleteDialog}
            onClose={this.handleCloseShowDeleteDialog}
          >
            <DialogTitle>Delete Palette?</DialogTitle>
            <List>
              <ListItem button onClick={this.handleDeletePalette}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: red[100], color: red[600] }}>
                    <CheckIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>Delete</ListItemText>
              </ListItem>
              <ListItem button onClick={this.handleCloseShowDeleteDialog}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <CloseIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>Cancel</ListItemText>
              </ListItem>
            </List>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
