import React from 'react';
import styled from 'styled-components';

import { data } from './ticketVerifySlice';

import { useAppSelector } from '../../app/hooks';

const StyledTicketHeader = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  & h3 {
    color: #8994b4;
    text-align: center;
  }

  & .event-name {
    padding: 10px;
    font: normal bold 20px Arial, sans-serif;
  }

  & .event-date {
    padding: 10px;
    font: normal bold 18px Arial, sans-serif;
  }
`;

const TicketHeader: React.FC = () => {
  const ticketData = useAppSelector(data);

  return (
    <StyledTicketHeader>
      <h3>Проверка билета на событие</h3>
      <span className={'event-name'}>{ticketData?.eventName}</span>
      <span>Место: {ticketData?.eventVenueName}</span>
      <span className={'event-date'}>
        Дата: {ticketData?.startDate} - {ticketData?.endDate}
      </span>
    </StyledTicketHeader>
  );
};

export default TicketHeader;
