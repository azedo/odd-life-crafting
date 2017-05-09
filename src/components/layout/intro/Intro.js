import React, { Component } from 'react'
import './Intro.css'

class Intro extends Component {
  componentWillMount() {
    this.setState({ innerHeight: window.innerHeight })
  }

  render() {
    const viewPortSize = this.state.innerHeight,
          imageBg      = 'url(https://unsplash.it/' + viewPortSize +')'

    return (
      <div className="intro" style={{ height: viewPortSize - 40, backgroundImage: imageBg, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h1>Intro goes here</h1>
      </div>
    )
  }
}

export default Intro
