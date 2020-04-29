import { NEXT_MONTH, PREV_MONTH } from "../actions";
import moment from "moment";

const defaultState = moment();

export default function dateObject(state = defaultState, action) {
  switch (action.type) {
    case NEXT_MONTH:
      return action.payload;
    case PREV_MONTH:
      return action.payload;
    default:
      return state;
  }
}
