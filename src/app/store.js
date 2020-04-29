import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { logger } from "redux-logger";
import initialDate from "./reducers/initialDate";
import reminders from "./reducers/reminders";

const rootReducer = combineReducers({
  initialDate,
  reminders,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger))
);

export default store;
