import { Component } from 'react';
import * as Scroll from 'react-scroll';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { BallTriangle } from 'react-loader-spinner';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import getImageCollection from 'helpers/getImageCollection';

import { AppContainer, LoaderContainer, NotFound } from './App.styled';
import { ModalImage } from './Modal/Modal.styled';

export default class App extends Component {
  state = {
    data: [],
    totalImages: null,
    search: '',
    page: 1,
    showModal: false,
    modalImage: {},
    panding: false,
    status: 'resolves',
  };

  async componentDidUpdate(_, prevState) {
    const { search, page } = this.state;

    try {
      if (prevState.search !== search || prevState.page !== page) {
        this.setState({ panding: true });

        const data = await getImageCollection(search, page);

        this.setState({ panding: false });

        if (data.array) {
          if (data.array.length === 0) {
            this.setState({ status: 'rejected' });
            return;
          }

          this.loadMoreData(data.array);
          this.setState({ totalImages: data.total });
          this.setState({ status: 'resolved' });
        }
        const scroll = Scroll.animateScroll;
        scroll.scrollToBottom();
      }
    } catch (error) {
      Notify.failure(error.message);
    }
  }

  handleSubmit = search => {
    this.setState({ data: [], search, page: 1 });
  };

  handleClickLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  loadMoreData = newData =>
    this.setState(prevState => ({ data: [...prevState.data, ...newData] }));

  getModalImage = id => {
    const clickedImageObj = this.state.data.find(item => item.id === id);
    const { largeImageURL, tags } = clickedImageObj;
    this.setState({ modalImage: { largeImageURL, tags }, showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { data, totalImages, showModal } = this.state;
    const { largeImageURL, tags } = this.state.modalImage;

    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleSubmit} />

        {this.state.status === 'rejected' && (
          <NotFound>Sorry, we find nothing. Try another request</NotFound>
        )}

        {this.state.status === 'resolved' && (
          <ImageGallery data={data} getModalImage={this.getModalImage} />
        )}

        {this.state.panding && (
          <LoaderContainer>
            <BallTriangle
              height="80"
              width="80"
              color="#3f51b5"
              ariaLabel="three-dots-loading"
            />
          </LoaderContainer>
        )}

        {data.length > 0 && data.length < totalImages && (
          <Button onClick={this.handleClickLoadMore} />
        )}
        {showModal && (
          <Modal onClose={this.closeModal}>
            <ModalImage src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </AppContainer>
    );
  }
}