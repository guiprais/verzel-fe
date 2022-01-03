import styles from './styles.module.scss';

export const Header = () => {
  return (
    <div className={styles.container}>
      <h1>Logo</h1>
      <nav>
        <ul>
          <li>+ Cadastro de Aula</li>
          <li>+ Cadastro de Módulo</li>
        </ul>
      </nav>
    </div>
  );
};
