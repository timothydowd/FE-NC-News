import React, { Component } from "react";
import Axios from 'axios';

class AddCommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newComment: {
        username: "",
        body: ""
      },
      
    };
    
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this)
   
  }

  handleChange(event) {
    this.setState({newComment:{body: event.target.value}})
  }

  handleFormSubmit(e) {
    e.preventDefault();
    Axios.post(
        `https://ncnewstimdowd.herokuapp.com/api/articles/${this.props.article_id}/comments`,
        {
            body: this.state.newComment.body,
            username: "butter_bridge"
        }
      ).then(() => {
        this.props.handleAddCommentClick()

      })
  }

  render() {
    return (
      <form className="commentContainer" onSubmit={this.handleFormSubmit}>
        <div className="form-group">
            
            <textarea onChange={this.handleChange} placeholder='Add your thoughts....' rows='10' cols='45'/>
            <button onSubmit={this.handleFormSubmit} disabled={!this.props.userLoggedIn}>Add Comment</button>
            </div>
      
      </form>
    );
  }
}


export default AddCommentForm;