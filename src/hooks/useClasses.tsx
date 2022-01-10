import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../services/api';
import { useModules } from './useModules';

type ClassesProps = {
  class_date: string;
  id: string;
  module_id: string;
  name: string;
};

interface ClassesProviderProps {
  children: ReactNode;
}

interface ICreateModule {
  name: string;
  date: string;
  modId: string;
}

interface ModulesContextData {
  classes: ClassesProps[];
  setClasses: React.Dispatch<React.SetStateAction<ClassesProps[]>>;
  classesActives: ClassesProps[];
  setClassesActives: React.Dispatch<React.SetStateAction<ClassesProps[]>>;
  setClasseActive: any;
  classeActive: any;
  fetchClasses: () => Promise<void>;
  classesQuantity: (id: string) => number;
  createClasse: ({
    name,
    date,
    modId,
  }: ICreateModule) => Promise<{ success: boolean; error: string }>;
  deleteClasse: (id: string) => void;
  editClasse: (
    moduleId: string,
    { name, date, id }: { name: string; date: string; id: string },
  ) => Promise<{ success: boolean; error: string }>;
}

const ClassesContext = createContext<ModulesContextData>(
  {} as ModulesContextData,
);

export const ClassesProvider = ({ children }: ClassesProviderProps) => {
  const [classes, setClasses] = useState<ClassesProps[]>([]);
  const [classesActives, setClassesActives] = useState<ClassesProps[]>([]);
  const [classeActive, setClasseActive] = useState<ClassesProps>();

  const [infoCreateClasse, setInfoCreateClasse] = useState<string>('');
  const [infoEditClasse, setInfoEditClasse] = useState<string>('');
  const [infoDeleteClasse, setInfoDeleteClasse] = useState<string>('');

  const createClasse = async ({ name, date, modId }: ICreateModule) => {
    const create = await api.createClass({ name, date, modId });

    if (create.error) {
      setInfoCreateClasse('error');
      return { success: false, error: create.error };
    }

    setInfoCreateClasse('success');
    return { success: true, error: '' };
  };

  const editClasse = async (
    moduleId: string,
    { name, date, id }: { name: string; date: string; id: string },
  ) => {
    const editClass = await api.editClass(moduleId, {
      name,
      date,
      id,
    });

    if (editClass.error) {
      setInfoEditClasse('error');
      return { success: false, error: editClass.error };
    }
    setInfoEditClasse('success');
    return { success: true, error: '' };
  };

  const deleteClasse = async (id: string) => {
    const deleteClass = await api.deleteClass(id);

    if (deleteClass.error) {
      setInfoDeleteClasse('error');
      return { success: false, error: deleteClass.error };
    }
    setInfoDeleteClasse('success');
    return { success: true, error: '' };
  };

  const fetchClasses = async () => {
    api.getClasses().then(response => setClasses(response.data));
  };

  useEffect(() => {
    fetchClasses();
  }, [infoCreateClasse, infoEditClasse, infoDeleteClasse]);

  // Função para calcular quantas aulas existem no módulo referente ao id passado como parâmetro
  const classesQuantity = (id: string) => {
    return classes.filter(c => c.module_id === id).length;
  };

  return (
    <ClassesContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        classes,
        setClasses,
        classesActives,
        setClassesActives,
        setClasseActive,
        classeActive,
        fetchClasses,
        classesQuantity,
        createClasse,
        deleteClasse,
        editClasse,
      }}
    >
      {children}
    </ClassesContext.Provider>
  );
};
export function useClasses() {
  const context = useContext(ClassesContext);

  return context;
}
