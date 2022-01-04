import { useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import { Header } from '../../components/Header';
import api from '../../services/api';

import styles from './styles.module.scss';

type ModulesProps = {
  id: string;
  name: string;
};

export const App = () => {
  const [modulos, setModulos] = useState<ModulesProps[]>([]);

  useEffect(() => {
    api.getModules().then(response => setModulos(response.data));
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <section className={styles.cardsSection}>
        <h1>Módulos</h1>
        <div className={styles.cardsContainer}>
          {modulos.length !== 0 ? (
            modulos.map(modulo => (
              <Card key={modulo.id} name={modulo.name} classes="1" />
            ))
          ) : (
            <span>Não existem módulos criados. :(</span>
          )}
        </div>
      </section>
    </div>
  );
};
