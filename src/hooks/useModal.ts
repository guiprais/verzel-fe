import { useState } from 'react';

export const useModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modulesForm, setModulesForm] = useState(false);

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

  return {
    modalIsOpen,
    modulesForm,
    closeModal,
    handleOpenClassModal,
    handleOpenModuleModal,
  };
};
