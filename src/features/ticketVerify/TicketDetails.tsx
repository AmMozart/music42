import React from 'react';
import styled from 'styled-components';

import { data } from './ticketVerifySlice';

import { useAppSelector } from '../../app/hooks';

const StyledTicketDetails = styled.section`
  & div {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-bottom: 1px dashed;
  }

  & div:last-child {
    border-bottom: none;
  }

  & .details-title {
    font-weight: 500;
  }
`;

const TicketDetails: React.FC = () => {
  const ticketData = useAppSelector(data);

  return (
    <StyledTicketDetails>
      {ticketData?.DateOfUse && (
        <div>
          <span className={'details-title'}>Дата использования:</span>
          <span>{ticketData.DateOfUse.toString()}</span>
        </div>
      )}
      <div>
        <span className={'details-title'}>Номер заказа:</span>
        <span>{ticketData?.ticketId}</span>
      </div>
      <div>
        <span className={'details-title'}>Имя пользователя:</span>
        <span>{ticketData?.userName}</span>
      </div>
      <div>
        <span className={'details-title'}>Email пользователя:</span>
        <span>{ticketData?.userEmail}</span>
      </div>
    </StyledTicketDetails>
  );
};

export default TicketDetails;
