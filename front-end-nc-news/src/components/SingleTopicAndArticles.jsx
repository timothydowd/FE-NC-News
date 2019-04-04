import React, { Component } from 'react';
import '../App.css';
import { Link } from '@reach/router'
import Axios from 'axios';
import Articles from './Articles'

//https://ncnewstimdowd.herokuapp.com/api

class SingleTopicAndArticles extends Component {

  
   


    state = {
        topic: ''
     
     }

  
    render() {
    
        return (
            <div>
                <p>{this.state.topic}</p>
                <Articles topicQuery={this.props.location.search}/>
            </div>
        )

  
    }

    componentDidMount(){
        
        this.setState({topic: this.props.location.search})
    }
}



export default SingleTopicAndArticles;

