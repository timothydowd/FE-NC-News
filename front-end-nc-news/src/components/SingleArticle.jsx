import React, { Component } from 'react';
import '../App.css';
import { Link } from '@reach/router'
import Axios from 'axios';


//https://ncnewstimdowd.herokuapp.com/api

class SingleArticle extends Component {

  state = { 
      singleArticle: {},
      commentsByArticleId: []

 }
  
  render() {
      return(
          <div>
              <h1>single article</h1>
              {this.displaySingleArticle()}

          </div>
      )
  }

  componentDidMount() {
    this.getArticleById();
    this.getCommentsByArticleId();
  }

//   componentDidUpdate() {
    
//   }

  getArticleById = () => {
    Axios.get(
      `https://ncnewstimdowd.herokuapp.com/api/articles/${this.props.article_id}`
    )
    .then(articleData => {
      this.setState({ singleArticle: articleData.data.article })
    })
  }

  getCommentsByArticleId = () => {
    Axios.get(
        `https://ncnewstimdowd.herokuapp.com/api/articles/${this.props.article_id}/comments`
      )
      .then(commentsData => {
          this.setState({ commentsByArticleId: commentsData.data.commentsByArticleId})
          //console.log(this.state.commentsByArticleId)
      })
  }

  

    displaySingleArticle =() => {
        const { title, body, author, comment_count, created_at, topic, votes } = this.state.singleArticle

        return (
            <div>
                <div className='articleContainer'>
                    <p> Title: {title} </p>
                    <p> Author: {author} </p>
                    <p> Body: {body} </p>
                    <p> Comments: {comment_count} </p>
                    <p> Created: {created_at} </p>
                    <p> Topic: {topic} </p>
                    <p> Likes: {votes} </p>
                </div>
                <div className='commentsContainer'>
                    <h3>comments</h3>
                    <div>{this.displayComments()}</div>
                </div>
            </div>
        )   
    }

    displayComments = () => {
        console.log(this.state.commentsByArticleId)
        return (
            <div>
                {
                    this.state.commentsByArticleId.map(comment => {
                        return (
                                <div key={comment.comment_id} className='commentsContainer' >
                                    <p> User: {comment.author} </p>
                                    <p> Comment: {comment.body} </p>
                                    <p> Created: {comment.created_at} </p>
                                    <p> Likes: {comment.votes} </p>
                                </div>
                        )
                    })   
                }
            </div>
        )   
    }
}



export default SingleArticle;
