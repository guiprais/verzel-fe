import { MouseEvent, useState } from 'react';
import { useModules } from '../../hooks/useModules';

import styles from './styles.module.scss';

export const ModuleForm = () => {
  const [moduleName, setModuleName] = useState('');
  const [error, setError] = useState('');
  const [created, setCreated] = useState('');

  const { createModule, fetchModules } = useModules();

  const handleSubmit = async (event: MouseEvent) => {
    event.preventDefault();

    const createdModuleResponse = await createModule({ moduleName });

    if (!createdModuleResponse.success) {
      setCreated('');
      setError(createdModuleResponse.error);
      return;
    }

    setError('');
    setCreated('Módulo criado com sucesso!');
    fetchModules();
  };

  return (
    <form className={styles.container}>
      <label htmlFor="name">
        <h3>Nome do Módulo: </h3>
        <input
          id="name"
          type="text"
          value={moduleName}
          onChange={({ target }) => setModuleName(target.value)}
        />
        <span className={styles.error}>{error}</span>
        <span className={styles.created}>{created}</span>
      </label>

      <button type="submit" onClick={event => handleSubmit(event)}>
        Cadastrar módulo
      </button>
    </form>
  );
};
