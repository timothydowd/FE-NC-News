import React, { Component } from 'react';
import '../App.css';
import { Link } from '@reach/router'
import { getTopics } from './apis'
import AddTopicForm from './AddTopicForm'


//https://ncnewstimdowd.herokuapp.com/api

class Topics extends Component {

  
   state = {
      topics: [],
      topicQuery: '',
      wasTopicAdded: false
      
   }
    
   
  render() {
    return (
        <div>
            <h2>Topics</h2>
            <AddTopicForm setTopicAddedToTrue={this.setTopicAddedToTrue}/>
            <div>
                {
                  this.state.topics.map(topic => {
                      return (
                        <Link to ={`/articles/?topic=${topic.slug}`} key={topic.slug}>
                           <div key={topic.slug} className='singleCommentContainer' >
                              <p> Topic: {topic.slug} </p>
                              <p> Description: {topic.description} </p>
                          </div>
                        </Link>     
                      )
                  })   
                }
            </div>
        </div>
    )   
  }

  setTopicAddedToTrue = () => {
    this.setState({wasTopicAdded: true})
}

  componentDidMount() {
     Promise.resolve(getTopics())
         .then(topicData => {
           this.setState({ 
             topics: topicData 
           })
         })
  }

  componentDidUpdate() {
    if(this.state.wasTopicAdded === true){
      Promise.resolve(getTopics())
         .then(topicData => {
           this.setState({ 
             topics: topicData 
           })
         })
    }
   
  }


}

export default Topics;