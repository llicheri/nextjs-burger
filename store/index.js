import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "./reducers";

const dev = process.env.NODE_ENV !== "production";

export default state => {
  const middlewares = dev ? [thunkMiddleware, createLogger()] : [];
  const composeEnhancers = composeWithDevTools({});
  return createStore(
    reducers,
    state,
    composeEnhancers(applyMiddleware(...middlewares))
  );
};
