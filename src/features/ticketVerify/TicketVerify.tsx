import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import TicketNotFound from './TicketNotFound';
import { getData, loadingDataState } from './ticketVerifySlice';

import VerifyTicket from './VerifyTicket';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Loader from '../../components/Loader/Loader';

const StyledTicketVerify = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  height: 600px;
  margin-top: -30px;

  color: black;

  background-color: #f1f8ff;
`;

const TicketVerify: React.FC = () => {
  const { hashedTicketId } = useParams();
  const dispatch = useAppDispatch();
  const ticketLoadingDataState = useAppSelector(loadingDataState);

  useEffect(() => {
    if (hashedTicketId) {
      const ticketId = parseInt(hashedTicketId, 16) / 777;

      dispatch(getData(ticketId));
    }
  }, []);

  return (
    <StyledTicketVerify>
      {ticketLoadingDataState === 'loading' && (
        <Loader title={'Идет Загрузка...'} />
      )}
      {ticketLoadingDataState === 'success' && <VerifyTicket />}
      {ticketLoadingDataState === 'error' && <TicketNotFound />}
    </StyledTicketVerify>
  );
};

export default TicketVerify;
