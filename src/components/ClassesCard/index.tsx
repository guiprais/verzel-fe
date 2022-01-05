import styles from './styles.module.scss';

type ClassesCardProps = {
  name: string;
  classDate: string;
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

export const ClassesCard = ({ name, classDate }: ClassesCardProps) => {
  return (
    <button type="button" className={styles.container}>
      <h1>{name}</h1>
      <span>{formatDate(classDate)}</span>
    </button>
  );
};
