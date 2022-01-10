import { MouseEvent, useState } from 'react';
import { useClasses } from '../../hooks/useClasses';
import { useModules } from '../../hooks/useModules';

import styles from './styles.module.scss';

export const EditClassForm = () => {
  const { moduleActive } = useModules();
  const {
    classeActive,
    setClassesActives,
    classesActives,
    setClasseActive,
    editClasse,
  } = useClasses();

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [created, setCreated] = useState('');

  const handleSubmit = async (event: MouseEvent) => {
    event.preventDefault();

    const editClass = await editClasse(moduleActive.id, {
      name,
      date,
      id: classeActive.id,
    });

    if (!editClass.success) {
      setCreated('');
      setError(editClass.error);
      return;
    }

    setError('');
    setCreated('Aula editada com sucesso!');
    setName('');
    setDate('');

    const editedClasse = {
      ...classeActive,
      name,
      class_date: date,
    };

    setClasseActive(editedClasse);

    const classesActivesEditr = classesActives.filter(
      c => c.id !== classeActive.id,
    );
    setClassesActives([...classesActivesEditr, editedClasse]);
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
        Editar aula
      </button>
    </form>
  );
};
