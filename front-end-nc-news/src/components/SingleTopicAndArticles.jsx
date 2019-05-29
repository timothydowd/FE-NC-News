import React from "react";
import Articles from "./Articles";


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
