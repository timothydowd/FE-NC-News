import React, { Component } from 'react';
import '../App.css';
import { navigate } from '@reach/router'
import AddCommentForm from '../components/AddCommentForm'
import { deleteArticle, deleteComment, patchVoteByArticleId, getArticleById, getCommentsByArticleId } from '../components/apis'
import loaderGif from '../images/roboloader.gif'
import SingleComment from './SingleComment'
import { Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown, faComment } from '@fortawesome/free-solid-svg-icons'

//https://ncnewstimdowd.herokuapp.com/api

class SingleArticle extends Component {

    constructor(props) {
        super(props);
    
        this.state = { 
            articleByArticleId: {},
            commentsByArticleId: [],
            wasCommentAdded: false,
            wasCommentLiked: false,
            currentLike: 0,
            likeCount: 0,
            loading: false
            
        }
        
        
        this.handleClickDeleteArticle = this.handleClickDeleteArticle.bind(this)
        this.handleClickDeleteComment = this.handleClickDeleteComment.bind(this)
       
      }

    
    componentDidMount() {
        Promise.all([getArticleById(this.props.article_id), getCommentsByArticleId(this.props.article_id)])
            .then(([articleData, commentsData]) =>{
                this.setState({ 
                    articleByArticleId: articleData, 
                    commentsByArticleId: commentsData,
                    loading: false
                })
               
            
            })
    }

    componentDidUpdate(prevState) {
        
        if( this.state.wasCommentAdded || this.state.wasCommentDeleted ){
            Promise.all([getArticleById(this.props.article_id), getCommentsByArticleId(this.props.article_id)])
            .then(([articleData, commentsData]) =>{
                this.setState({ 
                    articleByArticleId: articleData, 
                    commentsByArticleId: commentsData,
                    wasCommentAdded: false,
                    wasCommentDeleted: false,
                    loading: false
                })
            })
        }
         else if( this.state.currentLike !== 0 ) {
             Promise.resolve(patchVoteByArticleId(this.state.currentLike, this.props.article_id))
             .then(updatedArticle => {
                 console.log(updatedArticle)
                this.setState({ 
                    articleByArticleId: updatedArticle, 
                    currentLike: 0,
                    loading: false
                })
               
             }) 
         }

         else if( this.state.wasCommentLiked){
            Promise.all([getArticleById(this.props.article_id), getCommentsByArticleId(this.props.article_id)])
            .then(([articleData, commentsData]) =>{
                this.setState({ 
                    articleByArticleId: articleData, 
                    commentsByArticleId: commentsData,
                    wasCommentLiked: false,
                    loading: false
                })
            })
         }
    }

  
    handleAddCommentClick = () => {
        this.setState({wasCommentAdded: true})
    }
   
    handleArticleLikeClick = (like) => {
            if(this.props.userLoggedIn && this.state.likeCount < 1  && like === 1) {
                this.setState(prevState => ({currentLike: like, likeCount: prevState.likeCount + 1}))
            }
            if(this.props.userLoggedIn && this.state.likeCount > -1  && like === -1) {
                this.setState(prevState => ({currentLike: like, likeCount: prevState.likeCount - 1}))
            }
    }

    


    handleClickDeleteArticle() {
        this.setState({loading: true})
         Promise.resolve(deleteArticle(this.state.articleByArticleId.article_id))
         .then(() => {
             navigate('/articles')
         })
    }

     handleClickDeleteComment(commentId) {
        this.setState({loading: true})
        Promise.resolve(deleteComment(commentId))
        .then(() => {
            this.setState({wasCommentDeleted: true})  
        })
    }

  
    render() {

        if(this.state.loading) return (
            <img src={loaderGif} height='150px' width='150px'/>
          )

        const { title, body, author, comment_count, created_at, topic, votes } = this.state.articleByArticleId

        return(
            <div>
                    <h1>single article</h1>
                        {/* <div className='articleContainer'>
                            <p> Title: {title} </p>
                            <p> Author: {author} </p>
                            <p> Body: {body} </p>
                            <p> Comments: {comment_count} </p>
                            <p> Created: {created_at} </p>
                            <p> Topic: {topic} </p>
                            <p> Likes: {votes+this.state.currentLike} </p>
                            <span role="img" aria-label='Close' onClick={() => this.handleArticleLikeClick(1)} >👍🏻</span><span>  vote  </span><span role="img" aria-label='Close' onClick={() => this.handleArticleLikeClick(-1)} >👎🏻</span> 
                            <div>
                                <button disabled={this.props.userLoggedIn !== this.state.articleByArticleId.author } onClick={this.handleClickDeleteArticle} >Delete Article</button>
                            </div>
                        </div> */}

                            <Card className='Card' >
                              <Card.Header className='cardHeader'>
                                <Card.Title className='cardTitle'> {title}</Card.Title>
                                <Card.Text>in {topic}</Card.Text>
                                <Card.Subtitle className="articleAuthor">by {author}</Card.Subtitle>
                              </Card.Header>
                              
                                <Card.Body>
                                  
                                    <Card.Text>in {topic} {body} </Card.Text>
                                 
                                </Card.Body>
                              <Card.Footer>Created: {created_at} &nbsp;&nbsp; <FontAwesomeIcon icon={faComment} /> {comment_count} 
                              <span role="img" aria-label='Close' onClick={() => this.handleArticleLikeClick(1)} > &nbsp;&nbsp; <FontAwesomeIcon icon={faThumbsUp} /> </span>
                              <span>  {votes+this.state.currentLike}  </span>
                              <span role="img" aria-label='Close' onClick={() => this.handleArticleLikeClick(-1)} > <FontAwesomeIcon icon={faThumbsDown} /> &nbsp;&nbsp; </span> 
                                
                                    <button disabled={this.props.userLoggedIn !== this.state.articleByArticleId.author } onClick={this.handleClickDeleteArticle} >Delete Article</button>
                                
                              </Card.Footer>
                              
                            </Card>

                        <div className='commentsContainer'>
                            <h3>comments</h3>

                            <AddCommentForm article_id={this.props.article_id} handleAddCommentClick={this.handleAddCommentClick} userLoggedIn={this.props.userLoggedIn} />

                            <div>
                               
                                
                                {
                                    this.state.commentsByArticleId.map(comment => {
                                        return (
                                            <SingleComment handleClickDeleteComment={this.handleClickDeleteComment} key={comment.comment_id} userLoggedIn={this.props.userLoggedIn} comment={comment} />
                                        )
                                    })   
                                }
                            
                            </div>
                        </div>
                

            </div>
        )
    }


   

}


export default SingleArticle;
