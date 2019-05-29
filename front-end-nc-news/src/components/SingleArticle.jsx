import React, { Component } from "react";
import { navigate } from "@reach/router";
import AddCommentForm from "../components/AddCommentForm";
import {
  changeTimeFormat,
  deleteArticle,
  deleteComment,
  patchVoteByArticleId,
  getArticleById,
  getCommentsByArticleId
} from "../components/apis";
import loaderGif from "../images/roboloader.gif";
import SingleComment from "./SingleComment";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faThumbsUp,
  faThumbsDown,
  faComment,
  faNewspaper,
  faQuoteLeft,
  faQuoteRight
} from "@fortawesome/free-solid-svg-icons";


class SingleArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articleByArticleId: {},
      commentsByArticleId: [],
      wasCommentAdded: false,
      wasCommentLiked: false,
      currentLike: 0,
      likeCount: 0,
      loading: false
    };

    this.handleClickDeleteArticle = this.handleClickDeleteArticle.bind(this);
    this.handleClickDeleteComment = this.handleClickDeleteComment.bind(this);
  }

  componentDidMount() {
    Promise.all([
      getArticleById(this.props.article_id),
      getCommentsByArticleId(this.props.article_id)
    ]).then(([articleData, commentsData]) => {
      this.setState({
        articleByArticleId: articleData,
        commentsByArticleId: commentsData,
        loading: false
      });
    });
  }

  componentDidUpdate(prevState) {
    if (this.state.wasCommentAdded || this.state.wasCommentDeleted) {
      Promise.all([
        getArticleById(this.props.article_id),
        getCommentsByArticleId(this.props.article_id)
      ]).then(([articleData, commentsData]) => {
        this.setState({
          articleByArticleId: articleData,
          commentsByArticleId: commentsData,
          wasCommentAdded: false,
          wasCommentDeleted: false,
          loading: false
        });
      });
    } else if (this.state.currentLike !== 0) {
      Promise.resolve(
        patchVoteByArticleId(this.state.currentLike, this.props.article_id)
      ).then(updatedArticle => {
        this.setState({
          articleByArticleId: updatedArticle,
          currentLike: 0,
          loading: false
        });
      });
    } else if (this.state.wasCommentLiked) {
      Promise.all([
        getArticleById(this.props.article_id),
        getCommentsByArticleId(this.props.article_id)
      ]).then(([articleData, commentsData]) => {
        this.setState({
          articleByArticleId: articleData,
          commentsByArticleId: commentsData,
          wasCommentLiked: false,
          loading: false
        });
      });
    }
  }

  handleAddCommentClick = () => {
    this.setState({ wasCommentAdded: true });
  };

  handleArticleLikeClick = like => {
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

  handleClickDeleteArticle() {
    this.setState({ loading: true });
    Promise.resolve(
      deleteArticle(this.state.articleByArticleId.article_id)
    ).then(() => {
      navigate("/articles");
    });
  }

  handleClickDeleteComment(commentId) {
    this.setState({ loading: true });
    Promise.resolve(deleteComment(commentId)).then(() => {
      this.setState({ wasCommentDeleted: true });
    });
  }

  render() {
    if (this.state.loading)
      return <img src={loaderGif} height="150px" width="150px" alt="loading" />;

    const {
      title,
      body,
      author,
      comment_count,
      created_at,
      topic,
      votes,
      article_id
    } = this.state.articleByArticleId;

    return (
      <div
        className="card-container col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-6"
        key={article_id}
      >
        <Card>
          <Card.Header className="cardHeader">
            <Card.Title className="cardTitle">
              {" "}
              <FontAwesomeIcon icon={faNewspaper} /> &nbsp; {title}
            </Card.Title>
            <Card.Text>in {topic}</Card.Text>
            <Card.Subtitle className="articleAuthor">by {author}</Card.Subtitle>
          </Card.Header>

          <Card.Body>
            <Card.Text>
              {" "}
              <FontAwesomeIcon icon={faQuoteLeft} /> {body}{" "}
              <FontAwesomeIcon icon={faQuoteRight} />{" "}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            {" "}
            <FontAwesomeIcon icon={faCalendarAlt} />{" "}
            {changeTimeFormat(created_at)} &nbsp;&nbsp;{" "}
            <FontAwesomeIcon icon={faComment} /> {comment_count}
            <span
              role="img"
              aria-label="Close"
              onClick={() => this.handleArticleLikeClick(1)}
            >
              {" "}
              &nbsp;&nbsp; <FontAwesomeIcon icon={faThumbsUp} />{" "}
            </span>
            <span> {votes + this.state.currentLike} </span>
            <span
              role="img"
              aria-label="Close"
              onClick={() => this.handleArticleLikeClick(-1)}
            >
              {" "}
              <FontAwesomeIcon icon={faThumbsDown} /> &nbsp;&nbsp;{" "}
            </span>
            <button
              disabled={
                this.props.userLoggedIn !== this.state.articleByArticleId.author
              }
              onClick={this.handleClickDeleteArticle}
            >
              Delete Article
            </button>
          </Card.Footer>
        </Card>

        <div>
          <h3>comments</h3>

          <AddCommentForm
            article_id={this.props.article_id}
            handleAddCommentClick={this.handleAddCommentClick}
            userLoggedIn={this.props.userLoggedIn}
          />

          <div>
            {this.state.commentsByArticleId.map(comment => {
              return (
                <SingleComment
                  handleClickDeleteComment={this.handleClickDeleteComment}
                  key={comment.comment_id}
                  userLoggedIn={this.props.userLoggedIn}
                  comment={comment}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default SingleArticle;
