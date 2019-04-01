import React, { Component } from 'react';
import '../App.css';
import { Router, Link } from '@reach/router'
import Axios from 'axios';


//https://ncnewstimdowd.herokuapp.com/api

class Articles extends Component {

  state = { articles: [] }
  render() {
      return(
          <div>
              {this.displayArticles()}

          </div>
      )
  }

  componentDidMount() {
    this.getArticles();
  }

  getArticles = () => {
    Axios.get(
      'https://ncnewstimdowd.herokuapp.com/api/articles'
    )
    .then(articleData => {
      this.setState({ articles: articleData.data.articles })
      console.log(this.state.articles)
    })
  }

  

    displayArticles() {
        return (
            <div>
                {
                    this.state.articles.map(article => {
                        return (
                            <div key={article.article_id} className='articleBorder' onClick={openArticle()}>
                                <p> Title: {article.title} </p>
                                <p> Author: {article.author} </p>
                                <p> Body: {article.body} </p>
                                <p> Comment Count: {article.comment_count} </p>
                                <p> Created: {article.created_at} </p>
                                <p> Topic: {article.topic} </p>
                                <p> Likes: {article.votes} </p>
                            </div>
                        )
                    })   
                }
            </div>
        )   
    }
}

const openArticle = (event) => {
    console.log(event)
}

export default Articles;

