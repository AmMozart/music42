import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

import { data } from './ticketVerifySlice';

import { useAppSelector } from '../../app/hooks';
import { useLangs } from '../../hooks/useLangs';

const StyledTicketNotFound = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;

  & .icon {
    color: #e32f2f;
  }
`;

const TicketNotFound: React.FC = () => {
  const ticketData = useAppSelector(data);
  const langs = useLangs();

  if (ticketData) return null;

  return (
    <StyledTicketNotFound>
      <FontAwesomeIcon icon={faCircleXmark} className={'icon'} size={'5x'} />
      <h3>{langs('Ticket not found')}</h3>
    </StyledTicketNotFound>
  );
};

export default TicketNotFound;
