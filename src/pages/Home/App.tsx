import { useEffect, useState } from 'react';
import Modal from 'react-modal';

import { Card } from '../../components/Card';
import { ModuleForm } from '../../components/ModuleForm';
import { Header } from '../../components/Header';
import api from '../../services/api';

import styles from './styles.module.scss';
import { ClassesForm } from '../../components/ClassesForm';

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

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    minWidth: '400px',
    height: '40%',
    minHeight: '500px',
  },
};

Modal.setAppElement('#root');

export const App = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modulos, setModulos] = useState<ModulesProps[]>([]);
  const [classes, setClasses] = useState<ClassesProps[]>([]);
  const [modulesForm, setModulesForm] = useState(false);

  useEffect(() => {
    api.getModules().then(response => setModulos(response.data));
    api.getClasses().then(response => setClasses(response.data));
  }, []);

  const classesQuantity = (id: string) => {
    return classes.filter(c => c.module_id === id).length;
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClassModal = () => {
    setModulesForm(false);
    setIsOpen(true);
  };

  const handleModuleModal = () => {
    setModulesForm(true);
    setIsOpen(true);
  };

  return (
    <>
      <div className={styles.container}>
        <Header
          openModuleModal={handleModuleModal}
          openClassModal={handleClassModal}
        />
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

        <section className={styles.classesSection}>
          <h1>Aulas</h1>
          <div className={styles.classesContainer}>
            {classes &&
              classes.map(c => (
                <Card key={c.id} name={c.name} classDate={c.class_date} />
              ))}
          </div>
        </section>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <button
          className={styles.closeButton}
          type="button"
          onClick={closeModal}
        >
          X
        </button>
        {modulesForm ? (
          <ModuleForm modulos={modulos} setModulos={setModulos} />
        ) : (
          <ClassesForm modulos={modulos} />
        )}
      </Modal>
    </>
  );
};
