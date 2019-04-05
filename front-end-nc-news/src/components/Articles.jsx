import React, { Component } from 'react';
import '../App.css';
import { Link } from '@reach/router'
import Axios from 'axios';
import { getArticles }  from './apis'
import AddArticleForm from './AddArticleForm'

//https://ncnewstimdowd.herokuapp.com/api

class Articles extends Component {

  
   

   constructor(props) {
    super(props);

    this.state = {
      articles: [],
      sortByQuery: '',
      query: '',
      articleAdded: false
     }
    
    
    this.handleChange = this.handleChange.bind(this)
   
  }
  
  render() {
    
    return (
        <div>
          <AddArticleForm userLoggedIn={this.props.userLoggedIn} setArticleAddedToTrue={this.setArticleAddedToTrue} topicQuery={this.props.topicQuery}/>
          <select onChange={this.handleChange}>
            <option value="">Newest</option>
            <option value="?sort_by=votes">Most Liked</option>
            <option value="?sort_by=comment_count">Most Commented</option>
            <option value="?sort_by=votes&order=asc">Most Disliked</option>
          </select>
          
          
          
            {
                this.state.articles.map(article => {
                    return (
                        <Link to ={`/articles/${article.article_id}`} key={article.article_id} >
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

  
  setArticleAddedToTrue = () => {
    console.log(this.state)
    this.setState({articleAdded: true})
  }
  
  
  handleChange(e) {
    e.preventDefault();
    this.setState({query:e.target.value})
    
  }


  componentDidMount() {
    
      Promise.resolve(getArticles(this.props.topicQuery))
          .then(articleData => {
            
            this.setState({ 
              articles: articleData, 
              sortByQuery: '',
              query: '',
              articleAdded: false
            })
          })
  
  }

  

  componentDidUpdate(prevState) {
   
      if(this.state.query !== prevState.query || this.state.articleAdded === true){
        Promise.resolve(getArticles(this.props.topicQuery, this.state.query))
          .then(articles => {
            this.setState({ 
              articles: articles,
              sortByQuery: prevState.sortByQuery,
              query: prevState.query, 
              articleAdded: false
            })
          })
      }
    }
  
}



export default Articles;

