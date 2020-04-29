import { NEXT_MONTH, PREV_MONTH } from "../actions/";

export default function dateObject(state = {}, action) {
  switch (action.type) {
    case NEXT_MONTH:
      return action.change;
    case PREV_MONTH:
      return action.change;
    default:
      return state;
  }
}
