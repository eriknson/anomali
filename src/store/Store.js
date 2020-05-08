import { createStore, applyMiddleware, combineReducers } from "redux";
import keplerGlReducer from "kepler.gl/reducers";
import { taskMiddleware } from "react-palm/tasks";

const initialState = {};

const customizedKeplerGlReducer = keplerGlReducer.initialState({
  uiState: { readOnly: true },
});

const reducers = combineReducers({
  // <-- mount kepler.gl reducer in your app
  keplerGl: customizedKeplerGlReducer,

  // Your other reducers here
});

// using createStore
export default createStore(
  reducers,
  initialState,
  applyMiddleware(taskMiddleware)
);
