import { useEffect, useState } from 'react';
import api from '../services/api';

type ClassesProps = {
  class_date: string;
  id: string;
  module_id: string;
  name: string;
};

export const useClassesApi = () => {
  const [classes, setClasses] = useState<ClassesProps[]>([]);
  const [classesActives, setClassesActives] = useState<ClassesProps[]>([]);

  useEffect(() => {
    api.getClasses().then(response => setClasses(response.data));
  }, []);

  return {
    classes,
    setClasses,
    classesActives,
    setClassesActives,
  };
};
