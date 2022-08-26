// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Component } from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem';

import { Gallery } from './ImageGallery.styled';

export default class ImageGallery extends Component {
  render() {
    return (
      <Gallery>
        {this.props.data.map(({ id, webformatURL, tags }) => (
          <ImageGalleryItem
            key={id}
            image={webformatURL}
            id={id}
            alt={tags}
            getModalImage={this.props.getModalImage}
          />
        ))}
      </Gallery>
    );
  }
}

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  getModalImage: PropTypes.func.isRequired,
};