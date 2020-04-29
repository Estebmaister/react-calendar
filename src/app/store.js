import { createStore } from "redux";
import { combineReducers } from "redux";
import dateObject from "./reducers/dateObject";
import reminder from "./reducers/reminder";

const rootReducer = combineReducers({
  dateObject,
  reminder,
});

const store = createStore(rootReducer);
export default store;
