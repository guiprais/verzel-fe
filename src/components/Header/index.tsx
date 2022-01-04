import styles from './styles.module.scss';

export const Header = () => {
  return (
    <div className={styles.container}>
      <h1>Logo</h1>
      <nav>
        <ul>
          <li>
            <button type="button">+ Cadastro de Aula</button>{' '}
          </li>
          <li>+ Cadastro de Módulo</li>
        </ul>
      </nav>
    </div>
  );
};
