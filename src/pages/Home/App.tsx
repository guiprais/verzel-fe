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
import { useClassesApi } from '../../hooks/useClassesApi';
import { EditModuleForm } from '../../components/EditModuleForm';

export const App = () => {
  const [showModules, setShowModules] = useState(true);
  const [showClasses, setShowClasses] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modulesForm, setModulesForm] = useState(false);

  const { modules, moduleActive, setModuleActive } = useModules();
  const { classes, classesActives, setClassesActives } = useClassesApi();

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

    setModuleActive({
      name: event.currentTarget.name,
      id: event.currentTarget.id,
    });
    setShowModules(false);
    setShowClasses(true);
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
          <ClassesCard key={c.id} name={c.name} classDate={c.class_date} />
        ))
      : !showModules && <span>Nenhuma aula encontrada :(</span>;
  };

  const handleMoveBack = () => {
    setModuleActive({
      name: 'Módulos',
      id: '',
    });
    setShowModules(true);
    setShowClasses(false);
    setShowEditForm(false);
  };

  const handleEditModule = () => {
    // const moduleObject = getModule(moduleActive);

    setShowEditForm(!showEditForm);
    setShowClasses(!showClasses);
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
            {moduleActive.name !== 'Módulos' && (
              <button type="button" onClick={() => handleMoveBack()}>
                <BiArrowBack />
              </button>
            )}
            {moduleActive.name !== 'Módulos' ? moduleActive.name : 'Módulos'}
            {moduleActive.name !== 'Módulos' && (
              <button type="button" onClick={() => handleEditModule()}>
                <AiFillEdit />
              </button>
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
