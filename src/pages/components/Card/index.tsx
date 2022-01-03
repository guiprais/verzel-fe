import styles from './styles.module.scss';

type CardProps = {
  name: string;
  classes: string;
};

export const Card = ({ name, classes }: CardProps) => {
  return (
    <button type="button" className={styles.container}>
      <div>
        <h1>{name}</h1>
        <span>{classes}</span>
      </div>
    </button>
  );
};
