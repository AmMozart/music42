import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useLangs } from '../../hooks/useLangs';

const StyledDateTimeTablo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  color: #f7f7f7;

  & div {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 70px;
    margin: 5px;
    padding: 0;

    font-family: Roboto, sans-serif;
  }

  & span {
    position: relative;

    display: flex;
    justify-content: center;

    width: 50px;
    height: 50px;
    margin: 0 auto 6px;

    font-size: 19px;
    font-weight: 500;
    line-height: 55px;

    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3e%3cpath fill='%23444' d='M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1' /%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-size: 50px;
  }
`;

interface DateTimeTabloProps {
  date: Date;
}

const DateTimeTablo: React.FC<DateTimeTabloProps> = ({ date }) => {
  const langs = useLangs();
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const ONE_SECOND_MS = 1000;

  const SECOND_MS = 1000;
  const MINUTE_MS = SECOND_MS * 60;
  const HOUR_MS = MINUTE_MS * 60;
  const DAY_MS = HOUR_MS * 24;

  const countDown = new Date(date).getTime();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime(),
        distance = countDown - now;

      if (distance >= 0) {
        setDay(Math.floor(distance / DAY_MS));
        setHour(Math.floor((distance % DAY_MS) / HOUR_MS));
        setMinute(Math.floor((distance % HOUR_MS) / MINUTE_MS));
        setSecond(Math.floor((distance % MINUTE_MS) / SECOND_MS));
      }
    }, ONE_SECOND_MS);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <StyledDateTimeTablo>
      <div>
        <span id='days'>{day}</span>
        {langs('days')}
      </div>
      <div>
        <span id='hours'>{hour}</span>
        {langs('hours')}
      </div>
      <div>
        <span id='minutes'>{minute}</span>
        {langs('minutes')}
      </div>
      <div>
        <span id='seconds'>{second}</span>
        {langs('seconds')}
      </div>
    </StyledDateTimeTablo>
  );
};

export default DateTimeTablo;
