import React, { Component } from 'react';
//import { connect } from 'react-redux';
//import { css } from 'emotion';
//import * as actions from './store/actions';
import Shop from './containers/Shop/Shop';
//import Spinner from './components/UI/Spinner/Spinner';

class App extends Component {

  componentDidMount() {
    
  }
  render() {
  
    return (
      <div className="App">
        <Shop />
        {/* <Spinner /> */}
      </div>
    );
  }
}



export default App;
