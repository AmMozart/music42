import React from 'react';

import styled from 'styled-components';

import { getDateString } from '../../utils/getDateString';
import { getTimeString } from '../../utils/getTimeString';

const StyledDateTime = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;

  & .date {
    font-size: 0.8em;
    color: var(--white);
  }

  & .time {
    display: inline;
    font-size: 1.4em;
    color: var(--white);
  }
`;

interface DateTimeProps {
  date?: Date;
}

const DateTime: React.FC<DateTimeProps> = ({ date = new Date() }) => (
  <StyledDateTime>
    <span className={'date'}>{getDateString(date)}</span>
    <span className={'time'}>{getTimeString(date)}</span>
  </StyledDateTime>
);

export default DateTime;
