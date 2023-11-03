import React from 'react';
import styled from 'styled-components';

const StyledOptionsWindow = styled.div`
  cursor: pointer;

  position: absolute;
  z-index: 1;
  top: 5px;
  right: 5px;

  overflow: hidden;

  color: #d2d2d2;

  background-color: #0000008f;
  border-radius: 10px;

  fill: #d2d2d2;
  stroke: #d2d2d2;
`;

interface OptionsWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  show?: boolean;
}

const OptionsWindow: React.FC<OptionsWindowProps> = ({
  children,
  show = true,
}) => {
  return show ? <StyledOptionsWindow>{children}</StyledOptionsWindow> : null;
};

export default OptionsWindow;
