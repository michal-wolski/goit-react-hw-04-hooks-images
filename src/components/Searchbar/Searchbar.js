import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

const Searchbar = () => {
  const [text, setText] = useState('');

  const onChange = evt => {
    const { value } = evt.target;
    setText({ text: value });
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const { handleSubmit } = this.props;
    handleSubmit(text);
  };

  return (
    <div>
      <header className={s.Searchbar}>
        <form onSubmit={handleSubmit} className={s.SearchForm}>
          <button type="submit" className={s.SearchForm_button}>
            <span className={s.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={s.SearchForm_input}
            onChange={onChange}
            type="text"
            defaultValue={text}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </div>
  );
};

// export default class Searchbar extends Component {
//   state = {
//     text: '',
//   };

//   onChange = evt => {
//     const { value } = evt.target;
//     this.setState({ text: value });
//   };

//   handleSubmit = evt => {
//     evt.preventDefault();
//     const { handleSubmit } = this.props;
//     handleSubmit(this.state.text);
//   };

//   render() {
//     const { text } = this.state;
//     return (
//       <div>
//         <header className={s.Searchbar}>
//           <form onSubmit={this.handleSubmit} className={s.SearchForm}>
//             <button type="submit" className={s.SearchForm_button}>
//               <span className={s.SearchForm_button_label}>Search</span>
//             </button>

//             <input
//               className={s.SearchForm_input}
//               onChange={this.onChange}
//               type="text"
//               defaultValue={text}
//               autoComplete="off"
//               autoFocus
//               placeholder="Search images and photos"
//             />
//           </form>
//         </header>
//       </div>
//     );
//   }
// }
export default Searchbar;

Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
