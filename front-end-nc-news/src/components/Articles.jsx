import React, { Component } from 'react';
import '../App.css';
import { Link } from '@reach/router'
import { getArticles }  from './apis'
import AddArticleForm from './AddArticleForm'
import loaderGif from '../images/roboloader.gif'
import { Card }from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown, faComment, faHeart, faNewspaper, faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import avatar from '../images/user.png'
import { getUser } from './apis'
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
                        
                        <Link to ={`/articles/${article.article_id}`} key={article.article_id} >
                          <Card className='Card' >
                              <Card.Header className='cardHeader'>
                                <Card.Title className='cardTitle'> <FontAwesomeIcon icon={faNewspaper} /> &nbsp; {article.title}</Card.Title>
                                <Card.Text>in {article.topic}</Card.Text>
                                <Card.Subtitle 
                                  className="articleAuthor">by {article.author} 
                                  <img src={this.getAuthorAvatar(article.author)} alt='avatar not worked' height="42" width="42"></img> 
                                </Card.Subtitle>
                              </Card.Header>
                                <Card.Body>
                                    <Card.Text> <FontAwesomeIcon icon={faQuoteLeft} /> &nbsp; {`${article.body.substring(0,400)}......`} &nbsp; <FontAwesomeIcon icon={faQuoteRight} /> </Card.Text>
                                </Card.Body>
                              <Card.Footer>Created: {article.created_at} &nbsp; <FontAwesomeIcon icon={faComment} /> {article.comment_count} &nbsp; <FontAwesomeIcon icon={article.votes < 0 ? faThumbsDown : faThumbsUp} /> {article.votes}</Card.Footer>
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

  getAuthorAvatar = (author) => {
    return Promise.resolve(getUser(author))
    .then((authorData) => {
      console.log(authorData.avatar_url)
      return authorData.avatar_url
    })
     
  }


  componentDidMount() {
    
      Promise.resolve(getArticles(this.props.topicQuery || this.props.userQuery))
          .then(articleData => {
            
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

