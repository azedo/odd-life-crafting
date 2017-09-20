import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Container from './components/layout/Container'

import './index.css'



class Routes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lang: ''
    }
  }

  componentWillMount() {
    let lang = window.navigator.language

    if (lang.startsWith('en')) { lang = 'en' }
    else { lang = 'pt' }

    this.setState({ lang })
  }

  render() {
    return (
      <Router>
        <div>
          <Route
            path="/"
            render={(props) => <Container {...props} lang={this.state.lang} />}
          />
        </div>
      </Router>
    )
  }
}

export default Routes



ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);
