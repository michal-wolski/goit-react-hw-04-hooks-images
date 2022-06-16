import React, { useState } from 'react';
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
  const [modalImage, setmodalImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const openModal = modalImage => {
    setIsModalOpen(true);
    setmodalImage(modalImage);
    console.log(modalImage);
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
  };

  return (
    <>
      <Searchbar handleSubmitSetQuery={handleSubmitSetQuery} />
      {isLoading && <LoaderComponent />}
      <ImageGallery images={images} openModal={openModal} />
      {images.length > 0 && <Button changePage={changePage} />}
      {isModalOpen && <Modal modalImage={modalImage} closeModal={closeModal} />}
    </>
  );
};

export default App;
