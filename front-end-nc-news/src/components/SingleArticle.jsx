import React, { Component } from 'react';
import '../App.css';
import { Link } from '@reach/router'
import Axios from 'axios';
import AddCommentForm from '../components/AddCommentForm'


//https://ncnewstimdowd.herokuapp.com/api

class SingleArticle extends Component {

    state = { 
        articleByArticleId: {},
        commentsByArticleId: [],
        wasCommentAdded: false
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
        if( this.state.wasCommentAdded === true ){
            console.log('condiiton met')
            Promise.all([this.getArticleById(), this.getCommentsByArticleId()])
            .then(([articleData, commentsData]) =>{
                this.setState({ 
                    articleByArticleId: articleData, 
                    commentsByArticleId: commentsData,
                    wasCommentAdded: false
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
   
     getCommentsByArticleId = () => {
       return Axios.get(
           `https://ncnewstimdowd.herokuapp.com/api/articles/${this.props.article_id}/comments`
         )
         .then(commentsData => {
             return commentsData.data.commentsByArticleId
         })
     }
   
     commentAdded = () => {
       this.setState({wasCommentAdded: true})
     }

     handleVote = () => {
         console.log('i got a click')
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
                            <p> Likes: {votes} </p>
                            <span role="img" aria-label='Close' onClick={this.handleVote} >👍🏻</span><span>  vote  </span><span role="img" aria-label='Close' onClick={this.handleVote} >👎🏻</span> 
                        </div>
                        <div className='commentsContainer'>
                            <h3>comments</h3>

                            <AddCommentForm article_id={this.props.article_id} commentAdded={this.commentAdded} />

                            <div>
                                {
                                    this.state.commentsByArticleId.map(comment => {
                                        return (
                                                <div key={comment.comment_id} className='commentsContainer' >
                                                    <p> User: {comment.author} </p>
                                                    <p> Comment: {comment.body} </p>
                                                    <p> Created: {comment.created_at} </p>
                                                    <p> Likes: {comment.votes} </p>
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
