import React from "react";
import Forecast from "./Forecast.js";
import ReminderDialog from "./ReminderDialog.js";
import TrashIcon from "./svgs/trash-alt.svg";
// import { useSelector } from "react-redux";
import { connect } from "react-redux";

// import { connect } from "react-redux";
const mapStateToProps = (state) => {
  return {
    reminders: state.reminders,
  };
};
// const { reminders } = useSelector(
//   (state) => state.reminders[this.props.fullDate.format("YYYY-MM-DD")]
// );

class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = { reminders: this.props.remindersUp };
    // Binding functions for "this" access.
    this.onClick = this.onClick.bind(this);
    this.addReminder = this.addReminder.bind(this);
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.reminders === this.props.reminders;
  // }
  /*componentWillReceiveProps(nProps) {
    if (nProps.fullDate !== this.props.fullDate) {
      this.setState({
        formatedFullDate: this.props.fullDate.format("YYYY-MM-DD"),
      });
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.formatedFullDate !== nextProps.fullDate.format("YYYY-MM-DD")
    ) {
      return {
        formatedFullDate: nextProps.fullDate.format("YYYY-MM-DD"),
      };
    }
    return null;
  }*/

  onClick = (event) => {
    this.props.onDayClick(event, this.props.day);
  };

  addReminder = (newReminder) => {
    this.props.addReminder(this.props.fullDate.format("YYYY-MM-DD"), {
      title: newReminder.reminderTitle,
      city: newReminder.reminderCity,
      date: this.props.fullDate.format("YYYY-MM-DD"),
      startTime: newReminder.reminderStartTime,
      category: newReminder.reminderCategory,
    });
  };

  editReminder = (index, newReminder) => {
    this.props.editReminder(this.props.fullDate.format("YYYY-MM-DD"), index, {
      title: newReminder.reminderTitle,
      city: newReminder.reminderCity,
      date: newReminder.reminderDate,
      startTime: newReminder.reminderStartTime,
      category: newReminder.reminderCategory,
    });
  };

  deleteReminder = (reminder) => {
    this.props.deleteReminder(
      this.props.fullDate.format("YYYY-MM-DD"),
      reminder.index
    );
  };

  render() {
    // const { reminders } = this.props;
    return (
      <td
        key={"d" + this.props.day}
        className={`calendar-day ${this.props.currentDay}`}
        onClick={this.onClick}
      >
        <span key={"sDay" + this.props.day} className="spanDay">
          {this.props.day}
          <div className="day-icon">
            {this.props.reminders[this.props.fullDate.format("YYYY-MM-DD")] && (
              <img
                className="trash-icon trash-day"
                src={TrashIcon}
                alt="Delete all"
                onClick={(e) =>
                  this.props.deleteAllReminders(
                    this.props.fullDate.format("YYYY-MM-DD")
                  )
                }
              />
            )}
            <ReminderDialog
              classes={{ root: "modal-container" }}
              action={`Add a new reminder on ${this.props.fullDate.format(
                "YYYY-MM-DD"
              )}`}
              showDateField={false}
              submitText={"Add reminder"}
              handleSubmit={this.addReminder}
            ></ReminderDialog>
          </div>
        </span>

        <div className="reminds">
          {this.props.reminders[this.props.fullDate.format("YYYY-MM-DD")] &&
            this.props.reminders[this.props.fullDate.format("YYYY-MM-DD")].map(
              (reminder) => (
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
                    date={this.props.fullDate.format("YYYY-MM-DD")}
                  />
                  <p className="text-reminder">{String(reminder.startTime)}</p>
                </span>
              )
            )}
        </div>
      </td>
    );
  }
}

// const mapStateToProps = (state) => {
//   return { ...state };
// };

// export default Day = connect(mapStateToProps)(Day);
export default connect(mapStateToProps)(Day);
