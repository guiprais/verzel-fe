import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../services/api';

type ModulesProps = {
  id: string;
  name: string;
};

type GetModulesProps = {
  id?: string;
  name: string;
};

type CreateModuleApiProps = {
  moduleName: string;
};

interface ModulesProviderProps {
  children: ReactNode;
}

interface ModulesContextData {
  modules: ModulesProps[];
  setModules: React.Dispatch<React.SetStateAction<ModulesProps[]>>;
  moduleActive: ModulesProps;
  setModuleActive: React.Dispatch<React.SetStateAction<ModulesProps>>;
  createModule: ({
    moduleName,
  }: CreateModuleApiProps) => Promise<{ success: boolean; error: string }>;
  getModule: GetModulesProps;
  editModule: ({
    id,
    name,
  }: ModulesProps) => Promise<{ success: boolean; error: string }>;
}

const ModulesContext = createContext<ModulesContextData>(
  {} as ModulesContextData,
);

export const ModulesProvider = ({ children }: ModulesProviderProps) => {
  const [modules, setModules] = useState<ModulesProps[]>([]);
  const [moduleActive, setModuleActive] = useState<ModulesProps>({
    id: '',
    name: 'Módulos',
  });
  const [infoCreateModule, setInfoCreateModule] = useState<string>('');
  const [infoEditModule, setInfoEditModule] = useState<string>('');

  const createModule = async ({ moduleName }: CreateModuleApiProps) => {
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
  }, [infoCreateModule, infoEditModule]);

  const getModule = (moduleName: string) => {
    return modules.find(module => module.name === moduleName);
  };

  const editModule = async ({ id, name }: ModulesProps) => {
    const edit = await api.editModule({ id, name });

    if (edit.error) {
      setInfoEditModule('error');
      return { success: false, error: edit.error };
    }
    setInfoEditModule('success');
    return { success: true, error: '' };
  };

  return (
    <ModulesContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        modules,
        setModules,
        moduleActive,
        setModuleActive,
        createModule,
        getModule,
        editModule,
      }}
    >
      {children}
    </ModulesContext.Provider>
  );
};

export function useModules() {
  const context = useContext(ModulesContext);

  return context;
}
