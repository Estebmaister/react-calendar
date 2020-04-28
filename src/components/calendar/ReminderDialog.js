import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import PlusIcon from "./svgs/plus.svg";
import { Select } from "@material-ui/core";

export default class ReminderDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      reminderTitle: props.reminderTitle || "",
      reminderCity: props.reminderCity || "",
      reminderDate: props.reminderDate || "",
      reminderStartTime: props.reminderStartTime || "10:00:00",
      reminderCategory: props.reminderCategory || "home",
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.reminderTitle !== nextProps.reminderTitle) {
      this.setState({ reminderTitle: nextProps.reminderTitle });
    }
    if (this.props.reminderCity !== nextProps.reminderCity) {
      this.setState({ reminderCity: nextProps.reminderCity });
    }
    if (this.props.reminderStartTime !== nextProps.reminderStartTime) {
      this.setState({ reminderStartTime: nextProps.reminderStartTime });
    }
    if (this.props.reminderCategory !== nextProps.reminderCategory) {
      this.setState({ reminderCategory: nextProps.reminderCategory });
    }
  };

  handleClickOpen = (event) => {
    this.setState({ open: true });
  };

  handleClose = (event) => {
    this.setState({ open: false });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.handleSubmit(this.state);
    this.setState({
      reminderTitle: this.props.reminderTitle || "",
      reminderCity: this.props.reminderCity || "",
      reminderDate: this.props.reminderDate || "",
      reminderStartTime: this.props.reminderStartTime || "10:00:00",
      reminderCategory: this.props.reminderCategory || "home",
    });
  };

  __handleTitleChange = (event) => {
    this.setState({
      reminderTitle: event.target.value,
    });
  };

  __handleCityChange = (event) => {
    this.setState({
      reminderCity: event.target.value,
    });
  };

  __handleDateChange = (event) => {
    this.setState({
      reminderDate: event.target.value,
    });
  };

  __handleStartTimeChange = (event) => {
    this.setState({
      reminderStartTime: event.target.value,
    });
  };

  __handleCategoryChange = (event) => {
    this.setState({
      reminderCategory: event.target.value,
    });
  };

  render() {
    return (
      <div className="form-folder">
        <div
          className="form-icon"
          src={PlusIcon}
          alt="Add/edit reminder"
          onClick={this.handleClickOpen}
        >
          <i className="form-icon-img"></i>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.props.action}</DialogTitle>
          <form onSubmit={this.onSubmit}>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Reminder title"
                type="text"
                onChange={this.__handleTitleChange}
                value={this.state.reminderTitle}
                fullWidth
              />
              <TextField
                autoFocus
                placeholder="Bogota"
                margin="dense"
                id="city"
                label="Location (city)"
                type="text"
                onChange={this.__handleCityChange}
                value={this.state.reminderCity}
                fullWidth
              />
              {this.props.showDateField && (
                <TextField
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  maxLength="30"
                  margin="dense"
                  id="date"
                  label="Date"
                  type="date"
                  onChange={this.__handleDateChange}
                  value={this.state.reminderDate}
                  fullWidth
                />
              )}
              <TextField
                InputLabelProps={{ shrink: true }}
                autoFocus
                margin="dense"
                id="startTime"
                label="Start time"
                type="time"
                onChange={this.__handleStartTimeChange}
                value={this.state.reminderStartTime}
                fullWidth
              />
              <InputLabel id="category-label">Category (color)</InputLabel>
              <Select
                autoFocus
                placeholder="work"
                id="category"
                labelId="category-label"
                displayEmpty
                onChange={this.__handleCategoryChange}
                value={this.state.reminderCategory}
                fullWidth
              >
                <MenuItem value="work">Work</MenuItem>
                <MenuItem value="home">Home</MenuItem>
                <MenuItem value="calendar">Calendar</MenuItem>
              </Select>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleClose} type="submit" color="primary">
                {this.props.submitText}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}
