import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { injectGlobal } from 'emotion';
import Shop from './containers/Shop/Shop';
import ProductPage from './containers/ProductPage';
import Checkout from './containers/Checkout';

injectGlobal`
  * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;     
      
      body {
        max-width: 1000px;
        margin: 0 auto;
      }
  }
`

class App extends Component {

  componentDidMount() {
    
  }
  render() {
    let routes = (
      <Switch>
        <Route path='/product/:id' component={ProductPage} />
        <Route path='/checkout' component={Checkout} />
        <Route path='/' exact component={Shop} />
      </Switch>
    )
    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}

export default App;
