import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { BiArrowBack } from 'react-icons/bi';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

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
import { EditClassForm } from '../../components/EditClassForm';

export const App = () => {
  const [showModules, setShowModules] = useState(true);
  const [showClasses, setShowClasses] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modulesForm, setModulesForm] = useState(false);

  const [moduleTitle, setModuleTitle] = useState(false);
  const [classTitle, setClassTitle] = useState(false);

  const { modules, moduleActive, setModuleActive, deleteModule, fetchModules } =
    useModules();
  const {
    classes,
    classesActives,
    setClassesActives,
    setClasseActive,
    classeActive,
    fetchClasses,
    classesQuantity,
    deleteClasse,
  } = useClasses();

  const history = useNavigate();

  useEffect(() => {
    setClassesActives(classes.filter(c => c.module_id === moduleActive.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleActive, classes]);

  useEffect(() => {
    const token = localStorage.getItem('@verzel:token');

    if (!token) {
      history('/login');
    }
  }, [history]);

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

  const showHomeContentState = async () => {
    setShowModules(true);
    setShowClasses(false);

    setModuleTitle(false);
    setClassTitle(false);

    await fetchModules();
  };

  const showModuleContentState = async () => {
    setShowModules(false);
    setShowClasses(true);

    setModuleTitle(true);
    setClassTitle(false);

    await fetchClasses();
  };

  const showClassContentState = () => {
    setShowModules(false);
    setShowClasses(false);

    setModuleTitle(false);
    setClassTitle(true);
  };

  const handleModuleActive = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Função que, quando clica em um Módulo, pega o id dele, compara com o array de aulas e retorna apenas as aulas que fazem parte daquele módulo
    const filteredClasses = classes.filter(
      c => c.module_id === event.currentTarget.id,
    );
    setClassesActives(filteredClasses);

    showModuleContentState();

    setModuleActive({
      name: event.currentTarget.name,
      id: event.currentTarget.id,
    });
  };

  const handleClasseActive = (event: React.MouseEvent<HTMLButtonElement>) => {
    setClasseActive({
      name: event.currentTarget.name,
      id: event.currentTarget.id,
      class_date: event.currentTarget.getAttribute('data-classdate'),
      module_id: event.currentTarget.getAttribute('data-moduleid'),
    });

    showClassContentState();
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

      showHomeContentState();
      setShowEditForm(false);
    }

    if (classTitle) {
      setClasseActive({
        name: '',
        id: '',
        module_id: '',
        class_date: '',
      });

      showModuleContentState();
      setShowEditForm(false);
    }
  };

  const handleEditForm = () => {
    // const moduleObject = getModule(moduleActive);

    if (moduleTitle) {
      setShowEditForm(!showEditForm);
      setShowClasses(!showClasses);
    }

    if (classTitle) {
      setShowEditForm(!showEditForm);
    }
  };

  const handleDelete = async () => {
    if (moduleTitle) {
      if (classesActives.length > 0) {
        alert('Delete as aulas do módulo primeiro');
        return;
      }

      await deleteModule(moduleActive.id);
      alert('Módulo deletado');

      showHomeContentState();

      setModuleActive({ id: '', name: 'Módulos' });
    }

    if (classTitle) {
      await deleteClasse(classeActive.id);
      alert('Aula deletada');

      setClasseActive({ id: '', name: '', class_date: '', module_id: '' });
      fetchClasses();
      const filteredClasses = classes.filter(
        c => c.module_id === moduleActive.id,
      );

      setClassesActives(filteredClasses);
      showModuleContentState();
    }
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

  const changeEditForm = () => {
    if (showEditForm && moduleTitle) {
      return <EditModuleForm />;
    }

    if (showEditForm && classTitle) {
      return <EditClassForm />;
    }

    if (classTitle && !showEditForm) {
      return (
        <h1>
          Data da aula: <span>{classeActive.class_date}</span>
        </h1>
      );
    }

    return '';
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
            <div>
              {moduleTitle || classTitle ? (
                <button type="button" onClick={() => handleMoveBack()}>
                  <BiArrowBack />
                </button>
              ) : (
                ''
              )}
              {changePageTitle()}
              {moduleTitle || classTitle ? (
                <button type="button" onClick={() => handleEditForm()}>
                  <AiFillEdit />
                </button>
              ) : (
                ''
              )}
            </div>
            {moduleTitle || classTitle ? (
              <button type="button" onClick={() => handleDelete()}>
                <AiFillDelete />
              </button>
            ) : (
              ''
            )}
          </h1>
          <div className={styles.cardsContainer}>
            {showModules && showModulesContent()}
            {showClasses && showClassesContent()}
            {changeEditForm()}
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
