import styles from './styles.module.scss';

import { formatDate } from '../../services/utils';

type ClassesCardProps = {
  name: string;
  classDate: string;
  moduleId: string;
  id: string;
  handleClasseActive: any;
};

export const ClassesCard = ({
  name,
  id,
  classDate,
  moduleId,
  handleClasseActive,
}: ClassesCardProps) => {
  return (
    <button
      type="button"
      className={styles.container}
      id={id}
      data-classdate={formatDate(classDate)}
      data-moduleid={moduleId}
      name={name}
      onClick={event => handleClasseActive(event)}
    >
      <h1>{name}</h1>
      <span>{formatDate(classDate)}</span>
    </button>
  );
};
