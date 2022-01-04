import { MouseEvent, useState } from 'react';
import api from '../../services/api';
import styles from './styles.module.scss';

export const FormModal = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: MouseEvent) => {
    event.preventDefault();

    const create = await api.createModule(name);

    if (create.error) {
      setError(create.error);
    } else {
      setError('');
    }

    setName('');
    return create;
  };

  return (
    <form className={styles.container}>
      <label htmlFor="name">
        Nome do Módulo:{' '}
        <input
          id="name"
          type="text"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        {error}
      </label>

      <button type="submit" onClick={event => handleSubmit(event)}>
        Cadastrar módulo
      </button>
    </form>
  );
};
