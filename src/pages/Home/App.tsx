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

export const App = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modulos, setModulos] = useState<ModulesProps[]>([]);
  const [classes, setClasses] = useState<ClassesProps[]>([]);
  const [modulesForm, setModulesForm] = useState(false);
  const [classesActives, setClassesActives] = useState<ClassesProps[]>([]);
  const [moduleActive, setModuleActive] = useState('Módulos');
  const [showModules, setShowModules] = useState(true);
  const [showClasses, setShowClasses] = useState(false);

  useEffect(() => {
    api.getModules().then(response => setModulos(response.data));
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
    const grades = classes.filter(c => c.module_id === target.id);
    setClassesActives(grades);

    const findModulo = modulos.find(m => m.id === target.id)?.name;

    setModuleActive(findModulo as string);
    setShowModules(false);
    setShowClasses(true);
  };

  const handleMoveBack = () => {
    setModuleActive('Módulos');
    setShowModules(true);
    setShowClasses(false);
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
              <button type="button" onClick={() => handleMoveBack()}>
                <AiFillEdit />
              </button>
            )}
          </h1>
          <div className={styles.cardsContainer}>
            {showModules && modulos.length !== 0
              ? modulos.map(modulo => (
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
          <ModuleForm modulos={modulos} setModulos={setModulos} />
        ) : (
          <ClassesForm
            modulos={modulos}
            classes={classes}
            setClasses={setClasses}
          />
        )}
      </Modal>
    </>
  );
};
