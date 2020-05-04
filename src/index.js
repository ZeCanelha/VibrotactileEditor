import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./stores/storeReducers";
import { composeWithDevTools } from "redux-devtools-extension";

import Editor from "./components/editor";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducers, composeWithDevTools())}>
        <Editor></Editor>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
