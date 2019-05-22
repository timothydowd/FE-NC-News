import React, { Component } from "react";
import "../App.css";
import Articles from "../components/Articles";

class UserContent extends Component {
  state = {
    userQuery: ""
  };

  render() {
    return (
      <div className="App">
        <h1>Your Content</h1>
        <Articles userQuery={`?author=${this.props.userLoggedIn}`} />
      </div>
    );
  }
}

export default UserContent;
