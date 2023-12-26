import React, { forwardRef } from 'react';

import styled from 'styled-components';

import { formatTime } from '../../utils/formatTime';

const StyledRecordTimer = styled.div`
  font-size: 2em;
`;

interface RecordTimerProps {
  time: number;
  limitTime?: number;
}

const LIMIT_TIME_SEC = 300;

const RecordTimer = (
  { time, limitTime = LIMIT_TIME_SEC }: RecordTimerProps,
  ref: React.Ref<HTMLSpanElement>
) => {
  return (
    <StyledRecordTimer>
      <span ref={ref}>{formatTime(time)}</span> / {formatTime(limitTime)}
    </StyledRecordTimer>
  );
};

export default forwardRef(RecordTimer);
