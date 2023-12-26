import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { createRoom, fetchNewItemData, roomsActions } from './rooms.slice';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Message } from '../../components';
import { Input } from '../../components/UI';
import { device } from '../../device';
import { useLangs } from '../../hooks/useLangs';

const StyledCreateRoom = styled.form`
  width: 730px;
  margin: 40px;

  background: #161616;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 20%);

  @media ${device.tabletM} {
    margin: 0;
  }
`;

const StyledFormField = styled.section`
  margin: 40px;

  & > button {
    float: right;
    margin: 20px;
    padding: 15px 70px;
    border-radius: 40px;
  }

  @media ${device.tabletM} {
    margin: 20px;
  }
`;

const CreateRoom: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const fetchNewItemState = useAppSelector(fetchNewItemData);
  const langs = useLangs();

  useEffect(() => {
    if (fetchNewItemState.status === 200) {
      setTimeout(() => {
        navigate('/rooms');
        dispatch(roomsActions.resetNewItem());
      }, 3000);
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [fetchNewItemState]);

  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.target instanceof HTMLFormElement) {
      dispatch(createRoom(e.target));
    }
  };

  return (
    <StyledCreateRoom onSubmit={submitHandle}>
      {fetchNewItemState.status === 400 && (
        <Message value={fetchNewItemState.message} type={'error'} />
      )}
      {fetchNewItemState.status === 200 && (
        <Message value={fetchNewItemState.message} type={'success'} />
      )}
      <StyledFormField>
        <Input
          type='text'
          title={langs('Title')}
          name='title'
          maxLength={100}
        />
        <Button type='submit'>{langs('Create')}</Button>
      </StyledFormField>
    </StyledCreateRoom>
  );
};

export default CreateRoom;
