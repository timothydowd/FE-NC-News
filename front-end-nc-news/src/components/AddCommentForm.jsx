import React, { Component } from "react";
import Axios from 'axios';
import { Card, Form, Button } from 'react-bootstrap'
import '../App.css'
import { postComment } from './apis'

class AddCommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newComment: {
        
        body: ""
      },
      inputWarning: false
      
    };
    
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this)
   
  }

  handleChange(event) {
    this.setState({newComment:{body: event.target.value}})
  }

  handleFormSubmit(e) {
    e.preventDefault();
    
    Promise.resolve(postComment(this.props.article_id, this.state.newComment.body, this.props.userLoggedIn ))
    .then((status) => {
      if(status) {
        
        this.setState({inputWarning: false})
        this.props.handleAddCommentClick()
        
        
      }
      else {
        console.log('result: ', status)
        this.setState({inputWarning: true})
      }
      
    })
    
  }

  componentDidMount(){
    this.setState({inputWarning: false})
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

                {this.state.inputWarning && 
                  <Form.Text className="warningText">
                      <p/>
                      Please ensure there are no empty fields
                  </Form.Text>
                }
              </Form>                   
        </Card>
      </div>

    );
  }
}


export default AddCommentForm;