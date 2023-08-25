import axios from 'axios'
const URL: `https://shooter-ykfl.onrender.com`;
/* const URL = 'http://localhost:8080'; */

const instance = axios.create({
  baseURL:URL,
});

export { instance, URL };