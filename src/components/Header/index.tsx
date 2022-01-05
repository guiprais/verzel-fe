import styles from './styles.module.scss';

type Props = {
  openModuleModal: () => void;
  openClassModal: () => void;
};

export const Header = ({ openModuleModal, openClassModal }: Props) => {
  return (
    <div className={styles.container}>
      <h1>Logo</h1>
      <nav>
        <ul>
          <li>
            <button type="button" onClick={openClassModal}>
              + Cadastro de Aula
            </button>
          </li>
          <li>
            <button type="button" onClick={openModuleModal}>
              + Cadastro de Módulo
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
