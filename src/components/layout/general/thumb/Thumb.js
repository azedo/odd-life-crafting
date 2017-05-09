import React from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import './Thumbs.css'


const Thumb = () =>(
  <CSSTransitionGroup
    component="div"
    className="thumb"
    transitionName="fade"
    transitionAppear={true}
    transitionAppearTimeout={500}
    transitionEnterTimeout={300}
    transitionLeaveTimeout={300}
    style={{ backgroundImage: 'url(https://unsplash.it/300?random)', backgroundSize: 'cover', backgroundPosition: 'center' }}
  >

    <a href="#">
      <div className="thumb__desc">
        <p>thumb</p>
      </div>
    </a>

  </CSSTransitionGroup>
)

export default Thumb
