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
};
