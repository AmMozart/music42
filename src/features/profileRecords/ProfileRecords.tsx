import React, { useEffect } from 'react';

import GridRecords from './GridRecords';
import {
  getRecords,
  loadMoreFetchState,
  loadMoreRecords,
  records,
  setUsername,
  username,
} from './profileRecords.slice';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { LoadMore } from '../../components';
import { useLangs } from '../../hooks/useLangs';
import { user } from '../user/userSlice';

const ProfileRecords: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(user);
  const userRecords = useAppSelector(records);
  const loadMoreRecordsFetchState = useAppSelector(loadMoreFetchState);
  const langs = useLangs();
  const selectedUsername = useAppSelector(username);

  useEffect(() => {
    const username = location.pathname.split('/')[1];
    dispatch(getRecords(username));
    dispatch(setUsername(username));

    return () => {
      // dispatch(breakProfile());
    };
  }, []);

  const handleLoadMore = () => {
    let minId = 1;
    if (userRecords.length) {
      minId = Math.min(...userRecords.map((val) => val.id));
    }
    if (selectedUsername) {
      dispatch(loadMoreRecords({ minId, username: selectedUsername }));
    }
  };

  const loadMoreTitle =
    loadMoreRecordsFetchState === 'idle'
      ? langs('Load More')
      : loadMoreRecordsFetchState === 'loading'
      ? langs('Please Wait')
      : loadMoreRecordsFetchState === 'success'
      ? langs('No More Found')
      : langs('Try Again');

  return (
    <>
      <GridRecords records={userRecords} />
      <LoadMore title={loadMoreTitle} onClick={handleLoadMore} />
    </>
  );
};

export default ProfileRecords;
