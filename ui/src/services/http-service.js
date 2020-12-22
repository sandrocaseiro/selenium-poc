import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Authorization': 'teste',
    'Accept-Language': 'pt-BR'
  }
});

// if (process.env.REACT_APP_IS_TEST) {
//   instance.interceptors.request.use(config => {
//     console.log('delaying call');
//     return new Promise(resolve => setTimeout(() => resolve(config), 2000));
//   })
// }

export default instance;
