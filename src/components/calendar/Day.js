import React from "react";
import Forecast from "./Forecast.js";
import ReminderDialog from "./ReminderDialog.js";
import TrashIcon from "./svgs/trash-alt.svg";

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
            <img
              className="trash-icon trash-day"
              src={TrashIcon}
              alt="Delete all"
              onClick={(e) =>
                this.props.deleteAllReminders(this.state.formatedFullDate)
              }
            />
          )}
          <ReminderDialog
            classes={{ root: "modal-container" }}
            action={`Add a new reminder on ${this.state.formatedFullDate}`}
            showDateField={false}
            submitText={"Add reminder"}
            handleSubmit={this.addReminder}
          ></ReminderDialog>
        </span>

        <div className="reminds">
          {reminders &&
            reminders.map((reminder) => (
              <span className={"spanRemind " + reminder.category}>
                <p className="text-reminder">
                  <img
                    className="trash-icon trash-remind"
                    src={TrashIcon}
                    alt="Delete all"
                    onClick={(e) => this.deleteReminder(reminder)}
                  />
                  {String(reminder.title)}
                </p>
                <p className="text-reminder">
                  <ReminderDialog
                    style={{ height: "10px" }}
                    action={`Edit reminder`}
                    showDateField={true}
                    submitText={"Update reminder"}
                    handleSubmit={(r) => this.editReminder(reminder.index, r)}
                    reminderTitle={reminder.title}
                    reminderCity={reminder.city}
                    reminderDate={reminder.date}
                    reminderStartTime={reminder.startTime}
                    reminderCategory={reminder.category}
                  ></ReminderDialog>
                  {String(reminder.city)}{" "}
                </p>
                <Forecast
                  city={reminder.city}
                  date={this.state.formatedFullDate}
                />
                <p className="text-reminder">{String(reminder.startTime)}</p>
              </span>
            ))}
        </div>
      </td>
    );
  }
}
