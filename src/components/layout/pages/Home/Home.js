import React, { Component, PropTypes } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import Intro from '../../../layout/intro/Intro'
import Menu from '../../../layout/general/menu/Menu'
import Thumb from '../../general/thumb/Thumb'

import Video from '../../../layout/pages/Video/Video'


class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showIntro: true
    }

    this._onScrollEvent = this._onScrollEvent.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this._onScrollEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._onScrollEvent);
  }

  _onScrollEvent() {
    console.log('it\'s scrolling!!')

    let innerHeight = window.innerHeight,
        scroll      = document.body.scrollTop,
        hightHalf   = innerHeight / 2

    if (scroll >= innerHeight && this.state.showIntro) {
      this.setState({ showIntro: false })
    }
  }

  render() {
    return (
      <div className="app">
        {( this.state.showIntro && <Intro /> )}

        <div className="main-content">
          <Menu />

          <p>{this.props.match.url}</p>

          <Switch>
            <Route path={`${this.props.match.url}/videos`} component={Video} />
            <Route path={`${this.props.match.url}/videos/:id`} component={Video} />
          </Switch>

          <div className="thumbs-grid">
            <Thumb />
            <Thumb />
            <Thumb />
            <Thumb />
            <Thumb />
          </div>
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  //myProp: PropTypes.string.isRequired
}

export default Home
