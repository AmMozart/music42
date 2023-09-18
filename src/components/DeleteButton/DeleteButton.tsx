import React from 'react';
import styled from 'styled-components';

const StyledDeleteButton = styled.div`
  cursor: pointer;

  position: absolute;
  z-index: 1;
  top: 5px;
  right: 5px;

  padding: 8px 12px 12px;

  opacity: 0.7;
  border-radius: 10px;

  fill: none;
  stroke: #fff;

  transition: opacity 0.3s ease-out;

  &:hover {
    opacity: 1;
  }
`;

type DeleteButtonProps = React.HTMLAttributes<HTMLDivElement>;

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <StyledDeleteButton onClick={onClick}>
      <svg
        width='35px'
        height='35px'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M10 11V17'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M14 11V17'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M4 7H20'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </svg>
    </StyledDeleteButton>
  );
};

export default DeleteButton;
