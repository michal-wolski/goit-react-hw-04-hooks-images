import React, { useState, useEffect } from 'react';
import { getImages } from './services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import LoaderComponent from './Loader/Loader';
import Modal from './Modal/Modal';
import Button from './Button/Button';

const App = () => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = modalImage => {
    setIsModalOpen(true);
    // <modalImage />;
    window.addEventListener('keydown', closeModal);
  };

  const closeModal = evt => {
    if (evt.target === evt.currentTarget || evt.keyCode === 27)
      setIsModalOpen(false);
    window.removeEventListener('keydown', closeModal);
  };

  const handleSubmitSetQuery = query => {
    setQuery(query);
    setIsLoading(true);
    getImages(query)
      .then(resData => {
        setImages(resData.data.hits);
      })
      .finally(() => setIsLoading(false));
  };

  const changePage = () => {
    getImages(query, page + 1).then(resData => {
      setPage(page + 1);
      setImages([...images, ...resData.data.hits]);
    });
    console.log(page);
  };

  // useEffect(() => {
  //   handleSubmitSetQuery('car', 1);
  // }, []);

  return (
    <>
      <Searchbar handleSubmitSetQuery={handleSubmitSetQuery} />
      {isLoading && <LoaderComponent />}
      <ImageGallery images={images} openModal={openModal} />
      {images.length > 0 && <Button changePage={changePage} />}
      {isModalOpen && <Modal closeModal={closeModal} />}
    </>
  );
};

export default App;
// export class App extends Component {
//   state = {
//     query: '',
//     images: [],
//     page: 1,
//     isModalOpen: false,
//     isLoading: false,
//   };
//   openModal = modalImage => {
//     this.setState({ isModalOpen: true, modalImage });
//     window.addEventListener('keydown', this.closeModal);
//   };

//   closeModal = evt => {
//     if (evt.target === evt.currentTarget || evt.keyCode === 27)
//       this.setState({ isModalOpen: false });
//     window.removeEventListener('keydown', this.closeModal);
//   };

//   handleSubmit = query => {
//     this.setState({ query, isLoading: true });
//     getImages(query)
//       .then(resData => {
//         this.setState({ images: resData.data.hits });
//       })
//       .finally(() => this.setState({ isLoading: false }));
//   };

//   changePage = () => {
//     const { query, page } = this.state;
//     getImages(query, page + 1).then(resData => {
//       this.setState(prevState => ({
//         page: prevState.page + 1,
//         images: [...prevState.images, ...resData.data.hits],
//       }));
//     });
//   };
//   componentDidMount() {
//     const { query, page } = this.state;

//     this.handleSubmit(query, page);
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { page } = this.state;
//     if (prevState.page !== page) {
//       window.scrollTo({
//         top: document.documentElement.scrollHeight,
//         behavior: 'smooth',
//       });
//     }
//   }

//   render() {
//     const { images, isModalOpen, modalImage, isLoading } = this.state;
//     return (
//       <>
//         <Searchbar handleSubmit={this.handleSubmit} />
//         {isLoading && <LoaderComponent />}
//         <ImageGallery images={images} openModal={this.openModal} />
//         {images.length > 0 && <Button changePage={this.changePage} />}
//         {isModalOpen && (
//           <Modal modalImage={modalImage} closeModal={this.closeModal} />
//         )}
//       </>
//     );
//   }
// }
