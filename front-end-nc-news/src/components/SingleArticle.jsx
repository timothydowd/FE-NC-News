import React, { Component } from 'react';
import '../App.css';
import { Link, navigate } from '@reach/router'
import Axios from 'axios';
import AddCommentForm from '../components/AddCommentForm'
import { deleteArticle, deleteComment, addVoteToComment } from '../components/apis'


//https://ncnewstimdowd.herokuapp.com/api

class SingleArticle extends Component {

    constructor(props) {
        super(props);
    
        this.state = { 
            articleByArticleId: {},
            commentsByArticleId: [],
            wasCommentAdded: false,
            wasCommentLiked: false,
            like: 0,
            
        }
        
        
        this.handleClickDeleteArticle = this.handleClickDeleteArticle.bind(this)
        this.handleClickDeleteComment = this.handleClickDeleteComment.bind(this)
       
      }

    

    componentDidMount() {
        Promise.all([this.getArticleById(), this.getCommentsByArticleId()])
            .then(([articleData, commentsData]) =>{
                this.setState({ 
                    articleByArticleId: articleData, 
                    commentsByArticleId: commentsData,
                })
               
            
            })
    }

    componentDidUpdate() {
        
        if( this.state.wasCommentAdded || this.state.wasCommentDeleted ){
            Promise.all([this.getArticleById(), this.getCommentsByArticleId()])
            .then(([articleData, commentsData]) =>{
                this.setState({ 
                    articleByArticleId: articleData, 
                    commentsByArticleId: commentsData,
                    wasCommentAdded: false,
                    wasCommentDeleted: false
                })
            })
        }
         else if( this.state.like !== 0 ) {
             Promise.resolve(this.patchVoteByArticleId(this.state.like))
             .then(updatedArticle => {
                this.setState({ 
                    articleByArticleId: updatedArticle, 
                    like: 0 
                })
               
             }) 
         }

         else if( this.state.wasCommentLiked){
            Promise.all([this.getArticleById(), this.getCommentsByArticleId()])
            .then(([articleData, commentsData]) =>{
                this.setState({ 
                    articleByArticleId: articleData, 
                    commentsByArticleId: commentsData,
                    wasCommentLiked: false
                })
              
            
            })
         }
    }

    getArticleById = () => {
        return Axios.get(
          `https://ncnewstimdowd.herokuapp.com/api/articles/${this.props.article_id}`
        )
        .then(articleData => {
            return articleData.data.article
        })
      }

    handleAddCommentClick = () => {
        this.setState({wasCommentAdded: true})
    }
   

    getCommentsByArticleId = () => {
        return Axios.get(
           `https://ncnewstimdowd.herokuapp.com/api/articles/${this.props.article_id}/comments`
        )
        .then(commentsData => {
             return commentsData.data.commentsByArticleId
        })
    }
   
    

     handleLikeClick = (like) => {
        
        if(this.props.userLoggedIn) this.setState({like: like})
     }

     handleCommentLikeClick = (like, commentId) => {
         
        
        if(this.props.userLoggedIn){
            Promise.resolve(addVoteToComment(like, commentId))
            .then((updatedComment) => {
                this.setState({wasCommentLiked: true})
            })
        }
     }


     patchVoteByArticleId = (like) => {
         return Axios.patch(
            `https://ncnewstimdowd.herokuapp.com/api/articles/${this.props.article_id}`,
            {inc_votes: like}
          )
          .then((articleData) => {
              return articleData.data.updatedArticle
               
          })
     }

     handleClickDeleteArticle() {
         
         Promise.resolve(deleteArticle(this.state.articleByArticleId.article_id))
         .then(() => {
             navigate('/articles')
         })
         

     }

     handleClickDeleteComment(commentId) {
         
         
        Promise.resolve(deleteComment(commentId))
        .then(() => {

            this.setState({wasCommentDeleted: true})
            
        })
        

    }

  
    render() {

        const { title, body, author, comment_count, created_at, topic, votes } = this.state.articleByArticleId

        return(
            <div>
                    <h1>single article</h1>
                        <div className='articleContainer'>
                            <p> Title: {title} </p>
                            <p> Author: {author} </p>
                            <p> Body: {body} </p>
                            <p> Comments: {comment_count} </p>
                            <p> Created: {created_at} </p>
                            <p> Topic: {topic} </p>
                            <p> Likes: {votes+this.state.like} </p>
                            <span role="img" aria-label='Close' onClick={() => this.handleLikeClick(1)} >👍🏻</span><span>  vote  </span><span role="img" aria-label='Close' onClick={() => this.handleLikeClick(-1)} >👎🏻</span> 
                            <div>
                                <button disabled={this.props.userLoggedIn !== this.state.articleByArticleId.author } onClick={this.handleClickDeleteArticle} >Delete Article</button>
                            </div>
                        </div>
                        <div className='commentsContainer'>
                            <h3>comments</h3>

                            <AddCommentForm article_id={this.props.article_id} handleAddCommentClick={this.handleAddCommentClick} userLoggedIn={this.props.userLoggedIn} />

                            <div>
                                {
                                    this.state.commentsByArticleId.map(comment => {
                                        return (
                                                <div key={comment.comment_id} className='singleCommentContainer' >
                                                    <p> User: {comment.author} </p>
                                                    <p> Comment: {comment.body} </p>
                                                    <p> Created: {comment.created_at} </p>
                                                    <p> Likes: {comment.votes} </p>
                                                    <span role="img" aria-label='Close' onClick={() => this.handleCommentLikeClick(1, comment.comment_id)} >👍🏻</span><span>  vote  </span><span role="img" aria-label='Close' onClick={() => this.handleCommentLikeClick(-1, comment.comment_id)} >👎🏻</span>
                                                    <div>
                                                        <button disabled={this.props.userLoggedIn !== comment.author } onClick={() => this.handleClickDeleteComment(comment.comment_id)} >Delete Comment</button>
                                                     </div>
                                                </div>
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
