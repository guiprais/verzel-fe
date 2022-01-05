import styles from './styles.module.scss';

type ModuleCardProps = {
  name: string;
  classes: number;
  id: string;
  handleModuleActive?: any;
  // onClick?: React.MouseEventHandler<MouseEvent>;
};

export const ModuleCard = ({
  name,
  classes,
  id,
  handleModuleActive,
}: ModuleCardProps) => {
  return (
    <button
      id={id}
      onClick={event => handleModuleActive(event)}
      type="button"
      className={styles.container}
    >
      <h1>{name}</h1>
      <span>{classes > 1 ? `${classes} aulas` : `${classes} aula`}</span>
    </button>
  );
};
