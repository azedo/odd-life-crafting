import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import _ from 'lodash'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import moment from 'moment'

import GLOBAL_VARS from '../../global_vars'

import axios from 'axios'

import Intro from '../layout/intro/Intro'
import Menu from '../layout/general/menu/Menu'
import Home from '../layout/pages/Home/Home'
import Episode from '../layout/pages/Episode/Episode'
import AboutUs from '../layout/pages/AboutUs/AboutUs'

import './Container.css'
import '../../Animations.css'

import Logo from './general/images/Logo'
import fourOhfour_bg from '../../assets/images/404.jpg'

const NoMatch = ({ location }) => (
  <div
    style={{
      height: window.innerHeight - 171,
      backgroundImage: 'url(' + fourOhfour_bg + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '20px 35px',
      color: 'white'
    }}
  >
    <h3
      style={{
        fontSize: '80px',
        margin: '0'
      }}
    >
      404
    </h3>
    <p>
      The url{' '}
      <code
        style={{
          background: 'lightgray',
          padding: '5px',
          color: 'black',
          margin: '0 8px 0 10px',
          fontSize: '14px',
          fontWeight: 'bold'
        }}
      >
        {location.pathname}
      </code>{' '}
      doesn't exists.
    </p>
    <p>If you think this is an error, please send us a message!</p>
    <p>
      <Link
        to="/"
        style={{
          color: 'black',
          background: 'white',
          padding: '15px',
          display: 'inline-block',
          marginTop: '25px'
        }}
      >
        Go back to the home page
      </Link>
    </p>
  </div>
)

class Container extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      showIntro: true,
      episodes: null,
      pages: null,
      coverImages: null
    }

    this._onScrollEvent = this._onScrollEvent.bind(this)
    this._api = this._api.bind(this)

    this._coverImagesEndPoint = `${GLOBAL_VARS.apiUrl}/capa` // Endpoint for getting cover images
    this._pagesEndPoint = `${GLOBAL_VARS.apiUrl}/pages?lang=${props.lang}` // Endpoint for getting Wordpress Pages
    this._episodesEndPoint = `${GLOBAL_VARS.apiUrl}/project?lang=${props.lang}` // Endpoint for getting the projectss
    this._menusEndPoint = GLOBAL_VARS.menuApiUrl // Endpoint for getting the menus
    this._blogEndPoint = `${GLOBAL_VARS.apiUrl}/posts?lang=${props.lang}` // Endpoint for getting the blog posts
    this._instagramEndPoint = 'https://www.instagram.com/oddlifecrafting/media/' // Endpoint for getting the blog posts
  }

  componentWillMount() {
    this._api('get', this._pagesEndPoint).then(response => {
      this.setState({
        pages: response,
        isLoading: false
      })
    })

    // Cover images
    this._api('get', this._coverImagesEndPoint).then(response => {
      this.setState({
        coverImages: response,
        isLoading: false
      })
    })

    // Menu
    this._api('get', this._menusEndPoint).then(response => {
      let currMenu = response.find(menu => {
        return menu.slug === this.props.lang
      })

      this._api('get', this._menusEndPoint + currMenu.ID).then(response => {
        this.setState({
          menus: response,
          isLoading: false
        })
      })
    })

    // Episodes
    this._api('get', this._episodesEndPoint).then(response => {
      this.setState({
        episodes: response,
        isLoading: false
      })
    })

    // Blog
    this._api('get', this._blogEndPoint).then(response => {
      this.setState({
        blog: response.slice(0, 3),
        isLoading: false
      })
    })

    // Instagram
    this._api('get', this._instagramEndPoint, true).then(response => {
      this.setState({
        instagram: response,
        isLoading: false
      })
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({
        showIntro: false
      })
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this._onScrollEvent)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._onScrollEvent)
  }

  // Method for getting data from the provided end point url
  _api(method, endPoint, allowCors = false) {
    let object = {
      method: method,
      url: endPoint
    }

    if (allowCors === true) {
      object.headers = {headers: {'Access-Control-Allow-Origin': 'https://www.instagram.com'}}
    }

    return new Promise((resolve, reject) => {
      axios(object)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
    })
  }

  // Method for getting Pages data
  getPages(cb) {
    this._api(this._pagesEndPoint).then(response => {
      this.getPosts(response, cb)
    })
    return true
  }

  // Method for getting Posts data
  getPosts(pages, cb) {
    this.api(this.postsEndPoint).then(response => {
      const posts = response
      const payload = { pages, posts }

      this.getSuccess(payload) // Pass returned data to the store
      cb(payload) // This callback will be used for dynamic rout building
    })
    return true
  }

  _onScrollEvent() {
    let innerHeight = window.innerHeight,
      scroll = document.body.scrollTop

    if (scroll >= innerHeight && this.state.showIntro) {
      this.setState({ showIntro: false })
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="loading">
          <Logo />
        </div>
      )
    } else {
      let aboutUsPage

      if (this.state.pages !== null) {
        aboutUsPage = this.state.pages.find(page =>
          page.slug.startsWith('about-us')
        )
      }

      return (
        <div className="app">
          {this.state.showIntro &&
          this.props.location.pathname === '/' && (
            <CSSTransitionGroup
              component="div"
              transitionName="fadein"
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
            >
              <Intro
                coverImage={this.state.coverImages !== null
                  ? this.state.coverImages[0].acf.imagem_de_capa.url
                  : null
                }
              />
            </CSSTransitionGroup>
          )}

          <div className="main-content" style={{ margin: '20px' }}>
            <Menu links={this.state.menus} lang={this.props.lang} />

            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Home
                    blog={this.state.blog}
                    episodes={this.state.episodes}
                  />
                )}
              />
              <Route
                exact
                path="/project/:project_slug/:episode_slug"
                render={props => (
                  <CSSTransitionGroup
                    component="div"
                    transitionName="fadein"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                  >
                    <Episode
                      {...props}
                      episode={this.state.episodes[0].acf.episodio.find(
                        id =>
                          _.kebabCase(id.project_title) ===
                          props.match.params.episode_slug
                      )}
                    />
                  </CSSTransitionGroup>
                )}
              />
              <Route
                exact
                path="/blog/:year/:month/:day/:slug"
                render={props => (
                  <CSSTransitionGroup
                    component="div"
                    transitionName="fadein"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                  >
                    <div>
                      And here comes the post!
                      <br />
                      COMPONENT: BlogPost
                    </div>
                  </CSSTransitionGroup>
                )}
              />
              <Route
                exact
                path="/about-us"
                render={props => (
                  <CSSTransitionGroup
                    component="div"
                    transitionName="fadein"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                  >
                    <AboutUs title={aboutUsPage.title.rendered} content={aboutUsPage.content.rendered} />
                  </CSSTransitionGroup>
                )}
              />
              <Route component={NoMatch} />
            </Switch>
          </div>

          <div className="footer">© {moment('2017-01-01').format('YYYY')}</div>
        </div>
      )
    }
  }
}

export default Container
