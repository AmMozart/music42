import React, { useState } from 'react';

import styled from 'styled-components';

import { deleteVideoById } from './podcasts.slice';
import YoutubeContainer from './YoutubeContainer';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DeleteButton, Modal } from '../../components';
import { device } from '../../device';
import { getYoutubeVideoId } from '../../utils/getYoutubeVideoId';
import { user } from '../user/userSlice';

const StyledVideo = styled.div`
  position: relative;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 380px;
  height: 300px;

  color: #d2d2d2;

  background: #161616;
  border-radius: 10px;

  & .title {
    margin: auto;
    padding: 30px 0;

    font: normal 400 22px/1.2em Arial, sans-serif;
    color: #fff;
    text-align: center;
  }

  @media ${device.mobileL} {
    width: 100%;
  }
`;

interface VideoProps {
  id: number;
  url: string;
  title: string;
}

const Video: React.FC<VideoProps> = ({ id, url, title }) => {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(user);

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

  return (
    <StyledVideo>
      <YoutubeContainer src={src} />
      <h4 className='title'>{title}</h4>
      {currentUser.admin > 0 && <DeleteButton onClick={deleteVideo} />}
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
