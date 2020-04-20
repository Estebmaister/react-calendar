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
    this.onSave = this.onSave.bind(this);
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
  };

  onDoubleClick = (event) => {
    this.setState({
      popperAnchor: Boolean(this.popperAnchor) ? null : event.currentTarget,
    });
  };

  onSave = (reminder) => {
    const { reminders } = this.state;
    reminders.push(reminder);
    this.setState({
      popperAnchor: null,
      reminders: reminders.sort(
        (r1, r2) => parseFloat(r1.startTime) - parseFloat(r2.startTime)
      ),
    });
  };

  render() {
    return (
      <td
        key={"d" + this.props.day}
        className={`calendar-day ${this.props.currentDay}`}
        onDoubleClick={this.onDoubleClick}
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
            <span
              className={"spanRemind " + remind.category}
              key={"remind" + index}
            >
              {console.log(index)}
              <p className={"text-reminder"}>
                <button className={"dlt-butt"}>{"x"} </button>
                {String(remind.text)}
              </p>
              {String(remind.city)}
              <br />
              {String(remind.startTime)}
              <br />
            </span>
          ))}
        </div>
      </td>
    );
  }
}
