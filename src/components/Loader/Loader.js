import React from 'react';
import { Loader } from 'rsuite';
import s from './Loader.module.css';

const LoaderComponent = () => {
  return (
    <div className={s.loader}>
      <Loader backdrop content="loading..." vertical />
    </div>
  );
};

export default LoaderComponent;
