import React, { Component } from 'react';
import '../App.css';
import Articles from './Articles'


//https://ncnewstimdowd.herokuapp.com/api

class SingleTopicAndArticles extends Component {

  

    state = {
      
     }
     
  
    render() {
    
        return (
            <div>
                <p>Articles in {this.props.location.search.slice(7)}</p>
                <Articles topicQuery={this.props.location.search}/>
            </div>
        )

    }

    componentDidMount(){
        
       
    }
}



export default SingleTopicAndArticles;

