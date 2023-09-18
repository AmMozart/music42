import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

import TicketDetails from './TicketDetails';

import TicketHeader from './TicketHeader';

const StyledVerifyError = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  height: 100%;

  & .icon {
    color: #e32f2f;
  }
`;

const VerifyError: React.FC = () => {
  return (
    <StyledVerifyError>
      <TicketHeader />
      <FontAwesomeIcon
        icon={faCircleExclamation}
        className={'icon'}
        size={'5x'}
      />
      <h4>Билет уже использован</h4>
      <TicketDetails />
    </StyledVerifyError>
  );
};

export default VerifyError;
