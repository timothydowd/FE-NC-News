import React, { Component } from 'react';
import '../App.css';
import { Link } from '@reach/router'
import Axios from 'axios';
import { getTopics } from './apis'



//https://ncnewstimdowd.herokuapp.com/api

class Topics extends Component {

  
   

   state = {
      topics: [],
      
     }
    
   
  render() {
    return (
        <div>
            <h2>Topics</h2>
            <div>
                                {
                                    this.state.topics.map(topic => {
                                        return (
                                                <div key={topic.slug} className='singleCommentContainer' >
                                                    <p> Topic: {topic.slug} </p>
                                                    <p> Description: {topic.description} </p>
                                                </div>
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
           console.log(topicData)
         })
    
        
        
    
  }

  componentDidUpdate() {
   
  }


}

export default Topics;