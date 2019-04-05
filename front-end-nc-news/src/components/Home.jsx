import React, { Component } from 'react';
import '../App.css';
import Articles from '../components/Articles'
import {getArticles} from '../components/apis'
import { Link } from '@reach/router'



class Home extends Component {
  render() {
    return (
      <div className="App">
        <h1>Home page</h1>
        <p>this page will show all popular articles, in the mean time you can access articles by using articles by topic  **better viewed in mobile device mode</p>
        
         
      </div>
    );
  }

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     articles: [],
  //     sortByQuery: '',
  //     query: '',
  //    }
    
    
  //   this.handleChange = this.handleChange.bind(this)
   
  // }
  
  // render() {
    
  //   return (
  //       <div>
         
  //         <select onChange={this.handleChange}>
  //           <option value="">Newest</option>
  //           <option value="?sort_by=votes">Most Liked</option>
  //           <option value="?sort_by=comment_count">Most Commented</option>
  //           <option value="?sort_by=votes&order=asc">Most Disliked</option>
  //         </select>
          
          
          
  //           {
  //               this.state.articles.map(article => {
  //                   return (
  //                       <Link to ={`/articles/${article.article_id}`} key={article.article_id} >
  //                           <div className='articleContainer' >
  //                               <p> Title: {article.title} </p>
  //                               <p> Author: {article.author} </p>
  //                               <p> Body: {`${article.body.substring(0,100)}......`} </p>
  //                               <p> Comments: {article.comment_count} </p>
  //                               <p> Created: {article.created_at} </p>
  //                               <p> Topic: {article.topic} </p>
  //                               <p> Likes: {article.votes} </p>
  //                           </div>
  //                       </Link>
  //                   )
  //               })   
  //           }
  //       </div>
  //   )   
  // }

  
  
  
  
  // handleChange(e) {
  //   e.preventDefault();
  //   this.setState({query:e.target.value})
    
  // }


  // componentDidMount() {
    
  //     Promise.resolve(getArticles())
  //         .then(articleData => {
            
  //           this.setState({ 
  //             articles: articleData, 
  //             sortByQuery: '',
  //             query: '',
  //           })
  //         })
  
  // }

  

  // componentDidUpdate(prevState) {
   
  //     if(this.state.query !== prevState.query){
  //       Promise.resolve(getArticles(null, this.state.query))
  //         .then(articles => {
  //           this.setState({ 
  //             articles: articles,
  //             sortByQuery: prevState.sortByQuery,
  //             query: prevState.query, 
  //           })
  //         })
  //     }
  //   }
}

export default Home;