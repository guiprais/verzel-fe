import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default {
  getModules: async () => {
    return api.get('/modules');
  },

  getClasses: async () => {
    return api.get('/classes');
  },

  createModule: async (name: string) => {
    return api
      .post('/modules', { name })
      .then(response => response)
      .catch(error => error.response.data);
    // console.log(module.re);
    // return module;

    // .catch(err => err.response.data);
  },
};
