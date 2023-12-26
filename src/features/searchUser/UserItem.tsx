import React from 'react';

import styled from 'styled-components';

const StyledUserItem = styled.li<{ checked: boolean }>`
  cursor: pointer;

  box-sizing: border-box;
  height: 28px;

  list-style: none;

  background: ${({ checked }) => (checked ? '#1f5d2d61' : 'none')};

  &:hover {
    color: #fff;
  }
`;

interface UserItemProps {
  username: string;
  checked: boolean;
}

const UserItem: React.FC<UserItemProps> = ({ username, checked }) => {
  return <StyledUserItem checked={checked}>{username}</StyledUserItem>;
};

export default React.memo(UserItem);
