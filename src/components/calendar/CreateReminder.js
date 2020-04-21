import React from "react";
// import moment from "moment";

export default class CreateReminder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentReminder: 0,
      text: "Reminder",
      city: "Bogota",
      category: "home",
      date: props.fullDate.format("YYYY-MM-DD"),
      startTime: "10:00:00",
    };

    this.state.endTime = `${
      parseInt(this.state.startTime.slice(0, 2), 10) + 1
      }:${this.state.startTime.slice(2)}`;

    this.currentDayF = this.currentDayF.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  currentDayF = () => parseInt(this.props.dateObject.format("D"));

  handleChangeText(event) {
    this.setState({
      text: event.target.value,
    });
  }

  handleChangeCity(event) {
    this.setState({
      city: event.target.value,
    });
  }

  handleChangeCategory(event) {
    this.setState({
      category: event.target.value,
    });
  }

  handleChangeStartTime(event) {
    this.setState({
      startTime: event.target.value,
    });
  }

  handleChangeDate(event) {
    this.setState({
      date: event.target.value,
    });
  }

  handleSubmit = (event) => {
    this.setState({
      currentReminder: this.state.currentReminder + 1,
    });
    event.preventDefault();
    const { onSave } = this.props;
    onSave(this.state);
  };

  onClick = (event) => {
    this.props.onDayClick(event, this.state.day);
  };

  onClose = (event) => {
    const { onClose } = this.props;
    onClose();
  };

  render() {
    return (
      <form className="form-reminder" onSubmit={this.handleSubmit}>
        Add reminder <button type="submit">Save</button>
        <button type="button" onClick={this.onClose}>
          X
        </button>
        <br />
        <input
          type="type"
          maxLength="30"
          placeholder={this.props.placeholder || "New reminder..."}
          autoFocus="true"
          value={this.props.text || this.state.text}
          onChange={this.handleChangeText}
        />
        <br />
        <input
          maxLength="30"
          value={this.props.city || this.state.city}
          onChange={this.handleChangeCity}
        ></input>
        <br />
        <select
          value={this.state.category}
          onChange={this.handleChangeCategory}
        >
          <option value="home">Home</option>
          <option value="work">Work</option>
          <option value="calendar">Calendar</option>
        </select>
        <br />
        <input
          type="time"
          value={this.state.startTime}
          onChange={this.handleChangeStartTime}
        />
        <input
          type="date"
          value={this.state.date}
          onChange={this.handleChangeDate}
        />
      </form>
    );
  }
}
