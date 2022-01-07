import React, { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { AiFillEdit } from 'react-icons/ai';

import { ModuleCard } from '../../components/ModuleCard';
import { ModuleForm } from '../../components/ModuleForm';
import { Modal } from '../../components/Modal';
import { Header } from '../../components/Header';

import styles from './styles.module.scss';

import { ClassesForm } from '../../components/ClassesForm';
import { ClassesCard } from '../../components/ClassesCard';
import { useModules } from '../../hooks/useModules';
import { useClasses } from '../../hooks/useClasses';
import { EditModuleForm } from '../../components/EditModuleForm';

export const App = () => {
  const [showModules, setShowModules] = useState(true);
  const [showClasses, setShowClasses] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modulesForm, setModulesForm] = useState(false);

  const [moduleTitle, setModuleTitle] = useState(false);
  const [classTitle, setClassTitle] = useState(false);

  const { modules, moduleActive, setModuleActive } = useModules();
  const {
    classes,
    classesActives,
    setClassesActives,
    setClasseActive,
    classeActive,
  } = useClasses();

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

  // Função para calcular quantas aulas existem em cada módulo
  const classesQuantity = (id: string) => {
    return classes.filter(c => c.module_id === id).length;
  };

  const handleModuleActive = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Função que, quando clica em um Módulo, pega o id dele, compara com o array de aulas e retorna apenas as aulas que fazem parte daquele módulo
    const modulesQuantity = classes.filter(
      c => c.module_id === event.currentTarget.id,
    );
    setClassesActives(modulesQuantity);

    setClassTitle(false);
    setModuleTitle(true);

    setModuleActive({
      name: event.currentTarget.name,
      id: event.currentTarget.id,
    });
    setShowModules(false);
    setShowClasses(true);
  };

  const handleClasseActive = (event: React.MouseEvent<HTMLButtonElement>) => {
    setClasseActive({
      name: event.currentTarget.name,
      id: event.currentTarget.id,
      class_date: event.currentTarget.getAttribute('data-classdate'),
      module_id: event.currentTarget.getAttribute('data-moduleid'),
    });

    setClassTitle(true);
    setModuleTitle(false);

    setShowModules(false);
    setShowClasses(false);
  };

  const showModulesContent = () => {
    return modules.length !== 0
      ? modules.map(modulo => (
          <ModuleCard
            handleModuleActive={handleModuleActive}
            key={modulo.id}
            id={modulo.id}
            name={modulo.name}
            classes={classesQuantity(modulo.id)}
          />
        ))
      : !showClasses && <span>Não existem módulos criados. :(</span>;
  };

  const showClassesContent = () => {
    return classesActives.length !== 0
      ? classesActives.map(c => (
          <ClassesCard
            key={c.id}
            id={c.id}
            name={c.name}
            classDate={c.class_date}
            moduleId={c.module_id}
            handleClasseActive={handleClasseActive}
          />
        ))
      : !showModules && <span>Nenhuma aula encontrada :(</span>;
  };

  const handleMoveBack = () => {
    if (moduleTitle) {
      setModuleActive({
        name: '',
        id: '',
      });

      setClassTitle(false);
      setModuleTitle(false);

      setShowModules(true);
      setShowClasses(false);
      setShowEditForm(false);
    }

    if (classTitle) {
      setClassTitle(false);
      setModuleTitle(true);

      setShowModules(false);
      setShowClasses(true);
      setShowEditForm(false);
    }
  };

  const handleEditModule = () => {
    // const moduleObject = getModule(moduleActive);

    setShowEditForm(!showEditForm);
    setShowClasses(!showClasses);
  };

  const changePageTitle = () => {
    if (moduleTitle) {
      return moduleActive.name;
    }

    if (classTitle) {
      return classeActive.name;
    }

    return 'Módulos';
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
            {moduleTitle || classTitle ? (
              <button type="button" onClick={() => handleMoveBack()}>
                <BiArrowBack />
              </button>
            ) : (
              ''
            )}
            {changePageTitle()}
            {moduleTitle || classTitle ? (
              <button type="button" onClick={() => handleEditModule()}>
                <AiFillEdit />
              </button>
            ) : (
              ''
            )}
          </h1>
          <div className={styles.cardsContainer}>
            {showModules && showModulesContent()}
            {showClasses && showClassesContent()}
            {showEditForm && <EditModuleForm />}
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
        {modulesForm ? <ModuleForm /> : <ClassesForm />}
      </Modal>
    </>
  );
};
