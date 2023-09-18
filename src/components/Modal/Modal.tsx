import React from 'react';
import Button from 'react-bootstrap/Button';

import styled from 'styled-components';

const StyledModal = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background: #0000006c;

  & .modal-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    background: #000;
    border-radius: 10px;
  }

  & .modal-controls {
    display: flex;
    gap: 20px;
    justify-content: flex-end;
  }
`;

interface ModalProps {
  message?: string;
  confirmText?: string;
  rejectText?: string;
  onReject?: () => void;
  onConfirm?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  message = 'Please click button below',
  confirmText = 'Confirm',
  rejectText = 'Reject',
  onReject = () => {
    return;
  },
  onConfirm = () => {
    return;
  },
}) => {
  return (
    <StyledModal>
      <div className='modal-container'>
        <h6>{message}</h6>
        <div className='modal-controls'>
          <Button variant={'dark'} onClick={onReject}>
            {rejectText}
          </Button>
          <Button variant={'danger'} onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </StyledModal>
  );
};

export default Modal;
