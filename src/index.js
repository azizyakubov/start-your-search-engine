import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { getStudents } from "./actions";
import rootReducer from "./reducers/rootReducer";

const store = createStore(rootReducer, applyMiddleware(thunk));
store.dispatch(getStudents());

const router = (
  <BrowserRouter>
    <Provider store={store}>
      {/* <Routes>
        <Route path="" component={App}></Route> */}
      {/* </Routes> */}
      <App></App>
    </Provider>
  </BrowserRouter>
);

ReactDOM.render(router, document.getElementById("root"));
