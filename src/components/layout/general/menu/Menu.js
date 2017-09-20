import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import './Menu.css'

import Logo from '../images/Logo'



export default class Menu extends React.Component {
  constructor() {
    super()

    this.state = {
      links: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.links !== nextProps.links) {
      this.setState({
        links: nextProps.links.items
      })
    }

  }

  render() {
    return (
      <nav className="menu">
        <div className="menu__logo">
          <NavLink exact to="/">
            <Logo />
          </NavLink>
        </div>

        <ul className="menu__items">
          {
            (this.props.showHomeLink === true)
              && <li><NavLink to='/'>Home</NavLink></li>
          }

          {this.state.links.map((link, i) => {
            return (
              <li key={i}>
                <NavLink to={link.url}>{link.title}</NavLink>
              </li>
            )
          })
        }
        </ul>
      </nav>
    )
  }
}

Menu.propTypes = {
  showHomeLink: PropTypes.bool,
  links: PropTypes.array,
  lang: PropTypes.string
}

Menu.defaultProps = {
  showHomeLink: false,
  links: []
}
