import React from 'react';
import { Button } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import { joinRoom, leaveRoom } from './rooms.slice';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RoomItemData } from '../../app/types';
import { useLangs } from '../../hooks/useLangs';
import { user } from '../user/userSlice';

interface ButtonControlProps {
  room: RoomItemData;
}

const ButtonControl: React.FC<ButtonControlProps> = ({ room }) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(user);
  const langs = useLangs();
  const navigate = useNavigate();

  const userJoined = () =>
    room.invitedUserIds?.includes(currentUser.id) || isOwner();
  const isOwner = () => room.userId === currentUser.id;

  const join = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (userJoined()) {
      dispatch(joinRoom(room.id));
      navigate(location.pathname + '/' + room.id);
    }
  };

  const leave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(leaveRoom(room.id));
  };

  const existInRoom = () => room.userIds.includes(currentUser.id);

  return (
    <>
      {existInRoom() ? (
        <Button variant='outline-warning' onClick={leave}>
          {langs('Leave')}
        </Button>
      ) : (
        <Button
          variant='outline-primary'
          onClick={currentUser.username ? join : undefined}
          data-toggle={currentUser.username ? undefined : 'modal'}
          data-target={currentUser.username ? undefined : '#login_box'}
        >
          {langs('Join')}
        </Button>
      )}
    </>
  );
};

export default ButtonControl;
