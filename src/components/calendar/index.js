import React from "react";
import moment from "moment";
import Day from "./Day.js";
import "./calendar.css";

console.log("Calendar, mounting text");

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateObject: moment(),
      allMonths: moment.months(),
      selectedDay: moment().date(),
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
      daysInMonth.push(
        <Day
          key={"day" + day}
          day={day}
          currentDay={day === this.state.selectedDay ? "today" : ""}
          onDayClick={this.onDayClick}
          fullDate={moment({ day: day })}
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

  onDayClick = (e, d) => {
    this.setState({ selectedDay: d });
  };

  render() {
    return (
      <div className="calendar-container">
        <div className="calendar-navi">
          <h2>
            <span className="calendar-label">{this.month()} </span>
            <span className="calendar-label">{this.year()} </span>
          </h2>
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
