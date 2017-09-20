import React from 'react'
import ImageGrid from '../../../layout/general/imagegrid/ImageGrid'

import './Episode.css'



export default class Episode extends React.Component {
  render() {
    const { project_video, project_title, project_description, project_images } = this.props.episode

    return (
      <div className="episode">
        <header>
          <div style={{ position: "relative", height: "0", paddingBottom: "56.25%" }}>
            <iframe
              src={`https://www.youtube.com/embed/${project_video}`}
              frameBorder="0"
              style={{ position: "absolute", width: "100%", height: "100%", left: "0" }}
              allowFullScreen={true}></iframe>
          </div>
        </header>

        <div className="episode__content">
          <h2>{project_title}</h2>
          <div dangerouslySetInnerHTML={{__html: project_description}}></div>

          {project_images && <ImageGrid images={project_images} /> }
        </div>
      </div>
    );
  }
}

Episode.propTypes = {
  episode: React.PropTypes.object.isRequired,
};
