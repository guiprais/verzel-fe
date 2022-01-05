import { MouseEvent, useState } from 'react';
import api from '../../services/api';
import styles from './styles.module.scss';

export const ClassesForm = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [modulo, setModulo] = useState('');
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
        <h3>Nome do Aula: </h3>
        <input
          id="name"
          type="text"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <span>{error}</span>
      </label>

      <label htmlFor="name">
        <h3>Data da Aula: </h3>
        <input
          id="name"
          type="text"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <span>{error}</span>
      </label>

      <label htmlFor="name">
        <h3>Módulo: </h3>
        <input
          id="name"
          type="text"
          value={modulo}
          onChange={({ target }) => setModulo(target.value)}
        />
        <span>{error}</span>
      </label>

      <button type="submit" onClick={event => handleSubmit(event)}>
        Cadastrar módulo
      </button>
    </form>
  );
};
