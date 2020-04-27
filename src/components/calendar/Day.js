import React from "react";
import Avatar from "@material-ui/core/Avatar";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Forecast from "./Forecast.js";
import ReminderDialog from "./ReminderDialog.js";

export default class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: props.day,
      currentDay: props.currentDay,
      formatedFullDate: props.fullDate.format("YYYY-MM-DD"),
    };
    // Binding functions for "this" access.
    this.onClick = this.onClick.bind(this);
    this.addReminder = this.addReminder.bind(this);
  }

  onClick = (event) => {
    this.props.onDayClick(event, this.state.day);
  };

  addReminder = (newReminder) => {
    this.props.addReminder(this.state.formatedFullDate, {
      title: newReminder.reminderTitle,
      city: newReminder.reminderCity,
      date: this.state.formatedFullDate,
      startTime: newReminder.reminderStartTime,
      category: newReminder.reminderCategory,
    });
  };

  editReminder = (index, newReminder) => {
    this.props.editReminder(this.state.formatedFullDate, index, {
      title: newReminder.reminderTitle,
      city: newReminder.reminderCity,
      date: newReminder.reminderDate,
      startTime: newReminder.reminderStartTime,
      category: newReminder.reminderCategory,
    });
  };

  deleteReminder = (reminder) => {
    this.props.deleteReminder(this.state.formatedFullDate, reminder.index);
  };

  render() {
    const { reminders } = this.props;
    return (
      <td
        key={"d" + this.props.day}
        className={`calendar-day ${this.props.currentDay}`}
        onClick={this.onClick}
      >
        <span key={"sDay" + this.props.day} className="spanDay">
          {this.state.day}
          {reminders && (
            <Avatar
              className="trash-icon"
              onClick={(e) =>
                this.props.deleteAllReminders(this.state.formatedFullDate)
              }
            >
              <DeleteIcon />
            </Avatar>
          )}
          <ReminderDialog
            action={`Add a new reminder on ${this.state.formatedFullDate}`}
            showDateField={false}
            submitText={"Add reminder"}
            handleSubmit={this.addReminder}
          >
            <AddIcon />
          </ReminderDialog>
        </span>

        <div className="reminds">
          {reminders &&
            reminders.map((reminder) => (
              <span className={"spanRemind " + reminder.category}>
                <p className={"text-reminder"}>
                  <Avatar onClick={(e) => this.deleteReminder(reminder)}>
                    <DeleteIcon />
                  </Avatar>
                  {String(reminder.title)}
                  <ReminderDialog
                    action={`Edit reminder`}
                    showDateField={true}
                    submitText={"Update reminder"}
                    handleSubmit={(r) => this.editReminder(reminder.index, r)}
                    reminderTitle={reminder.title}
                    reminderCity={reminder.city}
                    reminderDate={reminder.date}
                    reminderStartTime={reminder.startTime}
                    reminderCategory={reminder.category}
                  >
                    <EditIcon />
                  </ReminderDialog>
                </p>
                {String(reminder.city)}{" "}
                <Forecast
                  city={reminder.city}
                  date={this.state.formatedFullDate}
                />
                <br />
                {String(reminder.startTime)}
                <br />
              </span>
            ))}
        </div>
      </td>
    );
  }
}
