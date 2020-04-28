import { combineReducers } from "redux";
import {
  ADD_REMINDER,
  EDIT_REMINDER,
  DELETE_REMINDER,
  DELETE_ALL_REMINDER,
  NEXT_MONTH,
  PREV_MONTH,
} from "./actions";

function dateObject(state = {}, action) {
  switch (action.type) {
    case NEXT_MONTH:
      return action.change;
    case PREV_MONTH:
      return action.change;
    default:
      return state;
  }
}

function reminder(state = [], action) {
  switch (action.type) {
    case ADD_REMINDER:
      return [...state, { reminder: action.reminder }];
    case DELETE_REMINDER:
      return [...state, { reminder: action.reminder }];
    case DELETE_ALL_REMINDER:
      return [...state, { reminder: action.reminder }];
    case EDIT_REMINDER:
      return state.map((reminder, index) => {
        if (index === action.index) {
          return Object.assign({}, reminder, {
            reminderTitle: reminder.reminderTitle,
            reminderCity: reminder.reminderCity,
            reminderDate: reminder.reminderDate,
            reminderStartTime: reminder.reminderStartTime,
            reminderCategory: reminder.reminderCategory,
          });
        }
        return reminder;
      });
    default:
      return state;
  }
}

const calendarApp = combineReducers({
  dateObject,
  reminder,
});

export default calendarApp;
