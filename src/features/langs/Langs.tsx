import React, { useEffect } from 'react';

import { getLangs } from './langs.slice';

import { useAppDispatch } from '../../app/hooks';

const Langs: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLangs());
  }, []);

  return null;
};

export default Langs;
