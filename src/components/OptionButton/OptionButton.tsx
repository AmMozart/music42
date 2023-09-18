import React from 'react';
import styled from 'styled-components';

const StyledOptionButton = styled.div`
  cursor: pointer;

  position: absolute;
  z-index: 1;
  top: 5px;
  right: 5px;
  transform: rotate(90deg);

  padding: 10px;

  opacity: 0.7;
  background-color: #00000040;
  border-radius: 50%;

  fill: none;
  stroke: #fff;

  transition: opacity 0.3s ease-out;

  &:hover {
    opacity: 1;
  }
`;

type OptionButtonProps = React.HTMLAttributes<HTMLDivElement>;

const OptionButton: React.FC<OptionButtonProps> = ({ onClick }) => {
  return (
    <StyledOptionButton onClick={onClick}>
      <svg width='24' height='24' viewBox='0 0 24 24'>
        <path
          fill='currentColor'
          d='M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z'
        ></path>
      </svg>
    </StyledOptionButton>
  );
};

export default OptionButton;
