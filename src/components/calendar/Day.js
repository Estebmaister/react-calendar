import React from "react";
import moment from "moment";
import SpringPopper from "./Popper.js";
import Forecast from "./Forecast.js";

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
    // Binding functions for "this" access.
    this.currentDayF = this.currentDayF.bind(this);
    this.month = this.month.bind(this);
    this.year = this.year.bind(this);
    this.firstDayOfMonth = this.firstDayOfMonth.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onDeleteRemind = this.onDeleteRemind.bind(this);

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

  componentWillReceiveProps = (nextProps) => {
    const newReminder = nextProps.addReminder
    if (newReminder.date &&
      newReminder.date.isSame(this.props.fullDate, 'day')) {
      const currentReminder = this.props.addReminder
      const currentReminderIndex = (currentReminder.reminder ? currentReminder.reminder.currentReminder : -1)
      if (newReminder.reminder.currentReminder !== currentReminderIndex) {
        const { reminders } = this.state;
        reminders.push(newReminder.reminder);
        this.setState({
          popperAnchor: null,
          reminders: reminders.sort(
            (r1, r2) => parseFloat(r1.startTime) - parseFloat(r2.startTime)
          ),
        });
      }
    }
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
    this.props.createNewReminder(reminder.date, reminder)
  };

  onClose = () => {
    this.setState({ popperAnchor: null });
  };

  onDeleteRemind = (event) => {
    const { reminders } = this.state;
    reminders.splice(event.target.value, 1);
    this.setState({
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
            onClose={this.onClose}
            fullDate={this.props.fullDate}
          />
        </span>
        <div className="reminds">
          {this.state.reminders.map((remind, index) => (
            <span
              className={"spanRemind " + remind.category}
              key={"remind" + index}
            >
              <p className={"text-reminder"}>
                <button
                  value={index}
                  className={"dlt-butt"}
                  onClick={this.onDeleteRemind}
                >
                  {"x"}{" "}
                </button>
                {String(remind.text)}
              </p>
              {String(remind.city)}
              <br />
              {String(remind.startTime)}
              <br />
            </span>
          ))}
          <Forecast />
        </div>
      </td>
    );
  }
}
