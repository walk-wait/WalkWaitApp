import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Nav from './components/Nav'
import Footer from './components/Footer'
import Main from './pages/Main'
import Admin from './pages/Admin'
<<<<<<< HEAD
import AboutPage from './pages/About'
=======
import Err from './pages/404'
>>>>>>> master

function App() {
  return (
    <Router>
      <div style={{backgroundColor: "#212121"}}>
        <Nav />
          <Switch>
            <Route exact path="/" component={Main}/>
<<<<<<< HEAD
            <Route exact path="/admin" component={Admin}/> 
            <Route exact path="/about" component={AboutPage}></Route>      
=======
            <Route exact path="/admin" component={Admin}/>
            <Route component={Err} />       
>>>>>>> master
          </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
