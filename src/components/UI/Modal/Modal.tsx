import React from 'react';
import styled from 'styled-components';

const StyledModal = styled.section`
  position: fixed;
  z-index: 999;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgb(0 0 0 / 80%);

  & .content {
    width: 600px;
    padding: 20px;

    color: #d2d2d2;

    background: #161616;
    border-radius: 10px;
    box-shadow: 0 0 8px 0 #626262;
  }
`;

interface ModalProps {
  children?: React.ReactNode;
  show?: boolean;
  onClose?: React.MouseEventHandler<HTMLDivElement>;
}

const Modal: React.FC<ModalProps> = ({ children, show, onClose }) => {
  const close = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose && onClose(e);
    }
  };

  return show ? (
    <StyledModal onClick={close}>
      <div className='content'>{children}</div>
    </StyledModal>
  ) : null;
};

export default React.memo(Modal);
