import axios from 'axios';

export const getImages = (query = '', page = 1) => {
  const key = '26531596-66f70a56847dae6fbc6ddebb0';
  const path = `https://pixabay.com/api/?q=${query}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`;
  return axios.get(path);
};
