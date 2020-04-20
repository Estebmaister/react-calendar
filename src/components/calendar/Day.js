import React from "react";
import moment from "moment";
//import SpringPopper from "./Popper.js";

console.log("Calendar, mounting text");

export default class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: 1,
      currentDay: "",
      dateObject: moment(),
    };

    this.currentDayF = this.currentDayF.bind(this);
    this.month = this.month.bind(this);
    this.year = this.year.bind(this);
    this.firstDayOfMonth = this.firstDayOfMonth.bind(this);
    this.onDayClick = this.onDayClick.bind(this);
    this.lastDayOfMonth = moment(this.state.dateObject)
      .endOf("month")
      .format("D");
  }
  currentDayF = () => parseInt(this.state.dateObject.format("D"));
  month = () => this.state.dateObject.format("MMMM");
  year = () => this.state.dateObject.format("Y");
  firstDayOfMonth = () =>
    moment(this.state.dateObject).startOf("month").format("d");

  onDayClick = (e, d) => {
    this.setState(
      {
        dateObject: moment(
          `${this.state.dateObject.format("YYYYMM")}${
            String(d).length === 1 ? "0" + d : d
          }`
        ),
        selectedDay: d,
      },
      () => {
        console.log("SELECTED DAY: ", this.state.selectedDay);
        console.log(d);
        console.log(this.state.dateObject);
      }
    );
  };

  componentWillReceiveProps() {
    this.setState((state, props) => ({
      currentDay: props.currentDay || state.currentDay,
    }));
  }

  componentDidMount() {
    this.setState((state, props) => ({
      day: props.day || state.day,
      currentDay: props.currentDay || state.currentDay,
      dateObject: props.dateObject || state.dateObject,
    }));
  }
  componentDidCatch() {
    this.setState((state, props) => ({
      day: props.day || state.day,
      currentDay: props.currentDay || state.currentDay,
      dateObject: props.dateObject || state.dateObject,
    }));
  }

  onClick;

  render() {
    return (
      <td
        key={"day" + this.props.day}
        className={`calendar-day ${this.state.currentDay}`}
      >
        <span onClick={(e) => this.props.onDayClick(e, this.state.day)}>
          {this.state.day}
        </span>
      </td>
    );
  }
}
