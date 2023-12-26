import React from 'react';

import styled from 'styled-components';

import { searchUserAction, selectedUser } from './searchUser.slice';
import UserItem from './UserItem';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UserData } from '../../app/types';

const StyledUserList = styled.ul`
  overflow: scroll;

  height: 30vh;
  padding-top: 20px;

  border: 1px solid #4f4f4f;
  border-radius: 5px;
`;

interface UserListProps {
  users: UserData[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectedUser);

  const toggleUser = (e: React.MouseEvent<HTMLUListElement>) => {
    if (e.target instanceof HTMLLIElement) {
      const li = e.target as HTMLLIElement;
      const user = selected.find((user) => user.username === li.innerText);

      if (user) {
        dispatch(searchUserAction.removeUser(user));
      } else {
        const newUser = users.find((item) => item.username === li.innerText);
        newUser && dispatch(searchUserAction.addUser(newUser));
      }
    }
  };

  return (
    <StyledUserList onClick={toggleUser}>
      {users.map((user) => (
        <UserItem
          key={user.id}
          checked={selected.includes(user)}
          username={user.username}
        />
      ))}
    </StyledUserList>
  );
};

export default React.memo(UserList);
