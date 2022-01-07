import styles from './styles.module.scss';

type ClassesCardProps = {
  name: string;
  classDate: string;
  moduleId: string;
  id: string;
  handleClasseActive: any;
};

const formatDate = (date: string | undefined) => {
  if (date !== undefined) {
    const newDate = new Date(date);
    return `${newDate.getDate()}/${
      newDate.getMonth() + 1
    }/${newDate.getFullYear()}`;
  }

  return date;
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
