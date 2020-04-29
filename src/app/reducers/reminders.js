import {
  ADD_REMINDER,
  EDIT_REMINDER,
  DELETE_REMINDER,
  DELETE_ALL_REMINDERS,
  DELETE_ALL_DAY_REMINDERS,
} from "../actions";

export default function reminder(state = {}, action) {
  switch (action.type) {
    case ADD_REMINDER:
    case DELETE_REMINDER:
    case DELETE_ALL_REMINDERS:
    case DELETE_ALL_DAY_REMINDERS:
    case EDIT_REMINDER:
      return action.payload;
    default:
      return state;
  }
}
