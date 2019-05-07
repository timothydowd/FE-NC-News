import React, { Component } from 'react';
import '../App.css';


import {  patchVoteByCommentId } from '../components/apis'
import loaderGif from '../images/roboloader.gif'
import { Card, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown, faHeart } from '@fortawesome/free-solid-svg-icons'

//https://ncnewstimdowd.herokuapp.com/api

class SingleComment extends Component {

    constructor(props) {
        super(props);
    
        this.state = { 
            commentByCommentId: {},
            wasCommentLiked: false,
            currentLike: 0,
            likeCount: 0,
            loading: false
            
        }
    }

    
    componentDidMount() {
        
    }

    componentDidUpdate(prevState) {
        if( this.state.currentLike !== 0 ) {
            Promise.resolve(patchVoteByCommentId(this.state.currentLike, this.props.comment.comment_id))
            .then(updatedComment => {
                console.log(updatedComment)
               this.setState({ 
                   commentByCommentId: updatedComment, 
                   currentLike: 0,
                   loading: false
               })
              
            }) 
        }

        
    }

  



    handleCommentLikeClick = (like) => {
        console.log('hit comment like')
        if(this.props.userLoggedIn && this.state.likeCount < 1  && like === 1) {
            this.setState(prevState => ({currentLike: like, likeCount: prevState.likeCount + 1}))
        }
        if(this.props.userLoggedIn && this.state.likeCount > -1  && like === -1) {
            this.setState(prevState => ({currentLike: like, likeCount: prevState.likeCount - 1}))
        }
    }


    render() {

        if(this.state.loading) return (
            <img src={loaderGif} height='150px' width='150px'/>
          )

        return(
            // <div>
                   
            //     <div key={this.props.comment.comment_id} className='singleCommentContainer' >
            //         <p> User: {this.props.comment.author} </p>
            //         <p> Comment: {this.props.comment.body} </p>
            //         <p> Created: {this.props.comment.created_at} </p>
            //         <p> Likes: {this.props.comment.votes + this.state.likeCount} </p>
            //         <span role="img" aria-label='Close' onClick={() => this.handleCommentLikeClick(1, this.props.comment.comment_id)} >👍🏻</span><span>  vote  </span><span role="img" aria-label='Close' onClick={() => this.handleCommentLikeClick(-1, this.props.comment.comment_id)} >👎🏻</span>
            //         <div>
            //             <button disabled={this.props.userLoggedIn !== this.props.comment.author } onClick={() => this.props.handleClickDeleteComment(this.props.comment.comment_id)} >Delete Comment</button>
            //         </div>
            //     </div>
            // </div>

            <Card className='Card' key={this.props.comment.comment_id} >
                <Card.Header className='cardHeader'>
                    <Card.Title className='cardTitle'> {this.props.comment.author} says...</Card.Title>
                </Card.Header>            
                <Card.Body>                
                    <Card.Text>{this.props.comment.body}</Card.Text>               
                </Card.Body>
                <Card.Footer>Created: {this.props.comment.created_at}  
                <span role="img" aria-label='Close' onClick={() => this.handleCommentLikeClick(1, this.props.comment.comment_id)} > <FontAwesomeIcon icon={faThumbsUp} /> </span>
                <span> {this.props.comment.votes + this.state.likeCount}  </span>
                <span role="img" aria-label='Close' onClick={() => this.handleCommentLikeClick(-1, this.props.comment.comment_id)} ><FontAwesomeIcon icon={faThumbsDown} /> </span> 
                    <Button disabled={this.props.userLoggedIn !== this.props.comment.author } onClick={() => this.props.handleClickDeleteComment(this.props.comment.comment_id)} >Delete Comment</Button>
                </Card.Footer>
            </Card>
        )
    }
}


export default SingleComment;