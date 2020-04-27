import React from "react";
import moment from "moment";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Day from "./Day.js";
import ReminderDialog from "./ReminderDialog.js";
import "./calendar.css";
import "./icons.css";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateObject: moment(),
      allMonths: moment.months(),
      selectedDay: moment().date(),
      reminders: {},
    };

    this.weekdaysShortName = moment.weekdaysShort().map((day) => (
      <th key={day} className="week-day">
        {day}
      </th>
    ));
    this.lastDayOfMonth = moment(this.state.dateObject)
      .endOf("month")
      .format("D");

    // Binding the functions of the component
    this.currentDayF = this.currentDayF.bind(this);
    this.month = this.month.bind(this);
    this.year = this.year.bind(this);
    this.firstDayOfMonth = this.firstDayOfMonth.bind(this);
    this.makeBlanks = this.makeBlanks.bind(this);
    this.makeDays = this.makeDays.bind(this);
    this.makeTableCalendar = this.makeTableCalendar.bind(this);
    this.onDayClick = this.onDayClick.bind(this);
    this.deleteAllReminders = this.deleteAllReminders.bind(this);
  }

  currentDayF = () => parseInt(this.state.dateObject.format("D"));

  month = () => this.state.dateObject.format("MMMM");

  year = () => this.state.dateObject.format("Y");

  firstDayOfMonth = () =>
    moment(this.state.dateObject).startOf("month").format("d");

  makeBlanks = () => {
    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      let d = moment()
        .startOf("month")
        .subtract(i + 1, "days")
        .format("D");
      blanks.unshift(
        <td key={"preBlank" + i} className="calendar-day empty">
          {d}
        </td>
      );
    }
    return blanks;
  };

  makeDays = () => {
    let daysInMonth = [];
    for (let day = 1; day <= this.lastDayOfMonth; day++) {
      let fullDate = moment({ day: day }).format("YYYY-MM-DD");
      daysInMonth.push(
        <Day
          key={"day" + day}
          day={day}
          currentDay={day === this.state.selectedDay ? "today" : ""}
          onDayClick={this.onDayClick}
          fullDate={moment({ day: day })}
          addReminder={this.addReminder}
          editReminder={this.editReminder}
          deleteReminder={this.deleteReminder}
          deleteAllReminders={this.deleteAllDayReminders}
          reminders={this.state.reminders[fullDate]}
        />
      );
    }
    return daysInMonth;
  };

  makeTableCalendar = () => {
    let totalSlots = [...this.makeBlanks(), ...this.makeDays()];
    let rows = [];
    let week = [];
    totalSlots.forEach((day, index) => {
      if (index % 7 !== 0) {
        week.push(day); // if index not equal 7 that means not go to next week
      } else {
        rows.push(week); // push week array in rows when next week is reached
        week = []; // empty container for next week
        week.push(day); // in current loop we still push current row to new container
      }
      if (index === totalSlots.length - 1) {
        // when end loop we add remain date
        let j = index;
        let afterMonth = 1;
        while (j % 7 !== 6) {
          week.push(
            <td key={"aftBlank" + afterMonth} className="calendar-day empty">
              {afterMonth}
            </td>
          );
          j++;
          afterMonth++;
        }
        rows.push(week); // push the final week
      }
    });
    return rows.map((day, index) => <tr key={"week" + index}>{day}</tr>);
  };

  sortAndUpdateRemindersIndexes = (arrayOfReminders) => {
    return this.updateRemindersIndexes(
      arrayOfReminders.sort(
        (r1, r2) => parseFloat(r1.startTime) - parseFloat(r2.startTime)
      )
    );
  };

  updateRemindersIndexes = (arrayOfReminders) => {
    return arrayOfReminders.map((reminder, index) => {
      reminder.index = index;
      return reminder;
    });
  };

  addReminder = (fullDate, newReminder) => {
    let newReminders = this.state.reminders;
    let arrayOfReminders = [];
    if (fullDate in newReminders) {
      arrayOfReminders = newReminders[fullDate];
    }
    arrayOfReminders.push(newReminder);
    newReminders[fullDate] = this.sortAndUpdateRemindersIndexes(
      arrayOfReminders
    );
    this.setState({ reminders: newReminders });
  };

  addGlobalReminder = (newReminder) => {
    this.addReminder(newReminder.reminderDate, {
      title: newReminder.reminderTitle,
      city: newReminder.reminderCity,
      date: newReminder.reminderDate,
      startTime: newReminder.reminderStartTime,
      category: newReminder.reminderCategory,
    });
  };

  editReminder = (fullDate, index, newReminder) => {
    // If date was changed
    if (fullDate !== newReminder.date) {
      this.deleteReminder(fullDate, index);
      this.addReminder(newReminder.date, newReminder);
    } else {
      let newReminders = this.state.reminders;
      let arrayOfReminders = newReminders[fullDate];
      arrayOfReminders[index] = newReminder;
      newReminders[fullDate] = this.sortAndUpdateRemindersIndexes(
        arrayOfReminders
      );
      this.setState({ reminders: newReminders });
    }
  };

  deleteReminder = (fullDate, index) => {
    let newReminders = this.state.reminders;
    let arrayOfReminders = newReminders[fullDate];
    arrayOfReminders.splice(index, 1);
    newReminders[fullDate] = this.updateRemindersIndexes(arrayOfReminders);
    if (arrayOfReminders.length === 0) {
      delete newReminders[fullDate];
    }
    this.setState({ reminders: newReminders });
  };

  deleteAllDayReminders = (fullDate) => {
    let newReminders = this.state.reminders;
    delete newReminders[fullDate];
    this.setState({ reminders: newReminders });
  };

  deleteAllReminders = (event) => {
    this.setState({ reminders: {} });
  };

  onDayClick = (e, d) => {
    this.setState({ selectedDay: d });
  };

  render() {
    return (
      <div className="calendar-container">
        <div className="calendar-navi">
          <button className="month-change">{"< Prev"}</button>
          <h2>
            <span className="calendar-label">{this.month()} </span>
            <span className="calendar-label">{this.year()} </span>
          </h2>
          <button className="month-change">{"Next >"}</button>
          <div className="icon-folder">
            <ReminderDialog
              action={"Add a new reminder"}
              showDateField={true}
              submitText={"Add reminder"}
              handleSubmit={this.addGlobalReminder}
            >
              <AddIcon />
            </ReminderDialog>
            <IconButton onClick={this.deleteAllReminders}>
              <Avatar>
                <DeleteIcon />
              </Avatar>
            </IconButton>
          </div>
        </div>
        <table style={{ width: "100%" }}>
          <thead className="">
            <tr>{this.weekdaysShortName}</tr>
          </thead>
          <tbody className="">{this.makeTableCalendar()}</tbody>
        </table>
      </div>
    );
  }
}
