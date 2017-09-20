import React from 'react'
import _ from 'lodash'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import Thumb from '../../general/thumb/Thumb'
import YoutubeButton from '../../general/social/YoutubeButton'

import '../../../../Animations.css'

export default class Gallery extends React.Component {
  render() {
    return (
      <div>
        <div className='thumbs-grid'>
          {(this.props.episodes !== null)
            ? this.props.episodes[0].acf.episodio.map((episode, index) => {
              let url = new URL(this.props.link)

              return (
                <CSSTransitionGroup
                  key={index}
                  transitionName='fadein'
                  transitionAppear={true}
                  transitionAppearTimeout={500}
                  transitionEnterTimeout={300}
                  transitionLeaveTimeout={300}
                >
                  <Thumb
                    url={url.pathname + _.kebabCase(episode.project_title)}
                    index={index}
                    title={episode.project_title}
                    background={episode.project_video}
                  />
                </CSSTransitionGroup>
              )}).splice(0, this.props.howManyEpisodes)
            : null
          }
        </div>
      </div>
    );
  }
}

Gallery.defaultProps = {
  episodes: null
}

Gallery.propTypes = {
  episodes: React.PropTypes.array,
};
