import React, { Component } from 'react';
import '../App.css';
import { Link } from '@reach/router'
import Axios from 'axios';
import { getTopics } from './apis'



//https://ncnewstimdowd.herokuapp.com/api

class Topics extends Component {

  
   

   state = {
      topics: [],
      topicQuery: ''
      
     }
    
   
  render() {
    return (
        <div>
            <h2>Topics</h2>
            <div>
              <button>Create New Topic</button>
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

  

  componentDidMount() {
     Promise.resolve(getTopics())
         .then(topicData => {
           this.setState({ 
             topics: topicData 
           })
         })
    
        
        
    
  }

  componentDidUpdate() {
   
  }


}

export default Topics;