import React from "react";
import Articles from "../components/Articles";
import "../App.css";
// import '../../node_modules/bootstrap-css-only';

const UserContent = (props) => {
  
    return (
      <div className="App">
        <h1>Your Content</h1>
        <Articles userQuery={`?author=${props.userLoggedIn}`} />
      </div>
    );
  
}

export default UserContent;
