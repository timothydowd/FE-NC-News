import React, { Component } from "react";
import { getTopics } from "./apis";
import loaderGif from "../images/roboloader.gif";
import { Dropdown, DropdownButton, Card } from "react-bootstrap";


class ChooseTopicAddArticle extends Component {
  state = {
    topics: [],
    topicQuery: "",
    wasTopicAdded: false,
    loading: false
  };

  render() {
    if (this.state.loading)
      return <img src={loaderGif} height="150px" width="150px" alt="loading" />;
    return (
      <div className="card-container col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-6">
        <p />
        <Card className="Card">
          <Card.Header>Add an Article</Card.Header>
          <p />
          <DropdownButton
            id="dropdown-basic-button"
            title="Select a Topic to Add an Article"
          >
            {this.state.topics.map(topic => {
              return (
                <Dropdown.Item href={`/articles/?topic=${topic.slug}`}>
                  {topic.slug}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
          <p />
        </Card>
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

export default ChooseTopicAddArticle;
