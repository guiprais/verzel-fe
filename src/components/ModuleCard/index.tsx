import styles from './styles.module.scss';

type ModuleCardProps = {
  name: string;
  classes: number;
  id: string;
  activeModule?: any;
  // onClick?: React.MouseEventHandler<MouseEvent>;
};

export const ModuleCard = ({
  name,
  classes,
  id,
  activeModule,
}: ModuleCardProps) => {
  return (
    <button
      id={id}
      onClick={event => activeModule(event)}
      type="button"
      className={styles.container}
    >
      <h1>{name}</h1>
      <span>{classes > 1 ? `${classes} aulas` : `${classes} aula`}</span>
    </button>
  );
};
