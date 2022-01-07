import { MouseEvent, useState } from 'react';
import { useModules } from '../../hooks/useModules';
import api from '../../services/api';

import styles from './styles.module.scss';

export const EditModuleForm = () => {
  const [moduleName, setModuleName] = useState('');
  const [error, setError] = useState('');
  const [created, setCreated] = useState('');

  const { editModule, moduleActive, setModuleActive, setModules } =
    useModules();

  const handleSubmit = async (event: MouseEvent) => {
    event.preventDefault();

    const editModuleResponse = await editModule({
      ...moduleActive,
      name: moduleName,
    });

    if (!editModuleResponse.success) {
      setCreated('');
      setError(editModuleResponse.error);
      return;
    }

    setModuleActive({
      ...moduleActive,
      name: moduleName,
    });
    setError('');
    api.getModules().then(response => setModules(response.data));
    setCreated('Módulo editado com sucesso!');
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
