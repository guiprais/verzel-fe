import { useModal } from '../../hooks/useModal';
import styles from './styles.module.scss';

export const Header = () => {
  const { handleOpenModuleModal, handleOpenClassModal } = useModal();

  return (
    <div className={styles.container}>
      <h1>Logo</h1>
      <nav>
        <ul>
          <li>
            <button type="button" onClick={handleOpenClassModal}>
              + Cadastro de Aula
            </button>
          </li>
          <li>
            <button type="button" onClick={handleOpenModuleModal}>
              + Cadastro de Módulo
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
