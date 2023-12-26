import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import GridRecords from '../profileRecords/GridRecords';
import {
  getRecordsByRoomId,
  setUsername,
} from '../profileRecords/profileRecords.slice';

interface RecordsProps {
  roomId: number;
}

const Records: React.FC<RecordsProps> = ({ roomId }) => {
  const dispatch = useAppDispatch();
  const records = useAppSelector((state) => state.profileRecords.records);
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(setUsername(user.username));

    let timerId: ReturnType<typeof setInterval> | null = null;
    if (user.username) {
      dispatch(getRecordsByRoomId(roomId));
      timerId = setInterval(() => {
        dispatch(getRecordsByRoomId(roomId));
      }, 10_000);
    }

    return () => {
      timerId && clearInterval(timerId);
    };
  }, [user]);

  return <GridRecords records={records} />;
};

export default React.memo(Records);
