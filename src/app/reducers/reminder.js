import {
  ADD_REMINDER,
  EDIT_REMINDER,
  DELETE_REMINDER,
  DELETE_ALL_REMINDER,
} from "../actions/";

export default function reminder(state = [], action) {
  switch (action.type) {
    case ADD_REMINDER:
      return [...state, { reminders: action.reminders }];
    case DELETE_REMINDER:
      return [...state, { reminders: action.reminders }];
    case DELETE_ALL_REMINDER:
      return [...state, { reminders: action.reminders }];
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
