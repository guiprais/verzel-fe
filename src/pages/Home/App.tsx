import { Card } from '../components/Card';

import styles from './styles.module.scss';

export const App = () => {
  return (
    <div>
      <h1>Hello World!</h1>
      <div className={styles.cardsContainer}>
        <Card name="Introdução e Preparatório" classes="3/3 aulas" />
        <Card name="Conceito de Sistemas" classes="4/4 aulas" />
        <Card name="Lógica de programação" classes="16/16 aulas" />
        <Card name="Conceito de Sistemas" classes="4/4 aulas" />
        <Card name="Projeto Mobile" classes="10/10 aulas" />
        <Card name="Conceito de Sistemas" classes="4/4 aulas" />
      </div>
    </div>
  );
};
