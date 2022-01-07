import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../services/api';

type ClassesProps = {
  class_date: string;
  id: string;
  module_id: string;
  name: string;
};

interface ClassesProviderProps {
  children: ReactNode;
}

interface ModulesContextData {
  classes: ClassesProps[];
  setClasses: React.Dispatch<React.SetStateAction<ClassesProps[]>>;
  classesActives: ClassesProps[];
  setClassesActives: React.Dispatch<React.SetStateAction<ClassesProps[]>>;
  setClasseActive: any;
  classeActive: any;
}

const ClassesContext = createContext<ModulesContextData>(
  {} as ModulesContextData,
);

export const ClassesProvider = ({ children }: ClassesProviderProps) => {
  const [classes, setClasses] = useState<ClassesProps[]>([]);
  const [classesActives, setClassesActives] = useState<ClassesProps[]>([]);
  const [classeActive, setClasseActive] = useState<ClassesProps>();

  useEffect(() => {
    api.getClasses().then(response => setClasses(response.data));
  }, []);

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
