import React, { Component } from 'react';
import '../App.css';
import { Link } from '@reach/router'
import Axios from 'axios';
import { getArticlesBySort, getArticles }  from './apis'


//https://ncnewstimdowd.herokuapp.com/api

class Articles extends Component {

  
   

   constructor(props) {
    super(props);

    this.state = {
      articles: [],
      sortByQuery: '',
      topicQuery: '',
      query: ''
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

  

  //  
  
  handleChange(e) {
    e.preventDefault();
    this.setState({query:e.target.value})
    
  }


  componentDidMount() {
    
      Promise.resolve(getArticles(this.props.location.search))
          .then(articleData => {
            console.log(articleData)
            this.setState({ 
              articles: articleData, 
            })
          })
    //}
    

    
  }

  // componentDidUpdate(prevState) {
  //   if(this.state.sortByQuery !== prevState.sortByQuery){
  //     Promise.resolve(getArticlesBySort(this.state.sortByQuery))
  //       .then(articles => {
  //         this.setState({ 
  //           articles: articles, 
  //         })
  //       })
  //   }
  // }

   componentDidUpdate(prevState) {

    if(this.props.location.search || this.state.query !== prevState.query){
      Promise.resolve(getArticles(this.props.location.search || this.state.query))
        .then(articles => {
          this.setState({ 
            articles: articles, 
          })
        })
    }
  }
  
}



export default Articles;

