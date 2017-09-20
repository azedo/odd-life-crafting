import React, { Component } from 'react'

import './Intro.css'
import Logo from '../general/images/Logo'



class Intro extends Component {
  constructor() {
    super()

    this.state = {
      innerHeight: '',
      imageBgUrl: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        imageBgUrl: nextProps.coverImage
      })
    }
  }

  componentWillMount() {
    let heightOutput

    const resize = () => {
      heightOutput = window.innerHeight;

      this.setState({ innerHeight: heightOutput })
    }

    window.onresize = resize;

    this.setState({ innerHeight: window.innerHeight })
  }

  render() {
    const viewPortSize = this.state.innerHeight,
          imageBg = this.state.imageBgUrl

    return (
      <div className="intro" style={{ height: viewPortSize - 40, backgroundImage: `url(${imageBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h1>
          <Logo />
        </h1>
      </div>
    )
  }
}

export default Intro
