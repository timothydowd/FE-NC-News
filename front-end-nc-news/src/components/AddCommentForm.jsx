import React, { Component } from "react";
import Axios from 'axios';
import { Card, Form, Button } from 'react-bootstrap'
import '../App.css'

class AddCommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newComment: {
        
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
            username: this.props.userLoggedIn
        }
      ).then(() => {
        this.props.handleAddCommentClick()

      })
  }

  render() {
    return (
      // <form className="commentContainer" onSubmit={this.handleFormSubmit}>
      //   <div className="form-group">
            
      //       <textarea onChange={this.handleChange} placeholder='Add your thoughts....' rows='10' cols='45'/>
      //       <button onSubmit={this.handleFormSubmit} disabled={!this.props.userLoggedIn}>Add Comment</button>
      //       </div>
      
      // </form>
      <div className="card-container col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-12" key={this.props.article_id}>
        <Card >
          <Card.Header>
            Add a Comment?
          </Card.Header>
              <Form className='FormInput' onSubmit={this.handleFormSubmit}>
                <Form.Group controlId="formTopic">
                  {/* <Form.Control as="textarea" rows="3" className="form-control" /> */}
                  <textarea className="text-area-input" id="submitArticleTextArea" rows="7" placeholder="Add your thoughts..." onChange={this.handleChange}></textarea>
                
                </Form.Group>


                <Button variant="primary" type="submit" onSubmit={this.handleFormSubmit} disabled={!this.props.userLoggedIn}>
                  Add Comment
                </Button>
              </Form>                   
        </Card>
      </div>

    );
  }
}


export default AddCommentForm;