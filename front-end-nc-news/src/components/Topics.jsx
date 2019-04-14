import React, { Component } from 'react';
import '../App.css';
import { Link } from '@reach/router'
import { getTopics } from './apis'
import AddTopicForm from './AddTopicForm'
import loaderGif from '../images/roboloader.gif'

//https://ncnewstimdowd.herokuapp.com/api

class Topics extends Component {

  
   state = {
      topics: [],
      topicQuery: '',
      wasTopicAdded: false,
      loading: false
   }
    
   
  render() {
    if(this.state.loading) return (
      <img src={loaderGif} height='150px' width='150px'/>
    )
    return (
        <div>
            <h2>Topics</h2>
            <AddTopicForm setTopicAddedToTrue={this.setTopicAddedToTrue} userLoggedIn={this.props.userLoggedIn}/>
            <div>
                {
                  this.state.topics.map(topic => {
                      return (
                        <Link to ={`/articles/?topic=${topic.slug}`} key={topic.slug}>
                           <div key={topic.slug} className='articleContainer' >
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
    this.setState({wasTopicAdded: true, loading: true})
}

  componentDidMount() {
    
     Promise.resolve(getTopics())
         .then(topicData => {
           this.setState({ 
             topics: topicData,
             loading: false
             
           })
         })
  }

  componentDidUpdate(prevState) {

    if(this.state.wasTopicAdded === true){
      Promise.resolve(getTopics())
         .then(topicData => {
           this.setState({ 
             topics: topicData,
             wasTopicAdded: false,
             topicQuery: prevState.topicQuery,
             loading: false
           })
         })
    }
   
  }


}

export default Topics;