import React from 'react';
import styled from 'styled-components';

import { data } from './ticketVerifySlice';

import { useAppSelector } from '../../app/hooks';
import { useLangs } from '../../hooks/useLangs';

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
  const langs = useLangs();

  return (
    <StyledTicketDetails>
      {ticketData?.DateOfUse && (
        <div>
          <span className={'details-title'}>{langs('Date of use')}:</span>
          <span>{ticketData.DateOfUse.toString()}</span>
        </div>
      )}
      <div>
        <span className={'details-title'}>{langs('Order number')}:</span>
        <span>{ticketData?.ticketId}</span>
      </div>
      <div>
        <span className={'details-title'}>{langs('Name')}:</span>
        <span>{ticketData?.userName}</span>
      </div>
      <div>
        <span className={'details-title'}>{langs('Email')}:</span>
        <span>{ticketData?.userEmail}</span>
      </div>
    </StyledTicketDetails>
  );
};

export default TicketDetails;
