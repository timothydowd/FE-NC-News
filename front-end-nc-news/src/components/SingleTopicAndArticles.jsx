import React from "react";
import Articles from "./Articles";
import "../App.css";
// import '../../node_modules/bootstrap-css-only';

const SingleTopicAndArticles = (props) => {
 
    return (
      <div>
        <p>Articles in {props.location.search.slice(7)}</p>
        <Articles
          userLoggedIn={props.userLoggedIn}
          topicQuery={props.location.search}
        />
      </div>
    );
  
}

export default SingleTopicAndArticles;
