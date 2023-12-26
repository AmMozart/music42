import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ButtonControl from './ButtonControl';

import { deleteRoom } from './rooms.slice';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RoomItemData } from '../../app/types';
import { user } from '../user/userSlice';

const StyledRoomItem = styled.li`
  cursor: pointer;

  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  min-width: 300px;
  margin-bottom: 10px;
  padding: 10px;

  color: #fff;

  background: #28a7452b;
  border-radius: 10px;

  transition: background 0.3s ease-in, color 0.3s ease-in;

  &:hover {
    color: #fff;
    background: #141414;
  }
`;

// const StyledId = styled.span`
//   width: 40px;
//   color: #989898;

//   &::before {
//     content: '#';
//   }
// `;

const StyledRemove = styled.div`
  position: absolute;
  top: -12px;
  right: -10px;
  color: #b30e03;

  &:hover {
    color: #f00;
  }
`;

const StyledTitle = styled.span`
  overflow: hidden;
  width: 100px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledPeopleCount = styled.span`
  position: relative;

  display: flex;
  gap: 5px;

  color: rgb(255 255 255);
  text-align: right;

  & span {
    position: absolute;
    top: -4px;
    right: -8px;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 15px;
    height: 16px;

    font-size: 0.6em;

    background: #0cc092;
    border-radius: 50%;
  }
`;

interface RoomItemProps {
  room: RoomItemData;
}

const RoomItem: React.FC<RoomItemProps> = ({ room }) => {
  const navigate = useNavigate();
  const currentUser = useAppSelector(user);
  const dispatch = useAppDispatch();

  const openRoom = () => {
    if (userJoined()) {
      openRoomPage();
    }
  };

  const userJoined = () =>
    room.invitedUserIds?.includes(currentUser.id) || isOwner();
  const isOwner = () => room.userId === currentUser.id;
  const openRoomPage = () => navigate(location.pathname + '/' + room.id);
  const isRoomOwner = () => currentUser.id === room.userId;

  const deleteHandle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(deleteRoom(room.id));
  };

  return (
    <StyledRoomItem
      onClick={currentUser.username ? openRoom : undefined}
      data-toggle={currentUser.username ? undefined : 'modal'}
      data-target={currentUser.username ? undefined : '#login_box'}
    >
      {/* <StyledId>{room.id}</StyledId> */}
      <StyledTitle>{room.title}</StyledTitle>
      <ButtonControl room={room} />
      <StyledPeopleCount>
        <svg
          fill='#a7a7a7'
          width='24px'
          height='24px'
          viewBox='0 0 32 32'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M23.313 26.102l-6.296-3.488c2.34-1.841 2.976-5.459 2.976-7.488v-4.223c0-2.796-3.715-5.91-7.447-5.91-3.73 0-7.544 3.114-7.544 5.91v4.223c0 1.845 0.78 5.576 3.144 7.472l-6.458 3.503s-1.688 0.752-1.688 1.689v2.534c0 0.933 0.757 1.689 1.688 1.689h21.625c0.931 0 1.688-0.757 1.688-1.689v-2.534c0-0.994-1.689-1.689-1.689-1.689zM23.001 30.015h-21.001v-1.788c0.143-0.105 0.344-0.226 0.502-0.298 0.047-0.021 0.094-0.044 0.139-0.070l6.459-3.503c0.589-0.32 0.979-0.912 1.039-1.579s-0.219-1.32-0.741-1.739c-1.677-1.345-2.396-4.322-2.396-5.911v-4.223c0-1.437 2.708-3.91 5.544-3.91 2.889 0 5.447 2.44 5.447 3.91v4.223c0 1.566-0.486 4.557-2.212 5.915-0.528 0.416-0.813 1.070-0.757 1.739s0.446 1.267 1.035 1.589l6.296 3.488c0.055 0.030 0.126 0.063 0.184 0.089 0.148 0.063 0.329 0.167 0.462 0.259v1.809zM30.312 21.123l-6.39-3.488c2.34-1.841 3.070-5.459 3.070-7.488v-4.223c0-2.796-3.808-5.941-7.54-5.941-2.425 0-4.904 1.319-6.347 3.007 0.823 0.051 1.73 0.052 2.514 0.302 1.054-0.821 2.386-1.308 3.833-1.308 2.889 0 5.54 2.47 5.54 3.941v4.223c0 1.566-0.58 4.557-2.305 5.915-0.529 0.416-0.813 1.070-0.757 1.739 0.056 0.67 0.445 1.267 1.035 1.589l6.39 3.488c0.055 0.030 0.126 0.063 0.184 0.089 0.148 0.063 0.329 0.167 0.462 0.259v1.779h-4.037c0.61 0.46 0.794 1.118 1.031 2h3.319c0.931 0 1.688-0.757 1.688-1.689v-2.503c-0.001-0.995-1.689-1.691-1.689-1.691z'></path>
        </svg>
        <span>{room.userIds.length}</span>
      </StyledPeopleCount>
      {isRoomOwner() && (
        <StyledRemove onClick={deleteHandle}>
          <svg
            fill='currentColor'
            width='24px'
            height='24px'
            viewBox='0 0 32 32'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M11.188 4.781c6.188 0 11.219 5.031 11.219 11.219s-5.031 11.188-11.219 11.188-11.188-5-11.188-11.188 5-11.219 11.188-11.219zM11.25 17.625l3.563 3.594c0.438 0.438 1.156 0.438 1.594 0 0.406-0.406 0.406-1.125 0-1.563l-3.563-3.594 3.563-3.594c0.406-0.438 0.406-1.156 0-1.563-0.438-0.438-1.156-0.438-1.594 0l-3.563 3.594-3.563-3.594c-0.438-0.438-1.156-0.438-1.594 0-0.406 0.406-0.406 1.125 0 1.563l3.563 3.594-3.563 3.594c-0.406 0.438-0.406 1.156 0 1.563 0.438 0.438 1.156 0.438 1.594 0z'></path>
          </svg>
        </StyledRemove>
      )}
    </StyledRoomItem>
  );
};

export default RoomItem;
