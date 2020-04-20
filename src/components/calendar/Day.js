import React from "react";
import moment from "moment";
import SpringPopper from "./Popper.js";

console.log("Day, mounting text");

export default class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: 1,
      currentDay: "",
      dateObject: moment(),
      popperAnchor: null,
      reminders: [],
    };

    this.currentDayF = this.currentDayF.bind(this);
    this.month = this.month.bind(this);
    this.year = this.year.bind(this);
    this.firstDayOfMonth = this.firstDayOfMonth.bind(this);
    this.lastDayOfMonth = moment(this.state.dateObject)
      .endOf("month")
      .format("D");
  }

  currentDayF = () => parseInt(this.state.dateObject.format("D"));
  month = () => this.state.dateObject.format("MMMM");
  year = () => this.state.dateObject.format("Y");
  firstDayOfMonth = () =>
    moment(this.state.dateObject).startOf("month").format("d");

  componentDidMount() {
    this.setState((state, props) => ({
      day: props.day || state.day,
      currentDay: props.currentDay || state.currentDay,
      dateObject: props.dateObject || state.dateObject,
    }));
  }

  onClick = (event) => {
    this.props.onDayClick(event, this.state.day);
    this.setState({
      popperAnchor: event.currentTarget,
    });
  };

  onSave = (reminder, event) => {
    console.log(reminder);
    const { reminders } = this.state;
    reminders.push(reminder);
    this.setState({
      popperAnchor: null,
      reminders: reminders,
    });
  };

  render() {
    return (
      <td
        key={"d" + this.props.day}
        className={`calendar-day ${this.props.currentDay}`}
      >
        <span
          key={"sDay" + this.props.day}
          onClick={this.onClick}
          className="spanDay"
        >
          {this.state.day}
          <SpringPopper
            anchorEl={this.state.popperAnchor}
            onSave={this.onSave}
          />
        </span>
        <div className="reminds">
          {this.state.reminders.map((remind, index) => (
            <span className="spanRemind" key={"remind" + index}>
              {String(remind)}
            </span>
          ))}
        </div>
      </td>
    );
  }
}
