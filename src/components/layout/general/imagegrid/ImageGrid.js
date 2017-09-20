import React from 'react'
import ImageGallery from '../../../layout/general/imagegallery/ImageGallery'

import "./ImageGrid.css"



export default class ImageGrid extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isModalOpen: false,
      currentImage: null,
    }

    this._selectImage = this._selectImage.bind(this)
    this._closeModal = this._closeModal.bind(this)
  }

  _selectImage(e, url) {
    e.preventDefault()

    this.setState({
      isModalOpen: true,
      currentImage: url,
    })
  }

  _closeModal() {
    this.setState({
      isModalOpen: false,
      currentImage: null,
    })
  }

  render() {
    return (
      <div>
        {this.state.isModalOpen && <ImageGallery isOpen={this.state.isModalOpen} showImage={this.state.currentImage} gallery={this.props.images} closeModalFn={this._closeModal} />}

        <div className="imageGrid__grid">
          {this.props.images.map((image, index) => (
            <div className="imageGrid__cell" key={index}>
              <a href={image.url} onClick={(e) => this._selectImage(e, image.id)}>
                <img src={image.sizes.medium} alt={image.name} />
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

ImageGrid.propTypes = {
  images: React.PropTypes.array.isRequired,
};
