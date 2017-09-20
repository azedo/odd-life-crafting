import React, { Component } from 'react'
import _ from 'lodash'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import moment from 'moment'
import axios from 'axios'

import GLOBAL_VARS from '../../../../global_vars'

import Gallery from '../../../layout/pages/Gallery/Gallery'
import BlogItem from '../../../layout/pages/Blog/BlogItem'

import './Home.css'

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      blog: null,
      episodes: null
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.episodes !== nextProps.episodes) {
      this.setState({
        episodes: nextProps.episodes
      })
    }

    if (this.props.blog !== nextProps.blog) {
      this.setState({
        blog: nextProps.blog
      })
    }
  }

  render() {
    return (
      <div>
        <CSSTransitionGroup
          component='div'
          className='videos-list'
          transitionName='fadein'
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          <h3 className='page-title'>Latests videos</h3>
          <Gallery
            howManyEpisodes={9}
            episodes={this.state.episodes}
            link={
              (this.state.episodes !== null)
                ? this.state.episodes[0].link
                : null
            }
          />
        </CSSTransitionGroup>

        <div className='blog-posts'>
          <h3 className='page-title'>Latests posts</h3>

          <div className='blog-posts-grid'>
            {this.state.blog !== null && this.state.blog.map((post) => {
              const day = moment(new Date(post.date)).format('DD')
              const month = moment(new Date(post.date)).format('MM')
              const year = moment(new Date(post.date)).format('YYYY')

              return (
                <BlogItem
                  key={post.id}
                  id={post.id}
                  date={{
                    day: year,
                    month: month,
                    year: year
                  }}
                  url={`/blog/${year}/${month}/${day}/${post.slug}`}
                  title={post.title.rendered}
                  content={post.excerpt.rendered}
                />
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}
