import React from 'react';

import styled from 'styled-components';

import DateTime from './DateTime';

const StyledDateTimeRange = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  margin-right: 30px;
  padding-right: 10px;
`;

interface DateTimeRangeProps {
  startDate?: Date;
  endDate?: Date;
}

const DateTimeRange: React.FC<DateTimeRangeProps> = ({
  startDate = new Date(),
  endDate = new Date(),
}) => (
  <StyledDateTimeRange>
    <DateTime date={startDate} />
    <span>&mdash;</span>
    <DateTime date={endDate} />
  </StyledDateTimeRange>
);

export default DateTimeRange;
