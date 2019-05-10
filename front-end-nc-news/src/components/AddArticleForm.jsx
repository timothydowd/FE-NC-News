import React, { Component } from "react";
import { postArticle } from "./apis";
import { Card, Form, Button } from 'react-bootstrap'

class AddArticleForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newArticle: {
        title: "",
        body: "",
        
      }
    
      
    };
    
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleChangeBody = this.handleChangeBody.bind(this)
    
   
  }

    handleChangeTitle(event) {
        this.setState({newArticle:{title: event.target.value, body: this.state.newArticle.body}})
    }

    handleChangeBody(event) {
        this.setState({newArticle:{title: this.state.newArticle.title, body: event.target.value}})
    }




  handleFormSubmit(event) {
    event.preventDefault();
    const { title, body } = this.state.newArticle
    const topic = this.props.topicQuery.slice(7)
    Promise.resolve(postArticle( title, body, topic, this.props.userLoggedIn ))
    .then(() =>  this.props.setArticleAddedToTrue())
    
  }

  



  render() {
    return (
      // <form className="articleContainer" onSubmit={this.handleFormSubmit}>
      //   <div className="form-group">
      //       <input onChange={this.handleChangeTitle} placeholder='Title' size='45'/>
            
      //       <textarea onChange={this.handleChangeBody} placeholder='Your content....' rows='5' cols='45'/>
      //       <button onSubmit={this.handleFormSubmit} disabled={!this.props.userLoggedIn}>Add Article</button>
      //       </div>
      
      // </form>

      <div className="card-container col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-6">
        <Card className='Card' >
          <Card.Header>
            Add a New Article?
          </Card.Header>
            <Form className='FormInput' onSubmit={this.handleFormSubmit}>
              <Form.Group controlId="formArticleTitle">
                {/* <Form.Label>Topic</Form.Label> */}
                <Form.Control className="text-area-input" type="input" placeholder="Enter a title..." onChange={this.handleChangeTitle} />
              </Form.Group>

              <Form.Group controlId="formArticleContent">
                {/* <Form.Label>Description</Form.Label> */}
                {/* <Form.Control type="input" placeholder="Write your article here..." onChange={this.handleChangeBody} /> */}
                <textarea className="text-area-input" id="submitArticleTextArea" rows="7" placeholder="Write your article here..." onChange={this.handleChangeBody}></textarea>
              </Form.Group>

              <Button variant="primary" type="submit" onSubmit={this.handleFormSubmit} disabled={!this.props.userLoggedIn}>
                Add Article
              </Button>
            </Form>                   
        </Card>
      </div>
    );
  }
}


export default AddArticleForm;