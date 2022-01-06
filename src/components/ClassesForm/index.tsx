import { MouseEvent, useState } from 'react';
import { useClassesApi } from '../../hooks/useClassesApi';
import { useModulesApi } from '../../hooks/useModulesApi';
import api from '../../services/api';
import styles from './styles.module.scss';

export const ClassesForm = () => {
  const { modules } = useModulesApi();
  const { classes, setClasses } = useClassesApi();

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [modId, setModId] = useState(modules.length > 0 ? modules[0].id : '');
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
      setName('');
      setDate('');
      const newClasses = [...classes, createClass.data];
      setClasses(newClasses);
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
          {modules.map(m => (
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
