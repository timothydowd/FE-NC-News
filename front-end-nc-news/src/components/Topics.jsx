import React, { Component } from "react";
import { Link } from "@reach/router";
import { getTopics } from "./apis";
import AddTopicForm from "./AddTopicForm";
import loaderGif from "../images/roboloader.gif";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import "../App.css";
// import '../../node_modules/bootstrap-css-only';

class Topics extends Component {
  state = {
    topics: [],
    topicQuery: "",
    wasTopicAdded: false,
    loading: false
  };

  render() {
    if (this.state.loading)
      return <img src={loaderGif} height="150px" width="150px" />;
    return (
      <div>
        <h2>Topics</h2>
        <AddTopicForm
          setTopicAddedToTrue={this.setTopicAddedToTrue}
          userLoggedIn={this.props.userLoggedIn}
        />
        <div>
          {this.state.topics.map(topic => {
            return (
              <div
                className="card-container col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-6"
                key={topic.slug}
              >
                <Link to={`/articles/?topic=${topic.slug}`}>
                  <Card>
                    <Card.Header className="cardHeader">
                      <Card.Title>
                        {" "}
                        <FontAwesomeIcon icon={faLocationArrow} /> &nbsp;{" "}
                        {topic.slug}
                      </Card.Title>
                    </Card.Header>

                    <Card.Body>
                      <Card.Text>{topic.description} </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  setTopicAddedToTrue = () => {
    this.setState({ wasTopicAdded: true, loading: true });
  };

  componentDidMount() {
    Promise.resolve(getTopics()).then(topicData => {
      this.setState({
        topics: topicData,
        loading: false
      });
    });
  }

  componentDidUpdate(prevState) {
    if (this.state.wasTopicAdded === true) {
      Promise.resolve(getTopics()).then(topicData => {
        this.setState({
          topics: topicData,
          wasTopicAdded: false,
          topicQuery: prevState.topicQuery,
          loading: false
        });
      });
    }
  }
}

export default Topics;
