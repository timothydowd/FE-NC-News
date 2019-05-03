import React, { Component } from "react";
import { postArticle } from "./apis";

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
      <form className="articleContainer" onSubmit={this.handleFormSubmit}>
        <div className="form-group">
            <input onChange={this.handleChangeTitle} placeholder='Title' size='45'/>
            
            <textarea onChange={this.handleChangeBody} placeholder='Your content....' rows='5' cols='45'/>
            <button onSubmit={this.handleFormSubmit} disabled={!this.props.userLoggedIn}>Add Article</button>
            </div>
      
      </form>
    );
  }
}


export default AddArticleForm;