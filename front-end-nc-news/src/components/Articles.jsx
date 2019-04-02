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

  componentDidUpdate() {
    
  }

  getArticles = () => {
    Axios.get(
      'https://ncnewstimdowd.herokuapp.com/api/articles'
    )
    .then(articleData => {
      this.setState({ articles: articleData.data.articles })
      //console.log(this.state.articles)
    })
  }

  openArticle = (e) => {
    //console.log(e.target)
    }

    displayArticles() {
        return (
            <div>
                {
                    this.state.articles.map(article => {
                        return (
                            <Link to ={`/articles/${article.article_id}`} key={article.article_id}>
                                <div className='articleContainer' >
                                    <p> Title: {article.title} </p>
                                    <p> Author: {article.author} </p>
                                    <p> Body: {`${article.body.substring(0,100)}......`} </p>
                                    <p> Comments: {article.comment_count} </p>
                                    <p> Created: {article.created_at} </p>
                                    <p> Topic: {article.topic} </p>
                                    <p> Likes: {article.votes} </p>
                                </div>
                            </Link>
                        )
                    })   
                }
            </div>
        )   
    }
}



export default Articles;

