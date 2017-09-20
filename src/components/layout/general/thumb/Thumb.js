import React from 'react'
import { Link } from 'react-router-dom'

import './Thumbs.css'


const Thumb = ({ url, title, background }) => {
  const imageUrl = `http://img.youtube.com/vi/${background}/hqdefault.jpg`

  return (
    <Link to={url} className="thumb_link">
      <div
        className="thumb"
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      >
        <div className="thumb__desc">
          <p dangerouslySetInnerHTML={{__html: title}}></p>
        </div>
      </div>
    </Link>
  )
}

export default Thumb
