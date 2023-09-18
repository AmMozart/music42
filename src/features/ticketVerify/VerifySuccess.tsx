import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

import TicketDetails from './TicketDetails';
import TicketHeader from './TicketHeader';

const StyledVerifySuccess = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  height: 100%;

  & .other-data div {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-bottom: 1px dashed;
  }

  & .other-data div:last-child {
    border-bottom: none;
  }

  & .other-data .details-title {
    font-weight: 500;
  }

  & .icon {
    color: #0ccb4a;
  }

  & h4 {
    text-align: center;
  }
`;

const VerifySuccess: React.FC = () => {
  return (
    <StyledVerifySuccess>
      <TicketHeader />
      <FontAwesomeIcon icon={faCircleCheck} className={'icon'} size={'5x'} />
      <h4>Билет успешно зарегестрирован</h4>
      <TicketDetails />
    </StyledVerifySuccess>
  );
};

export default VerifySuccess;
