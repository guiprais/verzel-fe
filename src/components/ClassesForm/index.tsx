import { MouseEvent, useState } from 'react';
import api from '../../services/api';
import styles from './styles.module.scss';

type ModuleType = {
  name: string;
  id: string;
};

type ModuleFormProps = {
  modulos: ModuleType[];
};

export const ClassesForm = ({ modulos }: ModuleFormProps) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [modId, setModId] = useState(modulos.length > 0 ? modulos[0].id : '');
  const [error, setError] = useState('');
  const [created, setCreated] = useState('');

  const handleSubmit = async (event: MouseEvent) => {
    event.preventDefault();

    const createClass = await api.createClass({ name, date, modId });

    if (createClass.error) {
      setCreated('');
      setError(createClass.error);
      return createClass;
    }

    if (createClass.status === 200) {
      setError('');
      setCreated('Aula criada com sucesso!');
    }

    return createClass;
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
      </label>

      <label htmlFor="name">
        <h3>Data da Aula: </h3>
        <input
          id="name"
          type="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
      </label>

      <label htmlFor="name">
        <h3>Módulo: </h3>
        <select id="name" onChange={({ target }) => setModId(target.value)}>
          {modulos.map(m => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
        <span className={styles.error}>{error}</span>
        <span className={styles.created}>{created}</span>
      </label>

      <button type="submit" onClick={event => handleSubmit(event)}>
        Cadastrar módulo
      </button>
    </form>
  );
};
