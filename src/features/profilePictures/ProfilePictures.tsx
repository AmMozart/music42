import React, { useEffect } from 'react';

import CarouselPictures from './CarouselPictures';
import GridPictures from './GridPictures';

import {
  addFetchState,
  addPictureToCollection,
  breakProfile,
  files,
  loadMoreFetchState,
  loadMorePictures,
  pictures,
  setFiles,
  setUsername,
  showCarousel,
  username,
} from './profilePictures.slice';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AddFileButton, LoadMore } from '../../components';
import { user } from '../user/userSlice';

const ProfilePictures: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(user);
  const selectedUsername = useAppSelector(username);
  const currentFiles = useAppSelector(files);
  const isShowCarousel = useAppSelector(showCarousel);
  const userPictures = useAppSelector(pictures);
  const loadMorePictureFetchState = useAppSelector(loadMoreFetchState);
  const addPictureFetchState = useAppSelector(addFetchState);

  useEffect(() => {
    const username = location.pathname.split('/')[1];
    dispatch(setUsername(username));
    return () => {
      dispatch(breakProfile());
    };
  }, []);

  useEffect(() => {
    if (currentFiles) {
      dispatch(addPictureToCollection(currentFiles));
    }
  }, [currentFiles]);

  const isMyVideo = () => currentUser.username === selectedUsername;

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.currentTarget.files?.length) {
      dispatch(setFiles(e.currentTarget.files));
    }
  };

  const handleLoadMore = () => {
    const minId = Math.min(...userPictures.map((val) => val.id));
    if (selectedUsername) {
      dispatch(loadMorePictures({ minId, username: selectedUsername }));
    }
  };

  const loadMoreTitle =
    loadMorePictureFetchState === 'idle'
      ? 'Load More'
      : loadMorePictureFetchState === 'loading'
      ? 'Please Wait'
      : loadMorePictureFetchState === 'success'
      ? 'No More Found'
      : 'Try Again';

  const addTitle =
    addPictureFetchState === 'idle'
      ? 'Add Picture'
      : addPictureFetchState === 'loading'
      ? 'Please Wait'
      : addPictureFetchState === 'success'
      ? 'Try Again'
      : 'Try Again';

  return (
    <>
      {isMyVideo() && (
        <AddFileButton
          title={addTitle}
          onChange={changeHandler}
          disabled={addPictureFetchState === 'loading'}
        />
      )}
      <GridPictures pictures={userPictures} />

      <LoadMore title={loadMoreTitle} onClick={handleLoadMore} />
      {isShowCarousel && <CarouselPictures />}
    </>
  );
};

export default ProfilePictures;
