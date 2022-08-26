import PropTypes from 'prop-types';

import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image, id, alt, getModalImage }) => (
  <GalleryItem>
    <GalleryItemImage src={image} alt={alt} onClick={() => getModalImage(id)} />
  </GalleryItem>
);

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  alt: PropTypes.string.isRequired,
  getModalImage: PropTypes.func.isRequired,
};

export default ImageGalleryItem;