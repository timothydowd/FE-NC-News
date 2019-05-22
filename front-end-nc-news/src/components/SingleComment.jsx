import React, { Component } from "react";
import "../App.css";
import { changeTimeFormat } from "../components/apis";
import { patchVoteByCommentId } from "../components/apis";
import loaderGif from "../images/roboloader.gif";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faThumbsUp,
  faThumbsDown,
  faQuoteLeft,
  faQuoteRight
} from "@fortawesome/free-solid-svg-icons";

class SingleComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commentByCommentId: {},
      wasCommentLiked: false,
      currentLike: 0,
      likeCount: 0,
      loading: false
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevState) {
    if (this.state.currentLike !== 0) {
      Promise.resolve(
        patchVoteByCommentId(
          this.state.currentLike,
          this.props.comment.comment_id
        )
      ).then(updatedComment => {
        console.log(updatedComment);
        this.setState({
          commentByCommentId: updatedComment,
          currentLike: 0,
          loading: false
        });
      });
    }
  }

  handleCommentLikeClick = like => {
    console.log("hit comment like");
    if (this.props.userLoggedIn && this.state.likeCount < 1 && like === 1) {
      this.setState(prevState => ({
        currentLike: like,
        likeCount: prevState.likeCount + 1
      }));
    }
    if (this.props.userLoggedIn && this.state.likeCount > -1 && like === -1) {
      this.setState(prevState => ({
        currentLike: like,
        likeCount: prevState.likeCount - 1
      }));
    }
  };

  render() {
    if (this.state.loading)
      return <img src={loaderGif} height="150px" width="150px" />;

    return (
      <div
        className="card-container col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-12"
        key={this.props.comment.comment_id}
      >
        <Card>
          <Card.Header className="cardHeader">
            <Card.Title className="cardTitle">
              {" "}
              {this.props.comment.author} says...
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              {" "}
              <FontAwesomeIcon icon={faQuoteLeft} /> &nbsp;{" "}
              {this.props.comment.body} &nbsp;{" "}
              <FontAwesomeIcon icon={faQuoteRight} />{" "}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            {" "}
            <FontAwesomeIcon icon={faCalendarAlt} />{" "}
            {changeTimeFormat(this.props.comment.created_at)} &nbsp;
            <span
              role="img"
              aria-label="Close"
              onClick={() =>
                this.handleCommentLikeClick(1, this.props.comment.comment_id)
              }
            >
              {" "}
              <FontAwesomeIcon icon={faThumbsUp} />{" "}
            </span>
            <span> {this.props.comment.votes + this.state.likeCount} </span>
            <span
              role="img"
              aria-label="Close"
              onClick={() =>
                this.handleCommentLikeClick(-1, this.props.comment.comment_id)
              }
            >
              <FontAwesomeIcon icon={faThumbsDown} /> &nbsp;{" "}
            </span>
            <Button
              disabled={this.props.userLoggedIn !== this.props.comment.author}
              onClick={() =>
                this.props.handleClickDeleteComment(
                  this.props.comment.comment_id
                )
              }
            >
              Delete Comment
            </Button>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

export default SingleComment;
