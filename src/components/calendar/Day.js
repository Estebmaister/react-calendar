import React from "react";
import moment from "moment";
import SpringPopper from "./Popper.js";

console.log("Calendar, mounting text");

export default class Day extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      day: 1,
      currentDay: "",
      dateObject: moment(),
      popperAnchor: null,
      reminders: ["Reminder1\n", "Reminder2\n"],
    };

    this.currentDayF = this.currentDayF.bind(this);
    this.month = this.month.bind(this);
    this.year = this.year.bind(this);
    this.firstDayOfMonth = this.firstDayOfMonth.bind(this);
    this.lastDayOfMonth = moment(this.state.dateObject).endOf("month").format("D");
  }

  currentDayF = () => parseInt(this.state.dateObject.format("D"));
  month = () => this.state.dateObject.format("MMMM");
  year = () => this.state.dateObject.format("Y");
  firstDayOfMonth = () => moment(this.state.dateObject).startOf("month").format("d");

  componentDidMount() {
    this.setState((state, props) => ({
      day: props.day || state.day,
      currentDay: props.currentDay || state.currentDay,
      dateObject: props.dateObject || state.dateObject,
    }));
  }

  onClick = (event) => {
    this.props.onDayClick(event, this.state.day);
    this.setState({ popperAnchor: (this.state.popperAnchor ? null : event.currentTarget) });
  }

  onSave = (reminder) => {
    console.log(reminder)
    const { reminders } = this.state;
    reminders.push(reminder)
    this.setState({ reminders: reminders })
  }

  render() {
    return (
      <td
        key={"day" + this.props.day}
        className={`calendar-day ${this.props.currentDay}`}
      >
        <span onClick={this.onClick}>
          {this.state.day}
          <SpringPopper anchorEl={this.state.popperAnchor} onSave={this.onSave} />
        </span>

        <p>{this.state.reminders}</p>
      </td>
    );
  }
}
