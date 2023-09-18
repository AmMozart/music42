import React, { useEffect } from 'react';

import GridVideos from './GridVideos';
import {
  breakProfile,
  changeLink,
  isInputOpen,
  link,
  loadMoreFetchState,
  loadMoreVideos,
  postVideoLink,
  setIsInputOpen,
  setUsername,
  username,
  videos,
} from './profileVideo.slice';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AddButton, LoadMore, ModalInput } from '../../components';
import { user } from '../user/userSlice';

const ProfileVideo: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(user);
  const selectedUsername = useAppSelector(username);
  const isShowInputText = useAppSelector(isInputOpen);
  const videoLink = useAppSelector(link);
  const userVideos = useAppSelector(videos);
  const loadMoreVideoFetchState = useAppSelector(loadMoreFetchState);

  useEffect(() => {
    const username = location.pathname.split('/')[1];
    // dispatch(getVideos(username));
    dispatch(setUsername(username));

    return () => {
      dispatch(breakProfile());
    };
  }, []);

  const openFilesExplorer = () => {
    dispatch(setIsInputOpen(!isShowInputText));
  };

  const setLink: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(changeLink(e.currentTarget.value));
  };

  const handleModalButtonClick = () => {
    addVideo();
    closeModalInput();
    clearModalInput();
  };

  const addVideo = () => dispatch(postVideoLink(videoLink));
  const closeModalInput = () => dispatch(setIsInputOpen(false));
  const clearModalInput = () => dispatch(changeLink(''));
  const isMyVideo = () => currentUser.username === selectedUsername;

  const handleLoadMore = () => {
    const minId = Math.min(...userVideos.map((val) => val.id));
    if (selectedUsername) {
      dispatch(loadMoreVideos({ minId, username: selectedUsername }));
    }
  };

  const loadMoreTitle =
    loadMoreVideoFetchState === 'idle'
      ? 'Load More'
      : loadMoreVideoFetchState === 'loading'
      ? 'Please Wait'
      : loadMoreVideoFetchState === 'success'
      ? 'No More Found'
      : 'Try Again';

  return (
    <>
      {isMyVideo() && (
        <AddButton
          title={isShowInputText ? 'Hide' : 'Add Video'}
          onClick={openFilesExplorer}
        />
      )}
      {isShowInputText && (
        <ModalInput
          inputTitle={'Enter Youtube Link'}
          buttonTitle={'Add Video'}
          onClick={handleModalButtonClick}
          onChange={setLink}
          value={videoLink}
        />
      )}
      <GridVideos videos={userVideos} />
      <LoadMore title={loadMoreTitle} onClick={handleLoadMore} />
    </>
  );
};

export default ProfileVideo;
