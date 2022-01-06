import { FC } from 'react';
import ReactModal from 'react-modal';

interface IProps {
  isOpen: boolean;
  handleModal: () => void;
}

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

export const Modal: FC<IProps> = ({ isOpen, handleModal, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleModal}
      style={customStyles}
    >
      {children}
    </ReactModal>
  );
};
