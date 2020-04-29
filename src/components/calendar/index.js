import React from "react";
import moment from "moment";
import Day from "./Day.js";
import ReminderDialog from "./ReminderDialog.js";
import "./calendar.css";
import "./icons.css";
import TrashIcon from "./svgs/trash-alt.svg";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialDate: moment(),
      allMonths: moment.months(),
      selectedDay: moment().date(),
      reminders: {},
    };

    this.weekdaysShortName = moment.weekdaysShort().map((day) => (
      <th key={day} className="week-day">
        {day}
      </th>
    ));

    // Binding the functions of the component
    this.lastDayOfMonth = this.lastDayOfMonth.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
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

  lastDayOfMonth = () =>
    moment(this.state.initialDate).endOf("month").format("D");

  currentDayF = () => parseInt(this.state.initialDate.format("D"));

  month = () => this.state.initialDate.format("MMMM");

  year = () => this.state.initialDate.format("Y");

  firstDayOfMonth = () =>
    moment(this.state.initialDate).startOf("month").format("d");

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
    for (let day = 1; day <= this.lastDayOfMonth(); day++) {
      let fullDate = moment({
        day: day,
        month: this.state.initialDate.month(),
      }).format("YYYY-MM-DD");
      daysInMonth.push(
        <Day
          key={"day" + day}
          day={day}
          currentDay={day === this.state.selectedDay ? "today" : ""}
          onDayClick={this.onDayClick}
          fullDate={moment({ day: day, month: this.state.initialDate.month() })}
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

  changeMonth = (e, change) => {
    switch (change) {
      case "NEXT":
        this.setState({
          initialDate: moment(this.state.initialDate).month(
            this.state.initialDate.month() + 1
          ),
        });
        break;
      case "PREV":
        this.setState({
          initialDate: moment(this.state.initialDate).month(
            this.state.initialDate.month() - 1
          ),
        });
        break;
      default:
        break;
    }
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
          <button
            className="month-change month-prev"
            onClick={(e) => this.changeMonth(e, "PREV")}
          >
            {"Prev"}
          </button>
          <h2>
            <span className="calendar-label">{this.month()} </span>
            <span className="calendar-label">{this.year()} </span>
          </h2>
          <div className="nav-icon">
            <ReminderDialog
              action={"Add a new reminder"}
              showDateField={true}
              submitText={"Add reminder"}
              handleSubmit={this.addGlobalReminder}
            ></ReminderDialog>
            <img
              className="trash-icon"
              src={TrashIcon}
              alt="Delete all"
              onClick={this.deleteAllReminders}
            />
          </div>
          <button
            onClick={(e) => this.changeMonth(e, "NEXT")}
            className="month-change month-next"
          >
            {"Next"}
          </button>
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
