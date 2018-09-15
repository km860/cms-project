import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { css, injectGlobal } from 'emotion';
//import * as actions from './store/actions';
import Shop from './containers/Shop/Shop';
import ProductPage from './containers/ProductPage';
import Spinner from './components/UI/Spinner/Spinner';
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
    let routes = (
      <Switch>
        {/* <Route 
          path='/product'
          render={(props) => <ProductPage {...props} productInfo={this.props.chosenItem} />}
        /> */}
        <Route path='/product' component={ProductPage} />
        <Route path='/' exact component={Shop} />
      </Switch>
    )
    return (
      <div className="App">
        {routes}
        {/* <Spinner /> */}
      </div>
    );
  }
}



export default App;
