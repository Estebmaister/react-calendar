/*
 * action types
 */

export const ADD_REMINDER = "ADD_REMINDER";
export const EDIT_REMINDER = "EDIT_REMINDER";
export const DELETE_REMINDER = "DELETE_REMINDER";
export const DELETE_ALL_REMINDERS = "DELETE_ALL_REMINDERS";
export const DELETE_ALL_DAY_REMINDERS = "DELETE_ALL_DAY_REMINDERS";
export const NEXT_MONTH = "NEXT_MONTH";
export const PREV_MONTH = "PREV_MONTH";

/*
 * action creators
 */

export function addReminder(data) {
  return { type: ADD_REMINDER, payload: data };
}

export function editReminder(data) {
  return { type: EDIT_REMINDER, payload: data };
}

export function deleteReminder(data) {
  return { type: DELETE_REMINDER, payload: data };
}

export function deleteAllReminders(data) {
  return { type: DELETE_ALL_REMINDERS, payload: data };
}

export function deleteAllDayReminders(data) {
  return { type: DELETE_ALL_DAY_REMINDERS, payload: data };
}

export function nextMonth(data) {
  return { type: NEXT_MONTH, payload: data };
}

export function prevMonth(data) {
  return { type: PREV_MONTH, payload: data };
}
