import React, { useEffect, useState } from 'react';

import { Button } from 'react-bootstrap';
import styled from 'styled-components';

import { currentRoom, invite } from './rooms.slice';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CloseButton } from '../../components';
import { Modal } from '../../components/UI';
import { device } from '../../device';
import { useLangs } from '../../hooks/useLangs';
import SearchUser from '../searchUser/SearchUser';
import {
  initUsers,
  searchUserAction,
  selectedUser,
} from '../searchUser/searchUser.slice';
import { user } from '../user/userSlice';

const StyledPeople = styled.div`
  cursor: pointer;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 120px;
  height: 50px;
  margin: 10px;
  padding: 0 20px;

  background: rgb(32 32 32);
  border-radius: 10px;

  &:hover {
    color: white;
    background: #272727;
  }

  & svg {
    margin-right: 10px;
  }

  @media ${device.mobileL} {
    min-width: 80px;

    & span {
      display: none;
    }

    & svg {
      margin-right: 0;
    }
  }
`;

const StyledPeopleCount = styled.div`
  position: absolute;
  top: -6px;
  right: -6px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;

  font-size: 0.7em;
  color: #fff;

  background: #00850d;
  border-radius: 50%;
`;

const People = () => {
  const langs = useLangs();
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const selectedUsers = useAppSelector(selectedUser);
  const currentUser = useAppSelector(user);
  const room = useAppSelector(currentRoom);

  useEffect(() => {
    room && dispatch(initUsers(room.id));
    return () => {
      dispatch(searchUserAction.clear());
    };
  }, [room]);

  const openSearchUserModal = () => {
    setShowModal(true);
  };

  const closeSearchUserModal = () => {
    room && dispatch(initUsers(room.id));
    setShowModal(false);
  };

  const inviteUsers = () => {
    if (room)
      dispatch(
        invite({ roomId: room?.id, userIds: selectedUsers.map((x) => x.id) })
      );
    setShowModal(false);
  };

  return (
    <>
      <StyledPeople onClick={openSearchUserModal}>
        <svg
          fill='currentColor'
          width='24px'
          height='24px'
          viewBox='0 0 32 32'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M23.313 26.102l-6.296-3.488c2.34-1.841 2.976-5.459 2.976-7.488v-4.223c0-2.796-3.715-5.91-7.447-5.91-3.73 0-7.544 3.114-7.544 5.91v4.223c0 1.845 0.78 5.576 3.144 7.472l-6.458 3.503s-1.688 0.752-1.688 1.689v2.534c0 0.933 0.757 1.689 1.688 1.689h21.625c0.931 0 1.688-0.757 1.688-1.689v-2.534c0-0.994-1.689-1.689-1.689-1.689zM23.001 30.015h-21.001v-1.788c0.143-0.105 0.344-0.226 0.502-0.298 0.047-0.021 0.094-0.044 0.139-0.070l6.459-3.503c0.589-0.32 0.979-0.912 1.039-1.579s-0.219-1.32-0.741-1.739c-1.677-1.345-2.396-4.322-2.396-5.911v-4.223c0-1.437 2.708-3.91 5.544-3.91 2.889 0 5.447 2.44 5.447 3.91v4.223c0 1.566-0.486 4.557-2.212 5.915-0.528 0.416-0.813 1.070-0.757 1.739s0.446 1.267 1.035 1.589l6.296 3.488c0.055 0.030 0.126 0.063 0.184 0.089 0.148 0.063 0.329 0.167 0.462 0.259v1.809zM30.312 21.123l-6.39-3.488c2.34-1.841 3.070-5.459 3.070-7.488v-4.223c0-2.796-3.808-5.941-7.54-5.941-2.425 0-4.904 1.319-6.347 3.007 0.823 0.051 1.73 0.052 2.514 0.302 1.054-0.821 2.386-1.308 3.833-1.308 2.889 0 5.54 2.47 5.54 3.941v4.223c0 1.566-0.58 4.557-2.305 5.915-0.529 0.416-0.813 1.070-0.757 1.739 0.056 0.67 0.445 1.267 1.035 1.589l6.39 3.488c0.055 0.030 0.126 0.063 0.184 0.089 0.148 0.063 0.329 0.167 0.462 0.259v1.779h-4.037c0.61 0.46 0.794 1.118 1.031 2h3.319c0.931 0 1.688-0.757 1.688-1.689v-2.503c-0.001-0.995-1.689-1.691-1.689-1.691z'></path>
        </svg>
        <span>{langs('People')}</span>
        <StyledPeopleCount>{selectedUsers.length}</StyledPeopleCount>
      </StyledPeople>
      <Modal show={showModal} onClose={closeSearchUserModal}>
        {currentUser.id === room?.userId ? (
          <>
            <SearchUser selected={selectedUsers} />
            <Button
              onClick={inviteUsers}
              style={{ marginTop: '15px', float: 'right' }}
            >
              {langs('Confirm')}
            </Button>
          </>
        ) : (
          <>
            <ul>
              {selectedUsers.map((user) => (
                <li key={user.id}>{user.username}</li>
              ))}
            </ul>
            <Button
              onClick={closeSearchUserModal}
              style={{ marginTop: '15px', float: 'right' }}
            >
              {langs('Ok')}
            </Button>
          </>
        )}

        <CloseButton onClick={closeSearchUserModal} />
      </Modal>
    </>
  );
};

export default React.memo(People);
