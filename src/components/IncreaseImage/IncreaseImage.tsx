import React from 'react';

import styled from 'styled-components';

const StyledIncreaseImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  opacity: 0;

  stroke: #ffffff87;

  transition: opacity 0.3s ease-out;

  &:hover {
    opacity: 1;
  }
`;

type IncreaseImageProps = React.HTMLAttributes<HTMLDivElement>;

const IncreaseImage: React.FC<IncreaseImageProps> = ({ onClick }) => {
  return (
    <StyledIncreaseImage onClick={onClick}>
      <svg
        width='50px'
        height='50px'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M9 15L2 22M2 22H7.85714M2 22V16.1429'
          stroke-width='1.5'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M15 9L22 2M22 2H16.1429M22 2V7.85714'
          stroke-width='1.5'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </svg>
    </StyledIncreaseImage>
  );
};

export default IncreaseImage;
