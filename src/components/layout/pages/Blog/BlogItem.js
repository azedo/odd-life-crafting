import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import _ from 'lodash'
import moment from 'moment'

import './Blog.css'

export default class BlogItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true
    }
  }

  render() {
    return (
      <div key={this.props.id} className='blog-post-item'>
        <h4>
          <a href={this.props.url}>{this.props.title}</a>
        </h4>
        <div className='time-stamp'>{`${this.props.date.day}/${this.props.date.month}/${this.props.date.year}`}</div>
        <div className='content' dangerouslySetInnerHTML={{
          __html: this.props.content.replace('&nbsp;', ' ').replace('\n', '<br />')
        }} />
        <NavLink exact to={this.props.url} className='blog-item-link'>continue to post</NavLink>
      </div>
    )
  }
}
