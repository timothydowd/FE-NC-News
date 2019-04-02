import React, { Component } from 'react';
import '../App.css';
import { Router, Link } from '@reach/router'
import Axios from 'axios';


//https://ncnewstimdowd.herokuapp.com/api

class SingleArticle extends Component {

  state = { singleArticle: {} }
  
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
  }

  componentDidUpdate() {
    
  }

  getArticleById = () => {
    Axios.get(
      `https://ncnewstimdowd.herokuapp.com/api/articles/${this.props.article_id}`
    )
    .then(articleData => {
      this.setState({ singleArticle: articleData.data.article })
    })
  }

 

    displaySingleArticle() {
        const { title, body, author, comment_count, created_at, topic, votes } = this.state.singleArticle

        return (
            <div className='articleContainer'>
                <p> Title: {title} </p>
                <p> Author: {author} </p>
                <p> Body: {body} </p>
                <p> Comments: {comment_count} </p>
                <p> Created: {created_at} </p>
                <p> Topic: {topic} </p>
                <p> Likes: {votes} </p>
            </div>
        )   
    }
}



export default SingleArticle;
