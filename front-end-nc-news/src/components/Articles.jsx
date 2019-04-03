import React, { Component } from 'react';
import '../App.css';
import { Link } from '@reach/router'
import Axios from 'axios';
import getArticlesBySort from './apis'


//https://ncnewstimdowd.herokuapp.com/api

class Articles extends Component {

  
   

   constructor(props) {
    super(props);

    this.state = {
      articles: [],
      sortBy: ''
     }
    
    
    this.handleChange = this.handleChange.bind(this)
   
  }
  
  render() {
    return (
        <div>
          <select onChange={this.handleChange}>
            <option value="">Newest</option>
            <option value="?sort_by=votes">Most Liked</option>
            <option value="?sort_by=comment_count">Most Commented</option>
            <option value="?sort_by=votes&order=asc">Most Disliked</option>
          </select>
          
          
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

  handleChange(e) {
    e.preventDefault();
    console.log(e.target.value)
    Promise.resolve(getArticlesBySort(e.target.value))
             .then(articleData => {
               
                this.setState({ 
                  articles: articleData, 
                })
                console.log(articleData)
               
             })
     
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
    })
  }

  
}



export default Articles;

