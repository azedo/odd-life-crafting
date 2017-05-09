import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Home from './components/layout/pages/Home/Home'
import Video from './components/layout/pages/Video/Video'

import './index.css';




const NoMatch = ({ location }) => (
  <div>
    <h3>APP -> No match for <code>{location.pathname}</code></h3>
  </div>
)



const Routes = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NoMatch}/>
      </Switch>
    </div>
  </Router>
)

export default Routes



ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);
