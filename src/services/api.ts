import axios from 'axios';

type CreateClassType = {
  name: string;
  date: string;
  modId: string;
};

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
  },

  createClass: async ({ name, date, modId }: CreateClassType) => {
    return api
      .post('/classes', { name, class_date: date, module_id: modId })
      .then(response => response)
      .catch(error => error.response.data);
  },
};
