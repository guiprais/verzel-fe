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

  createModule: async (name: string, token: string | null) => {
    return api
      .post(
        '/modules',
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => response)
      .catch(error => error.response.data);
  },

  createClass: async (
    token: string | null,
    { name, date, modId }: CreateClassType,
  ) => {
    return api
      .post(
        '/classes',
        { name, class_date: date, module_id: modId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => response)
      .catch(error => error.response.data);
  },

  login: async ({ email, password }: { email: string; password: string }) => {
    return api
      .post('/login', { email, password })
      .then(response => response)
      .catch(error => error.response.data);
  },
};
