import React, { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { AiFillEdit } from 'react-icons/ai';

import { ModuleCard } from '../../components/ModuleCard';
import { ModuleForm } from '../../components/ModuleForm';
import { Modal } from '../../components/Modal';
import { Header } from '../../components/Header';

import api from '../../services/api';

import styles from './styles.module.scss';

import { ClassesForm } from '../../components/ClassesForm';
import { ClassesCard } from '../../components/ClassesCard';
import { useModulesApi } from '../../hooks/useModulesApi';

type ClassesProps = {
  class_date: string;
  id: string;
  module_id: string;
  name: string;
};

export const App = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [classes, setClasses] = useState<ClassesProps[]>([]);
  const [modulesForm, setModulesForm] = useState(false);
  const [classesActives, setClassesActives] = useState<ClassesProps[]>([]);
  const [moduleActive, setModuleActive] = useState('Módulos');
  const [showModules, setShowModules] = useState(true);
  const [showClasses, setShowClasses] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const { modules, getModule } = useModulesApi();

  useEffect(() => {
    api.getClasses().then(response => setClasses(response.data));
  }, []);

  // Função para calcular quantas aulas existem em cada módulo
  const classesQuantity = (id: string) => {
    return classes.filter(c => c.module_id === id).length;
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleOpenClassModal = () => {
    setModulesForm(false);
    setIsOpen(true);
  };

  const handleOpenModuleModal = () => {
    setModulesForm(true);
    setIsOpen(true);
  };

  const handleModuleActive = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as Element;
    // Função que, quando clica em um Módulo, pega o id dele, compara com o array de aulas e retorna apenas as aulas que fazem parte daquele módulo
    const modulesQuantity = classes.filter(c => c.module_id === target.id);
    setClassesActives(modulesQuantity);

    const findModulo = modules.find(m => m.id === target.id);

    setModuleActive(findModulo?.name as string);
    setShowModules(false);
    setShowClasses(true);
  };

  const handleMoveBack = () => {
    setModuleActive('Módulos');
    setShowModules(true);
    setShowClasses(false);
  };

  const handleEditModule = () => {
    const moduleObject = getModule(moduleActive);

    setShowEditForm(true);
  };

  return (
    <>
      <div className={styles.container}>
        <Header
          openModuleModal={handleOpenModuleModal}
          openClassModal={handleOpenClassModal}
        />

        <section className={styles.cardsSection}>
          <h1>
            {moduleActive !== 'Módulos' && (
              <button type="button" onClick={() => handleMoveBack()}>
                <BiArrowBack />
              </button>
            )}
            {moduleActive !== 'Módulos' ? moduleActive : 'Módulos'}
            {moduleActive !== 'Módulos' && (
              <button type="button" onClick={() => handleEditModule()}>
                <AiFillEdit />
              </button>
            )}
          </h1>
          <div className={styles.cardsContainer}>
            {showModules && modules.length !== 0
              ? modules.map(modulo => (
                  <ModuleCard
                    handleModuleActive={handleModuleActive}
                    key={modulo.id}
                    id={modulo.id}
                    name={modulo.name}
                    classes={classesQuantity(modulo.id)}
                  />
                ))
              : !showClasses && <span>Não existem módulos criados. :(</span>}

            {showClasses && classesActives.length !== 0
              ? classesActives.map(c => (
                  <ClassesCard
                    key={c.id}
                    name={c.name}
                    classDate={c.class_date}
                  />
                ))
              : !showModules && <span>Nenhuma aula encontrada :(</span>}
          </div>
        </section>
      </div>
      <Modal isOpen={modalIsOpen} handleModal={closeModal}>
        <button
          className={styles.closeButton}
          type="button"
          onClick={closeModal}
        >
          X
        </button>
        {modulesForm ? (
          <ModuleForm />
        ) : (
          <ClassesForm
            modulos={modules}
            classes={classes}
            setClasses={setClasses}
          />
        )}
      </Modal>
    </>
  );
};
