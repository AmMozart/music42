import React from 'react';

import styled from 'styled-components';

import {
  findUsers,
  getUsers,
  searchString,
  searchUserAction,
} from './searchUser.slice';

import SelectedUsers from './SelectedUsers';
import UserList from './UserList';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UserData } from '../../app/types';
import { Input } from '../../components/UI';
import { useLangs } from '../../hooks/useLangs';

const StyledSearchUser = styled.ul`
  margin: 0;
  padding: 0;
`;

interface SearchUserProps {
  selected: UserData[];
}

const SearchUser: React.FC<SearchUserProps> = ({ selected }) => {
  const langs = useLangs();
  const dispatch = useAppDispatch();
  const findUserList = useAppSelector(findUsers);
  const inputValue = useAppSelector(searchString);

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchUserAction.changeSearchString(e.currentTarget.value));
    if (e.currentTarget.value.length > 0) {
      dispatch(getUsers(e.currentTarget.value));
    }
  };

  return (
    <StyledSearchUser>
      <Input
        value={inputValue}
        title={langs('Search User')}
        onChange={changeName}
      />
      <UserList users={findUserList} />
      <SelectedUsers users={selected} />
    </StyledSearchUser>
  );
};

export default React.memo(SearchUser);
