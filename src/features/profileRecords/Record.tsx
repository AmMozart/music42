import React, { useState } from 'react';

import styled from 'styled-components';

import { deleteRecordById, username } from './profileRecords.slice';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DeleteButton, Modal } from '../../components';
import { device } from '../../device';
import { user } from '../user/userSlice';

const StyledRecord = styled.div`
  cursor: pointer;

  position: relative;

  overflow: auto;

  width: 320px;
  height: 220px;

  /* border: 1px solid #4d4d4d;
  border-radius: 20px; */

  @media ${device.mobileL} {
    width: 100%;
  }
`;

interface RecordProps {
  id: number;
  url: string;
}

const Record: React.FC<RecordProps> = ({ id, url }) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(user);
  const selectedUsername = useAppSelector(username);
  const [show, setShow] = useState(false);

  const deleteVideo = () => {
    setShow(true);
  };

  const handleDelete = () => {
    dispatch(deleteRecordById(id));
  };

  const handleClose = () => {
    setShow(false);
  };

  const isMyVideo = () => {
    return currentUser.username === selectedUsername;
  };

  return (
    <StyledRecord>
      <video controls width='100%' height='220px' preload='yes'>
        <source src={'/' + url.replace('.webm', '.mp4')} type='video/mp4' />
        <source src={'/' + url} type='video/webm' />
        {/* <source
          src={'/' + url.replace('.mkv', '_compress.ogv')}
          type='video/ogg'
        /> */}
        Your browser doesn't support HTML5 video tag.
      </video>
      {isMyVideo() && <DeleteButton onClick={deleteVideo} />}
      {show && (
        <Modal
          message='Are you sure you want to delete?'
          rejectText='Cancel'
          confirmText='Delete'
          onConfirm={handleDelete}
          onReject={handleClose}
        />
      )}
    </StyledRecord>
  );
};

export default Record;
