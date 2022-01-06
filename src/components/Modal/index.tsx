import ReactModal from 'react-modal';
import { useModal } from '../../hooks/useModal';

type ModalProps = {
  children: React.ReactNode;
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    minWidth: '400px',
    height: '40%',
    minHeight: '500px',
  },
};

ReactModal.setAppElement('#root');

export const Modal = ({ children }: ModalProps) => {
  const { modalIsOpen, closeModal } = useModal();

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      {children}
    </ReactModal>
  );
};
