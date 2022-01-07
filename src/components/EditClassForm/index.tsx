import { MouseEvent, useState } from 'react';
import { useClasses } from '../../hooks/useClasses';
import { useModules } from '../../hooks/useModules';
import api from '../../services/api';

import styles from './styles.module.scss';

export const EditClassForm = () => {
  const { moduleActive } = useModules();
  const {
    classes,
    setClasses,
    classeActive,
    setClassesActives,
    classesActives,
    setClasseActive,
  } = useClasses();

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [created, setCreated] = useState('');

  const handleSubmit = async (event: MouseEvent) => {
    event.preventDefault();

    const editClass = await api.editClass(moduleActive.id, {
      name,
      date,
      id: classeActive.id,
    });

    if (editClass.error) {
      setCreated('');
      setError(editClass.error);
      return editClass;
    }

    if (editClass.status === 200) {
      setError('');
      setCreated('Aula editada com sucesso!');
      setName('');
      setDate('');

      setClasseActive(editClass.data);

      const classesActivesEditr = classesActives.filter(
        c => c.id !== classeActive.id,
      );
      setClassesActives([...classesActivesEditr, editClass.data]);
    }

    return editClass;
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

      <span className={styles.error}>{error}</span>
      <span className={styles.created}>{created}</span>

      <button type="submit" onClick={event => handleSubmit(event)}>
        Editar módulo
      </button>
    </form>
  );
};
