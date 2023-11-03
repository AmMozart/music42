import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

import TicketDetails from './TicketDetails';

import TicketHeader from './TicketHeader';
import { verifyErrorMessage } from './ticketVerifySlice';

import { useAppSelector } from '../../app/hooks';

const StyledVerifyError = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  height: 100%;

  & .icon {
    color: #e32f2f;
  }

  & h4 {
    text-align: center;
  }
`;

const VerifyError: React.FC = () => {
  const message = useAppSelector(verifyErrorMessage);

  return (
    <StyledVerifyError>
      <TicketHeader />
      <FontAwesomeIcon
        icon={faCircleExclamation}
        className={'icon'}
        size={'5x'}
      />
      <h4>{message}</h4>
      <TicketDetails />
    </StyledVerifyError>
  );
};

export default VerifyError;
