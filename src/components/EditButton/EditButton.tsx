import React from 'react';
import styled from 'styled-components';

const StyledEditButton = styled.div`
  cursor: pointer;

  position: absolute;
  z-index: 1;
  top: 60px;
  right: 5px;

  padding: 8px 12px 12px;

  opacity: 0.7;
  border-radius: 10px;

  fill: #fff;
  stroke: #fff;

  transition: opacity 0.3s ease-out;

  &:hover {
    opacity: 1;
  }
`;

type EditButtonProps = React.HTMLAttributes<HTMLDivElement>;

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <StyledEditButton onClick={onClick}>
      <svg
        width='35px'
        height='35px'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M8.56078 20.2501L20.5608 8.25011L15.7501 3.43945L3.75012 15.4395V20.2501H8.56078ZM15.7501 5.56077L18.4395 8.25011L16.5001 10.1895L13.8108 7.50013L15.7501 5.56077ZM12.7501 8.56079L15.4395 11.2501L7.93946 18.7501H5.25012L5.25012 16.0608L12.7501 8.56079Z'
        />
      </svg>
    </StyledEditButton>
  );
};

export default EditButton;
