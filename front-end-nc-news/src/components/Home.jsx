import React from "react";
import Articles from "../components/Articles";
import "../App.css";
// import '../../node_modules/bootstrap-css-only';

const Home = () => {
  return <Articles inHomePage={true} />;
};

export default Home;
