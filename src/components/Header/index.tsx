import styles from './styles.module.scss';

import logo from '../../images/logo_verzel.png';

type Props = {
  openModuleModal: () => void;
  openClassModal: () => void;
};

export const Header = ({ openModuleModal, openClassModal }: Props) => {
  return (
    <div className={styles.container}>
      <img src={logo} alt="Logo Verzel" />
      <nav>
        <ul>
          <li>
            <button type="button" onClick={openClassModal}>
              + Cadastro de Aula
            </button>
          </li>
          <li>
            <button type="button" onClick={openModuleModal}>
              + Cadastro de Módulo
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
