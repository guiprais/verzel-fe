import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../../services/api';
import styles from './styles.module.scss';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const history = useNavigate();

  const handleSubmit = async (event: MouseEvent) => {
    event.preventDefault();

    const register = await api.register({ email, password });

    if (register.error) {
      setError(register.error);
      return;
    }

    if (register.status === 200) {
      localStorage.setItem('@verzel:token', register.data.token);
      history('/');
      window.location.reload();
    }
  };

  return (
    <div className={styles.container}>
      <h1>Registro</h1>
      <form>
        <label htmlFor="email">
          Email:
          <input
            id="email"
            type="text"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </label>

        <label htmlFor="password">
          Password:
          <input
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <span className={styles.error}>{error}</span>
        <button type="submit" onClick={event => handleSubmit(event)}>
          Cadastrar-se
        </button>
      </form>
    </div>
  );
};
