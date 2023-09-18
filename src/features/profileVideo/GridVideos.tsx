import React, { useEffect } from 'react';

import styled from 'styled-components';

import { getVideos, username } from './profileVideo.slice';
import Video from './Video';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { VideoData } from '../../app/types';
import { ItemsNoFound } from '../../components';

const StyledGridVideos = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

interface GridVideosProps {
  videos: VideoData[];
}

const GridVideos: React.FC<GridVideosProps> = ({ videos }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(username);

  useEffect(() => {
    if (user) {
      dispatch(getVideos(user));
    }
  }, [user]);

  if (videos.length === 0) {
    return <ItemsNoFound title={'No Videos Found'} />;
  }

  return (
    <StyledGridVideos>
      {videos.length > 0 &&
        videos.map((videoData) => (
          <Video key={videoData.id} url={videoData.url} id={videoData.id} />
        ))}
    </StyledGridVideos>
  );
};

export default GridVideos;
