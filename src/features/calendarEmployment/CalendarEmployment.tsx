import React, { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';

import 'flatpickr/dist/themes/dark.css';
import styled from 'styled-components';

import {
  CalendarEmploymentData,
  calendarEmploymentData,
  fetchData,
} from './calendarSlice';

import SchedulerItem from './SchedulerItem';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { isInRangeDate } from '../../utils/isInRangeDate';

const StyledCalendarEmployment = styled.div`
  & .calendar {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  & .empty-scheduler {
    display: flex;
    justify-content: center;
    padding-top: 20px;
    font-size: 20px;
  }

  & .flatpickr-input {
    display: none;
  }

  & .work-day::after {
    content: '';

    position: absolute;
    bottom: 5px;
    left: 9px;

    width: 50%;
    height: 20px;

    border-bottom: 2px solid #00ff12;
  }
`;

const CalendarEmployment: React.FC = () => {
  const calendarData = useAppSelector(calendarEmploymentData);
  const dispatch = useAppDispatch();

  const [date, setDate] = useState(new Date());
  const [employmentList, setEmploymentList] = useState<
    CalendarEmploymentData[]
  >([]);
  const [nextPerformancesList, setNextPerformancesList] = useState<
    CalendarEmploymentData[]
  >([]);

  const setWorkDayMark = () => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const days = document.querySelectorAll('.flatpickr-day');
    days.forEach((item) => {
      const itemDate = item.getAttribute('aria-label');
      calendarData.forEach((date) => {
        const currentDate = `${
          monthNames[new Date(date.startDate).getMonth()]
        } ${new Date(date.startDate).getDate()}, ${new Date(
          date.startDate
        ).getFullYear()}`;

        if (itemDate === currentDate) {
          item.classList.add('work-day');
        }
      });
    });
  };

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  useEffect(() => {
    setWorkDayMark();
  });

  useEffect(() => {
    if (calendarData) {
      const employmentList = calendarData.filter((value) => {
        const startDate = new Date(value.startDate);
        const endDate = new Date(value.endDate);
        return isInRangeDate(date, startDate, endDate);
      });

      setEmploymentList(employmentList);
    }
  }, [date, calendarData]);

  useEffect(() => {
    const nextPerformancesList = calendarData.filter((value) => {
      const endDate = new Date(value.endDate);

      return (
        endDate.getFullYear() >= date.getFullYear() &&
        endDate.getMonth() >= date.getMonth() &&
        endDate.getDate() >= date.getDate()
      );
    });

    setNextPerformancesList(nextPerformancesList);
  }, [calendarData]);

  return (
    <StyledCalendarEmployment>
      <div className={'calendar'}>
        <Flatpickr
          options={{ inline: true }}
          value={date}
          onChange={([date]) => {
            setDate(date);
          }}
          onMonthChange={setWorkDayMark}
          onYearChange={setWorkDayMark}
        />
      </div>
      {employmentList.length > 0 ? (
        employmentList.map((data) => (
          <>
            <SchedulerItem key={data.startDate} calendarEmploymentData={data} />
            <hr />
          </>
        ))
      ) : (
        <span className={'empty-scheduler'}>No shows today</span>
      )}
      {nextPerformancesList.length > 0 && (
        <span className={'empty-scheduler mt-5'}>Next Performances:</span>
      )}
      {nextPerformancesList.length > 0 &&
        nextPerformancesList.map((data) => (
          <>
            <SchedulerItem key={data.startDate} calendarEmploymentData={data} />
            <hr />
          </>
        ))}
    </StyledCalendarEmployment>
  );
};

export default CalendarEmployment;
