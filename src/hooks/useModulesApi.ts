import { useEffect, useState } from 'react';
import api from '../services/api';

type ModulesProps = {
  id: string;
  name: string;
};

type createModuleApiProps = {
  moduleName: string;
};

export const useModulesApi = () => {
  const [modules, setModules] = useState<ModulesProps[]>([]);
  const [moduleActive, setModuleActive] = useState('Módulos');
  const [infoCreateModule, setInfoCreateModule] = useState<string>('');

  const createModule = async ({ moduleName }: createModuleApiProps) => {
    const create = await api.createModule(moduleName);

    if (create.error) {
      setInfoCreateModule('error');
      return { success: false, error: create.error };
    }
    setInfoCreateModule('success');
    return { success: true, error: '' };
  };

  useEffect(() => {
    api.getModules().then(response => setModules(response.data));
  }, [infoCreateModule]);

  const getModule = (moduleName: string) => {
    return modules.find(module => module.name === moduleName);
  };

  return {
    modules,
    moduleActive,
    setModuleActive,
    createModule,
    getModule,
  };
};
