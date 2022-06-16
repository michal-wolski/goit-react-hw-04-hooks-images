import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

const Searchbar = ({ handleSubmitSetQuery }) => {
  const [text, setText] = useState('');

  const onChange = evt => {
    const { value } = evt.target;
    setText(value);
  };

  const handleSubmitSetText = evt => {
    evt.preventDefault();
    handleSubmitSetQuery(text);
    cancelCourse();
  };

  const cancelCourse = () => {
    document.getElementById('SearchForm').reset();
  };

  return (
    <div>
      <header className={s.Searchbar}>
        <form
          id="SearchForm"
          onSubmit={handleSubmitSetText}
          className={s.SearchForm}
        >
          <button type="submit" className={s.SearchForm_button}>
            <span className={s.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={s.SearchForm_input}
            onChange={onChange}
            type="text"
            defaultValue=""
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </div>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  handleSubmitSetQuery: PropTypes.func.isRequired,
};
