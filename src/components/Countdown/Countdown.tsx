import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const blick = keyframes`
  from {
    color: #aeaeae;
    background: white;
  }
  to {
    background: #ffffff59;
    color: #c1c1c1;
  }
`;

const StyledCountdown = styled.section`
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  font-size: 12em;

  background: #ffffff59;

  animation: ${blick} 1s infinite;
`;

interface CountdownProps {
  seconds?: number;
  callback?: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ seconds = 3, callback }) => {
  const [count, setCount] = useState(seconds);
  const timerId = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    timerId.current = setInterval(() => {
      setCount((remainder) => remainder - 1);
    }, 1_000);

    return () => {
      clearInterval(timerId.current);
    };
  }, []);

  useEffect(() => {
    if (count <= 0) {
      callback && callback();
      clearInterval(timerId.current);
    }
  }, [count]);

  return (
    <StyledCountdown>
      <span>{count}</span>
    </StyledCountdown>
  );
};

export default Countdown;
