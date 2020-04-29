/**
 * Action types
 */
export const ADD_REMINDER = "ADD_REMINDER";
export const EDIT_REMINDER = "EDIT_REMINDER";
export const DELETE_REMINDER = "DELETE_REMINDER";
export const DELETE_ALL_REMINDERS = "DELETE_ALL_REMINDERS";
export const DELETE_ALL_DAY_REMINDERS = "DELETE_ALL_DAY_REMINDERS";
export const NEXT_MONTH = "NEXT_MONTH";
export const PREV_MONTH = "PREV_MONTH";

/**
 * Action creators
 */
export function addReminder(payload) {
  return { type: ADD_REMINDER, payload };
}

export function editReminder(payload) {
  return { type: EDIT_REMINDER, payload };
}

export function deleteReminder(payload) {
  return { type: DELETE_REMINDER, payload };
}

export function deleteAllReminders(payload) {
  return { type: DELETE_ALL_REMINDERS, payload };
}

export function deleteAllDayReminders(payload) {
  return { type: DELETE_ALL_DAY_REMINDERS, payload };
}

export function nextMonth(payload) {
  return { type: NEXT_MONTH, payload };
}

export function prevMonth(payload) {
  return { type: PREV_MONTH, payload };
}
