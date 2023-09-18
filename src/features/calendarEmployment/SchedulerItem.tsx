import React from 'react';

import styled from 'styled-components';

import { CalendarEmploymentData } from './calendarSlice';

import DateTimeRange from './DateRange';

import Description from './Description';

import { device } from '../../device';

const StyledSchedulerItem = styled.div`
  margin-left: 10px;
  padding: 10px;
  font-size: 20px;
  border-left: 1px solid;

  @media ${device.laptop} {
    margin-left: 100px;
  }
`;

interface SchedulerItemProps {
  calendarEmploymentData: CalendarEmploymentData;
}

const SchedulerItem: React.FC<SchedulerItemProps> = ({
  calendarEmploymentData,
}) => (
  <StyledSchedulerItem>
    <DateTimeRange
      startDate={new Date(calendarEmploymentData.startDate)}
      endDate={new Date(calendarEmploymentData.endDate)}
    />
    <Description
      venueName={calendarEmploymentData.eventVenueName}
      eventName={calendarEmploymentData.eventName}
    />
  </StyledSchedulerItem>
);

export default SchedulerItem;
