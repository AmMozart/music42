import React, { useEffect } from 'react';
import styled from 'styled-components';

import RoomItem from './RoomItem';
import { getRoomItems, rooms } from './rooms.slice';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

const StyledRoomList = styled.ul`
  user-select: none;

  width: 100%;
  max-width: 700px;
  padding: 10px;

  list-style: none;
`;

const RoomList: React.FC = () => {
  const dispatch = useAppDispatch();
  const roomList = useAppSelector(rooms);

  useEffect(() => {
    dispatch(getRoomItems());
  }, []);

  return (
    <StyledRoomList>
      {roomList.map((room) => (
        <RoomItem key={room.id} room={room} />
      ))}
    </StyledRoomList>
  );
};

export default RoomList;
