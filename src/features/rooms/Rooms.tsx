import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import RoomList from './RoomList';

import { errorMessage, roomsActions } from './rooms.slice';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AddButton, Message } from '../../components';
import { useLangs } from '../../hooks/useLangs';
import { user } from '../user/userSlice';

const StyledRooms = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  width: 100%;
  min-height: 90vh;

  & > .title {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;

    margin-bottom: 15px;
    padding-bottom: 15px;

    font-size: 24px;
    color: #d2d2d2;

    border-bottom: 1px solid #313437;
  }
`;

const Rooms: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = useAppSelector(user);
  const message = useAppSelector(errorMessage);
  const langs = useLangs();
  const dispatch = useAppDispatch();

  const handleAdd = () => {
    navigate(location.pathname + '/create');
  };

  useEffect(() => {
    if (message) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      setTimeout(() => dispatch(roomsActions.setMessage('')), 5_000);
    }
  }, [message]);

  return (
    <StyledRooms>
      <div className='title'>
        <svg
          width='24px'
          height='24px'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          stroke='currentColor'
        >
          <path
            d='M21 11.5C21 13.433 19.433 15 17.5 15C15.567 15 14 13.433 14 11.5C14 9.567 15.567 8 17.5 8C19.433 8 21 9.567 21 11.5Z'
            stroke-width='1.5'
          ></path>
          <path
            d='M10 11.5C10 13.433 8.433 15 6.5 15C4.567 15 3 13.433 3 11.5C3 9.567 4.567 8 6.5 8C8.433 8 10 9.567 10 11.5Z'
            stroke-width='1.5'
          ></path>
          <path
            d='M6.5 15H17.5'
            stroke-width='1.5'
            stroke-linecap='round'
          ></path>
        </svg>
        <span>{langs('Rooms')}</span>
      </div>
      {currentUser.username ? (
        <AddButton title={langs('Create')} onClick={handleAdd} />
      ) : (
        <AddButton
          title={langs('Create')}
          data-toggle='modal'
          data-target='#login_box'
        />
      )}
      {message && <Message value={message} type='warning' />}
      <RoomList />
    </StyledRooms>
  );
};

export default Rooms;
