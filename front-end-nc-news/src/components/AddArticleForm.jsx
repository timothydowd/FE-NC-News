import React, { Component } from "react";
import { postArticle } from "./apis";

class AddArticleForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newArticle: {
        title: "",
        body: "",
        topic: "",
        
      },
      
    };
    
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleChangeBody = this.handleChangeBody.bind(this)
    this.handleChangeTopic = this.handleChangeTopic.bind(this)
   
  }

    handleChangeTitle(event) {
        this.setState({newArticle:{title: event.target.value, body: this.state.newTopic.body, topic: this.state.newTopic.topic}})
    }

    handleChangeBody(event) {
        this.setState({newArticle:{title: this.state.newTopic.title, body: event.target.value, topic: this.state.newTopic.topic}})
    }

    handleChangeTopic(event) {
        this.setState({newArticle:{title: this.state.newTopic.title, body: this.state.newTopic.body, topic: event.target.value}})
    }



  handleFormSubmit(event) {
    event.preventDefault();
    
    const { title, body, topic } = this.state.newArticle
    Promise.resolve(postArticle( title, body, topic, 'butter_bridge' ))
    .then(() =>  this.props.setArticleAddedToTrue())
    
  }

  render() {
    return (
      <form className="articleContainer" onSubmit={this.handleFormSubmit}>
        <div className="form-group">
            <textarea onChange={this.handleChangeTitle} placeholder='Title' rows='1' cols='45'/>
            <select onChange={this.handleChangeTopic}>
                
                <option value="">Newest</option>
                <option value="?sort_by=votes">Most Liked</option>
                <option value="?sort_by=comment_count">Most Commented</option>
                <option value="?sort_by=votes&order=asc">Most Disliked</option>
            </select>
            <textarea onChange={this.handleChangeBody} placeholder='Your content....' rows='5' cols='45'/>
            <button onSubmit={this.handleFormSubmit}>Add Article</button>
            </div>
      
      </form>
    );
  }
}


export default AddArticleForm;