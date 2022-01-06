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
import { useModulesApi } from '../../hooks/useModulesApi';
import { useClassesApi } from '../../hooks/useClassesApi';
import { useModal } from '../../hooks/useModal';

export const App = () => {
  const [showModules, setShowModules] = useState(true);
  const [showClasses, setShowClasses] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const { modules, getModule, moduleActive, setModuleActive } = useModulesApi();
  const { classes, classesActives, setClassesActives } = useClassesApi();
  const { modulesForm, closeModal } = useModal();

  // Função para calcular quantas aulas existem em cada módulo
  const classesQuantity = (id: string) => {
    return classes.filter(c => c.module_id === id).length;
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
    setModuleActive('Módulos');
    setShowModules(true);
    setShowClasses(false);
    setShowEditForm(false);
  };

  const handleEditModule = () => {
    const moduleObject = getModule(moduleActive);

    setShowEditForm(!showEditForm);
    setShowClasses(!showClasses);
  };

  return (
    <>
      <div className={styles.container}>
        <Header />

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
            {showModules && showModulesContent()}
            {showClasses && showClassesContent()}
            {showEditForm && <ModuleForm />}
          </div>
        </section>
      </div>
      <Modal>
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
