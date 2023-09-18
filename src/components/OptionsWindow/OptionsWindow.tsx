import React from 'react';
import styled from 'styled-components';

const StyledOptionsWindow = styled.div`
  cursor: pointer;

  position: absolute;
  z-index: 1;
  top: 5px;
  right: 5px;

  overflow: hidden;

  background-color: #0000008f;
  border-radius: 10px;
`;

type OptionsWindowProps = React.HTMLAttributes<HTMLDivElement>;

const OptionsWindow: React.FC<OptionsWindowProps> = ({ children }) => {
  return <StyledOptionsWindow>{children}</StyledOptionsWindow>;
};

export default OptionsWindow;
