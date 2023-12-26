import React from 'react';
import styled, { css } from 'styled-components';

const StyledMessage = styled.div<{ type: TypeMessage }>`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 5px 5px 20px;
  padding: 20px;

  border: 2px dashed;
  border-radius: 20px;

  ${({ type }) => {
    switch (type) {
      case 'success':
        return css`
          color: #1eaf1e;
          background: #00ff0015;
          border-color: #1eaf1e;
        `;
      case 'error':
        return css`
          color: #f00;
          background: #ff000024;
          border-color: #b92020;
        `;
      case 'info':
        return css`
          color: #1e38af;
          background: #0008ff23;
          border-color: #1e28af;
        `;
      case 'warning':
        return css`
          color: #af581e;
          background: #ff6a0022;
          border-color: #af641e;
        `;
    }
  }}
`;

type TypeMessage = 'success' | 'error' | 'info' | 'warning';

interface MessageProps {
  value: string;
  type?: TypeMessage;
}

const Message: React.FC<MessageProps> = ({ value, type = 'success' }) => (
  <StyledMessage type={type}>
    <span>{value}</span>
  </StyledMessage>
);

export default Message;
