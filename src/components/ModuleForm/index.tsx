import { MouseEvent, useState } from 'react';
import api from '../../services/api';
import styles from './styles.module.scss';

type ModuleType = {
  name: string;
  id: string;
};

type ModuleFormProps = {
  modulos: ModuleType[];
  setModulos: React.Dispatch<React.SetStateAction<ModuleType[]>>;
};

export const ModuleForm = ({ modulos, setModulos }: ModuleFormProps) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [created, setCreated] = useState('');

  const handleSubmit = async (event: MouseEvent) => {
    event.preventDefault();

    const token = localStorage.getItem('@verzel:token');

    const create = await api.createModule(name, token);

    if (create.error) {
      setCreated('');
      setError(create.error);
      return create;
    }

    if (create.status === 200) {
      setError('');
      setCreated('Módulo criado com sucesso!');
      setName('');
      const newModulos = [...modulos, create.data];
      const modulosSortByName = newModulos.sort((a, b) =>
        // função para organizar o array de objetos 'newModulos' por ordem alfabética da key name
        // eslint-disable-next-line no-nested-ternary
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0,
      );
      setModulos(modulosSortByName);
      return create;
    }

    setCreated('');
    setError('');
    setName('');
    return create;
  };

  return (
    <form className={styles.container}>
      <label htmlFor="name">
        <h3>Nome do Módulo: </h3>
        <input
          id="name"
          type="text"
          value={name}
          onChange={({ target }) => setName(target.value)}
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
