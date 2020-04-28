/*
 * action types
 */

export const ADD_REMINDER = "ADD_REMINDER";
export const EDIT_REMINDER = "EDIT_REMINDER";
export const DELETE_REMINDER = "DELETE_REMINDER";
export const DELETE_ALL_REMINDER = "DELETE_ALL_REMINDER";
export const NEXT_MONTH = "NEXT_MONTH";
export const PREV_MONTH = "PREV_MONTH";

/*
 * action creators
 */

export function addReminder(data) {
  return { type: ADD_REMINDER, data };
}

export function editReminder(data) {
  return { type: EDIT_REMINDER, data };
}

export function deleteReminder(data) {
  return { type: DELETE_REMINDER, data };
}

export function deleteAllReminder(data) {
  return { type: DELETE_ALL_REMINDER, data };
}

export function nextMonth(data) {
  return { type: NEXT_MONTH, data };
}

export function prevMonth(data) {
  return { type: PREV_MONTH, data };
}
