import styles from './styles.module.scss';

type CardProps = {
  name: string;
  classes?: number;
  id?: string;
  classDate?: string;
};

const classesPlural = (classes: number) => {
  return classes > 1 ? `${classes} aulas` : `${classes} aula`;
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

export const Card = ({ name, classes, classDate }: CardProps) => {
  return (
    <button type="button" className={styles.container}>
      <div>
        <h1>{name}</h1>
        <span>
          {classes === undefined ? (
            <span>{`Data da Aula: ${formatDate(classDate)}`}</span>
          ) : (
            classesPlural(classes)
          )}
        </span>
      </div>
    </button>
  );
};
