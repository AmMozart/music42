import React, { useState } from 'react';

import styled from 'styled-components';

import { deleteVideoById, username } from './profileVideo.slice';

import YoutubeContainer from './YoutubeContainer';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DeleteButton, Modal } from '../../components';
import { device } from '../../device';
import { getYoutubeVideoId } from '../../utils/getYoutubeVideoId';
import { user } from '../user/userSlice';

const StyledVideo = styled.div`
  cursor: pointer;

  position: relative;

  overflow: auto;

  width: 320px;
  height: 220px;

  border: 1px solid #4d4d4d;
  border-radius: 20px;

  @media ${device.mobileL} {
    width: 100%;
  }
`;

interface VideoProps {
  id: number;
  url: string;
}

const Video: React.FC<VideoProps> = ({ id, url }) => {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(user);
  const selectedUsername = useAppSelector(username);

  const src = `//www.youtube.com/embed/${getYoutubeVideoId(url)}`;

  const deleteVideo = () => {
    setShow(true);
  };

  const handleDelete = () => {
    dispatch(deleteVideoById(id));
  };

  const handleClose = () => {
    setShow(false);
  };

  const isMyVideo = () => currentUser.username === selectedUsername;

  return (
    <StyledVideo>
      <YoutubeContainer src={src} />
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
    </StyledVideo>
  );
};

export default Video;
