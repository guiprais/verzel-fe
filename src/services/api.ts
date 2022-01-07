import axios from 'axios';

type CreateClassType = {
  name: string;
  date: string;
  modId: string;
};

const token = localStorage.getItem('@verzel:token');

const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    authorization: `Bearer ${token}` ?? '',
  },
});
interface IEditClass {
  id: string;
  date: string;
  name: string;
}

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

  login: async ({ email, password }: { email: string; password: string }) => {
    return api
      .post('/login', { email, password })
      .then(response => response)
      .catch(error => error.response.data);
  },

  editModule: async ({ name, id }: { name: string; id: string }) => {
    return api
      .put(`/modules/${id}`, { name })
      .then(response => response)
      .catch(error => error.response.data);
  },

  editClass: async (module_id: string, { name, id, date }: IEditClass) => {
    return api
      .put(`/classes/${id}`, { name, module_id, class_date: date })
      .then(response => response)
      .catch(error => error.response.data);
  },
};
