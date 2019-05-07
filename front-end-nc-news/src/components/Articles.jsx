import React, { Component } from 'react';
import '../App.css';
import { Link } from '@reach/router'
import { getArticles }  from './apis'
import AddArticleForm from './AddArticleForm'
import loaderGif from '../images/roboloader.gif'
import { Card }from 'react-bootstrap'

//https://ncnewstimdowd.herokuapp.com/api

class Articles extends Component {

  
   constructor(props) {
    super(props);

    this.state = {
      articles: [],
      query: '',
      articleAdded: false,
      loading: true
     }
    
    
    this.handleChangeDropDown = this.handleChangeDropDown.bind(this)
   
  }

  renderArticles(mode){

      return (
        <div>
          {mode === 'add an article' && <AddArticleForm userLoggedIn={this.props.userLoggedIn} setArticleAddedToTrue={this.setArticleAddedToTrue} topicQuery={this.props.topicQuery}/>}
          <p>{mode}</p>
          <select onChange={this.handleChangeDropDown}>
            <option value="">Newest</option>
            <option value="?sort_by=votes">Most Liked</option>
            <option value="?sort_by=comment_count">Most Commented</option>
            <option value="?sort_by=votes&order=asc">Most Disliked</option>
          </select>
          
            {
                this.state.articles.map(article => {
                    return (
                        // <Link to ={`/articles/${article.article_id}`} key={article.article_id} >
                        //     <div className='articleContainer' >
                        //         <p> Title: {article.title} </p>
                        //         <p> Author: {article.author} </p>
                        //         <p> Body: {`${article.body.substring(0,100)}......`} </p>
                        //         <p> Comments: {article.comment_count} </p>
                        //         <p> Created: {article.created_at} </p>
                        //         <p> Topic: {article.topic} </p>
                        //         <p> Likes: {article.votes} </p>
                        //     </div>
                        // </Link>
                        <Link to ={`/articles/${article.article_id}`} key={article.article_id} >
                          <Card className='Card' >
                              <Card.Header className='cardHeader'>
                                <Card.Title className='cardTitle'> {article.title}</Card.Title>
                                <Card.Text>in {article.topic}</Card.Text>
                                <Card.Subtitle className="articleAuthor">by {article.author}</Card.Subtitle>
                              </Card.Header>
                              
                                <Card.Body>
                                  {/* <Link to ={`/articles/${article.article_id}`} key={article.article_id} > */}
                                    <Card.Text>in {article.topic} {`${article.body.substring(0,400)}......`} </Card.Text>
                                  {/* </Link> */}
                                </Card.Body>
                              <Card.Footer>Created: {article.created_at} Comments: <i className="glyphicon glyphicon-thumbs-up"></i>{article.comment_count} Likes: {article.votes}</Card.Footer>
                          </Card>
                        </Link>
                        
                    )
                })   
            }
        </div>
      )   
    

  }
  
  render() {

    if(this.state.loading) return (
      <img src={loaderGif} height='150px' width='150px'/>
    )
    if(this.props.inHomePage){
      return this.renderArticles('in home page')   
    }
    else if(this.props.userQuery){
      return this.renderArticles('your articles') 
    }
    else return this.renderArticles('add an article')

  }

  
  setArticleAddedToTrue = () => {
    this.setState({articleAdded: true, loading: true})
  }
  
  
  handleChangeDropDown(e) {
    e.preventDefault();
    this.setState({query:e.target.value})
  }


  componentDidMount() {
    
      Promise.resolve(getArticles(this.props.topicQuery || this.props.userQuery))
          .then(articleData => {
            console.log('didmount')
            this.setState({ 
              articles: articleData, 
            
              query: '',
              articleAdded: false,
              loading:false
            })
          })
  }

  
  componentDidUpdate(prevState, prevProps) {


      if(this.state.query !== prevState.query || this.state.articleAdded === true){
        Promise.resolve(getArticles(this.props.topicQuery || this.props.userQuery, this.state.query))
          .then(articles => {
            console.log('didupdate')
            this.setState({ 
              articles: articles,
              
              query: prevState.query, 
              articleAdded: false,
              loading: false
            })
          })
      }
  }
  
}



export default Articles;

