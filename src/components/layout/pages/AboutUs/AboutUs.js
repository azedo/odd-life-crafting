import React, { Component } from 'react'
import _ from 'lodash'
import moment from 'moment'

import GLOBAL_VARS from '../../../../global_vars'

import axios from 'axios'

import './AboutUs.css'

export default class AboutUs extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true
    }
  }

  render() {
    return (
      <div>
        <h2 className='page-title'>{this.props.title}</h2>
        <div
          className='about-us'
          dangerouslySetInnerHTML={{
            __html: this.props.content
          }}
        />
      </div>
    )
  }
}
