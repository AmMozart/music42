import React from 'react';

import styled from 'styled-components';

const StyledLoadMore = styled.div`
  cursor: pointer;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-evenly;

  width: 220px;
  height: auto;
  margin: 20px auto;

  font: normal normal 500 18px/50px Montserrat, sans-serif;
  color: #dadada;

  background: #161616;
  border-radius: 8px;
  box-shadow: 0 0 15px rgb(0 0 0 / 7%);

  transition: all 0.15s;

  &:hover {
    background: #1d1d1d;
    box-shadow: 0 4px 8px rgb(0 0 0 / 10%);
  }
`;

interface LoadMoreProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

const LoadMore: React.FC<LoadMoreProps> = ({ title, ...props }) => {
  return (
    <StyledLoadMore {...props}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
      >
        <path
          fill='#10ce92'
          d='M13,9L15.5,6.5L16.92,7.92L12,12.84L7.08,7.92L8.5,6.5L11,9V3H13V9M3,15H21V17H3V15M3,19H13V21H3V19Z'
        />
      </svg>
      {title}
    </StyledLoadMore>
  );
};

export default LoadMore;
