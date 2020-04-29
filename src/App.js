import React from "react";
import Calendar from "./components/calendar/";
import { connect } from "react-redux";
import * as actions from "./app/actions";

// ----------- Redux configuration
const mapStateToProps = (state) => {
  return { ...state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    nxMonth: (payload) => {
      dispatch(actions.nextMonth(payload));
    },
    pvMonth: (payload) => {
      dispatch(actions.prevMonth(payload));
    },
    newReminder: (payload) => {
      dispatch(actions.addReminder(payload));
    },
    changeReminder: (payload) => {
      dispatch(actions.editReminder(payload));
    },
    dltReminder: (payload) => {
      dispatch(actions.deleteReminder(payload));
    },
    dltAllReminders: (payload) => {
      dispatch(actions.deleteAllReminders(payload));
    },
    dltAllDayReminders: (payload) => {
      dispatch(actions.deleteAllDayReminders(payload));
    },
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Calendar);
// end ---------------------------

function App() {
  return (
    <div className="App">
      <Container />
    </div>
  );
}

export default App;
