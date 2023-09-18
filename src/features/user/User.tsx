import React, { useEffect } from 'react';

import { getUserData } from './userSlice';

import { useAppDispatch } from '../../app/hooks';

const User: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  return null;
};

export default User;
