import React, { useEffect } from 'react';

import { getConfig } from './configSlice';

import { useAppDispatch } from '../../app/hooks';

const Config: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getConfig());
  }, []);

  return null;
};

export default Config;
