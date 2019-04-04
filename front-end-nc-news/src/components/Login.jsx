import React, { Component } from 'react';
import '../App.css';
import { getUser } from './apis'


class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          
            username: null,
            
        };
        
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this)
    
    }
    
      handleChangeUsername(event) {
            this.setState({username: event.target.value})
            console.log(this.state.username)
        }

   

    

    

    componentDidMount(){
      
    }

    componentDidUpdate(){
    }
  

    handleFormSubmit(event){
        event.preventDefault()
        Promise.resolve(getUser(this.state.username))
        .then(userDetails => {
            
            this.props.setUserLogin(userDetails.username)
            console.log(userDetails)
        })
    }

    
  
    render() {
    return (
      <div className="App">
        <h1>Log in</h1>
        <form className="articleContainer" onSubmit={this.handleFormSubmit}>
            <div className="form-group">
                <textarea onChange={this.handleChangeUsername} placeholder='Username' rows='1' cols='45'/>
                {/* <textarea onChange={this.handleChangeName} placeholder='Name' rows='1' cols='45'/>
                <textarea onChange={this.handleChangeAvatarUrl} placeholder='Avatar Url' rows='1' cols='45'/> */}
                 <textarea  placeholder='Password' rows='1' cols='45'/>
                <button onSubmit={this.handleFormSubmit}>Login</button>
            </div>
      
        </form>
         
      </div>
    );
  }


}

export default Login;