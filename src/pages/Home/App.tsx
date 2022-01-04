import { useEffect, useState } from 'react';
import Modal from 'react-modal';

import { Card } from '../../components/Card';
import { FormModal } from '../../components/FormModal';
import { Header } from '../../components/Header';
import api from '../../services/api';

import styles from './styles.module.scss';

type ModulesProps = {
  id: string;
  name: string;
};

type ClassesProps = {
  class_date: string;
  id: string;
  module_id: string;
  name: string;
};

Modal.setAppElement('#root');

export const App = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modulos, setModulos] = useState<ModulesProps[]>([]);
  const [classes, setClasses] = useState<ClassesProps[]>([]);

  useEffect(() => {
    api.getModules().then(response => setModulos(response.data));
    api.getClasses().then(response => setClasses(response.data));
  }, []);

  const classesQuantity = (id: string) => {
    return classes.filter(c => c.module_id === id).length;
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className={styles.container}>
        <Header openModal={openModal} />
        <section className={styles.cardsSection}>
          <h1>Módulos</h1>
          <div className={styles.cardsContainer}>
            {modulos.length !== 0 ? (
              modulos.map(modulo => (
                <Card
                  key={modulo.id}
                  id={modulo.id}
                  name={modulo.name}
                  classes={classesQuantity(modulo.id)}
                />
              ))
            ) : (
              <span>Não existem módulos criados. :(</span>
            )}
          </div>
        </section>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        // contentLabel="Example Modal"
      >
        <button type="button" onClick={closeModal}>
          Close
        </button>
        <FormModal />
      </Modal>
    </>
  );
};
