import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';

import styled from 'styled-components';

import {
  getTickets,
  setTicketIds,
  ticketHtml,
  ticketIds,
} from './ticketDownloadSlice';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

const StyledTicketDownload = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  max-width: 500px;
  margin: 0 auto;

  & .icon {
    color: #0ccb4a;
  }

  & h4,
  & h5,
  & h6 {
    padding: 20px 0;
    text-align: center;
  }

  & .download-button {
    cursor: pointer;

    width: 100%;
    height: 80px;
    margin-bottom: 50px;

    font: normal bold 18px Arial, sans-serif;
    color: #e4e0fb;

    background-color: #574ae2;
    border: none;
  }

  & .download-button:hover {
    background: #6b60e3;
  }
`;

const TicketDownload: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const currentTicketIds = useAppSelector(ticketIds);
  const html = useAppSelector(ticketHtml);
  const [cookies] = useCookies(['buy_tickets']);

  useEffect(() => {
    const ids = decodeURIComponent(cookies.buy_tickets).split(',');
    dispatch(setTicketIds(ids.map((val) => +val)));
  }, [cookies]);

  useEffect(() => {
    if (html.length > 0) {
      html.forEach((val) => {
        // if (ref.current) ref.current.insertAdjacentHTML('afterbegin', val);
        (window as any).$('#ticket_container').append(val);
      });
    }
  }, [html]);

  const download = () => {
    dispatch(getTickets(currentTicketIds));
  };

  return (
    <StyledTicketDownload>
      <h4>Поздравляем!</h4>
      <h5>Вы купили билеты: {currentTicketIds.length} шт. </h5>
      <FontAwesomeIcon icon={faCircleCheck} className={'icon'} size={'5x'} />
      <h6>Нажмите кнопку "Скачать" и они загрузятся на ваше устройство</h6>
      <button className={'download-button'} onClick={download}>
        Скачать
      </button>
      <div id='ticket_container' ref={ref}></div>
    </StyledTicketDownload>
  );
};

export default TicketDownload;
