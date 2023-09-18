import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import TicketDetails from './TicketDetails';
import TicketHeader from './TicketHeader';
import { verifyState, verify, data } from './ticketVerifySlice';

import VerifyError from './VerifyError';
import VerifySuccess from './VerifySuccess';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

const StyledVerifyTicket = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  height: 100%;

  & .warning-text span {
    font: normal bold 18px Arial, sans-serif;
  }

  & .warning-text {
    font: normal normal 18px Arial, sans-serif;
  }

  & .verify-button {
    width: 100%;
    height: 80px;

    font: normal bold 18px Arial, sans-serif;
    color: #e4e0fb;

    background-color: #574ae2;
    border: none;
  }

  & .verify-button:hover {
    cursor: pointer;
    background-color: #756ae9;
  }
`;

const VerifyTicket: React.FC = () => {
  const { hashedTicketId } = useParams();
  const dispatch = useAppDispatch();
  const ticketVerifyState = useAppSelector(verifyState);
  const ticketData = useAppSelector(data);

  const handleClick = () => {
    if (hashedTicketId) {
      const ticketId = String(parseInt(hashedTicketId, 16) / 777);
      dispatch(verify(ticketId));
    }
  };

  return (
    <StyledVerifyTicket>
      {(ticketVerifyState === null || ticketVerifyState === 'loading') && (
        <>
          {ticketData?.DateOfUse ? (
            <VerifyError />
          ) : (
            <>
              <TicketHeader />
              <TicketDetails />
              <div>
                <p className={'warning-text'}>
                  <span>Внимание! </span>
                  После нажатия кнопки 'Использовать' билет будет считаться
                  использованным.
                </p>
                <button
                  onClick={handleClick}
                  className={'verify-button'}
                  disabled={ticketVerifyState === 'loading'}
                >
                  {ticketVerifyState === 'loading'
                    ? 'Проверяем...'
                    : 'Использовать'}
                </button>
              </div>
            </>
          )}
        </>
      )}

      {ticketVerifyState === 'success' && <VerifySuccess />}
      {ticketVerifyState === 'error' && <VerifyError />}
    </StyledVerifyTicket>
  );
};

export default VerifyTicket;
