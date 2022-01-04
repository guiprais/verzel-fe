import styles from './styles.module.scss';

type Props = {
  openModal: any;
  // closeModal: void;
};

export const Header = ({ openModal }: Props) => {
  return (
    <div className={styles.container}>
      <h1>Logo</h1>
      <nav>
        <ul>
          <li>
            <button type="button">+ Cadastro de Aula</button>
          </li>
          <li>
            <button type="button" onClick={openModal}>
              + Cadastro de Módulo
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
