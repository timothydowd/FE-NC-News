import React, { Component } from "react";
import { postTopic } from "./apis";
import { Form, Button, Card } from 'react-bootstrap'

class AddTopicForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newTopic: {
        slug: "",
        description: ""
      },
      
    };
    
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChangeTopic = this.handleChangeTopic.bind(this)
    this.handleChangeDescription = this.handleChangeDescription.bind(this)
   
  }

    handleChangeTopic(event) {
      this.setState({newTopic:{slug: event.target.value, description: this.state.newTopic.description}})
    }

    handleChangeDescription(event) {
      this.setState({newTopic:{slug: this.state.newTopic.slug, description: event.target.value}})
    }

  handleFormSubmit(event) {
    event.preventDefault();
    
    const { slug, description } = this.state.newTopic
    Promise.resolve(postTopic( slug, description ))
    .then(() =>  this.props.setTopicAddedToTrue())
    
  }
  componentDidMount(){
    
  }

  

  render() {
    return (
      // <form className="topicContainer" onSubmit={this.handleFormSubmit}>
      //   <div className="form-group">
      //       <input onChange={this.handleChangeTopic} placeholder='Name your topic....' size='35'/>
      //       <textarea onChange={this.handleChangeDescription} placeholder='Add a description....' rows='5' cols='45'/>
      //       <button onSubmit={this.handleFormSubmit} disabled={!this.props.userLoggedIn}>Add Topic</button>
      //       </div>
      
      // </form>

      <Card className='Card' >
        <Card.Header>
          Add a New Topic?
        </Card.Header>
            <Form className='FormInput'>
              <Form.Group controlId="formTopic">
                {/* <Form.Label>Topic</Form.Label> */}
                <Form.Control type="email" placeholder="Enter a topic..." />
              </Form.Group>

              <Form.Group controlId="formTopicDescription">
                {/* <Form.Label>Description</Form.Label> */}
                <Form.Control type="password" placeholder="Enter a brief description of your topic here..." />
              </Form.Group>

              <Button variant="primary" type="submit">
                Add Topic
              </Button>
            </Form>                   
      </Card>

    );
  }
}


export default AddTopicForm;