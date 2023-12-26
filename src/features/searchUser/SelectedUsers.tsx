import React from 'react';

import styled from 'styled-components';

import { searchUserAction } from './searchUser.slice';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UserData } from '../../app/types';
import { user } from '../user/userSlice';

const StyledSelectedUsers = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
`;

const StyledItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;

  padding: 8px;

  color: white;

  background: #1f5d2d61;
  border-radius: 5px;

  & svg {
    cursor: pointer;
    transform: scale(0.8);
    fill: #ca0000;
  }

  & svg:hover {
    cursor: pointer;
    transform: scale(0.8);
    fill: #d14b4b;
  }
`;

interface SelectedUsersProps {
  users: UserData[];
}

const SelectedUsers: React.FC<SelectedUsersProps> = ({ users }) => {
  return (
    <StyledSelectedUsers>
      {users.map((user) => (
        <StyledItem key={user.id}>
          <span>{user.username}</span>
          <RemoveUser user={user} />
        </StyledItem>
      ))}
    </StyledSelectedUsers>
  );
};

const RemoveUser: React.FC<{ user: UserData }> = (props) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(user);

  const remove = () => {
    dispatch(searchUserAction.removeUser(props.user));
  };

  if (currentUser.id === props.user.id) return null;
  return (
    <svg
      onClick={remove}
      width='24px'
      height='24px'
      viewBox='0 0 1024 1024'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z' />
    </svg>
  );
};
export default React.memo(SelectedUsers);
