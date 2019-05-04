import React from 'react';
import '../App.css';
import Articles from '../components/Articles'




const Home = () => {

  

 
    return (
      <div className="App">
        <h1>Home page</h1>
       
        <Articles inHomePage={true} />
         
      </div>
    );
  


}

export default Home;