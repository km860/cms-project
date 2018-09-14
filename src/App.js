import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { css, injectGlobal } from 'emotion';
//import * as actions from './store/actions';
import Shop from './containers/Shop/Shop';
//import Spinner from './components/UI/Spinner/Spinner';

injectGlobal`
  * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;     
  }
`

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
