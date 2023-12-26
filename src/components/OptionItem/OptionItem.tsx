import React from 'react';
import styled from 'styled-components';

const StyledOptionItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px 15px;

  &:hover {
    background: #000000a6;
  }
`;

interface OptionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  type: 'edit' | 'delete' | 'rotate' | 'download';
}

const OptionItem: React.FC<OptionItemProps> = ({ title, onClick, type }) => {
  let element;

  if (type === 'rotate')
    element = (
      <svg
        width='25px'
        height='25px'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M4.06189 13C4.02104 12.6724 4 12.3387 4 12C4 7.58172 7.58172 4 12 4C14.5006 4 16.7332 5.14727 18.2002 6.94416M19.9381 11C19.979 11.3276 20 11.6613 20 12C20 16.4183 16.4183 20 12 20C9.61061 20 7.46589 18.9525 6 17.2916M9 17H6V17.2916M18.2002 4V6.94416M18.2002 6.94416V6.99993L15.2002 7M6 20V17.2916'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </svg>
    );

  if (type === 'edit')
    element = (
      <svg width='25px' height='25px' viewBox='0 0 24 24'>
        <path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M8.56078 20.2501L20.5608 8.25011L15.7501 3.43945L3.75012 15.4395V20.2501H8.56078ZM15.7501 5.56077L18.4395 8.25011L16.5001 10.1895L13.8108 7.50013L15.7501 5.56077ZM12.7501 8.56079L15.4395 11.2501L7.93946 18.7501H5.25012L5.25012 16.0608L12.7501 8.56079Z'
        />
      </svg>
    );

  if (type === 'delete')
    element = (
      <svg width='25px' height='25px' viewBox='0 0 24 24' fill='none'>
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
    );

  if (type === 'download')
    element = (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        width='24'
        height='24'
      >
        <path
          fill='currentColor'
          d='M13 10h5l-6 6-6-6h5V3h2v7zm-9 9h16v-7h2v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-8h2v7z'
        ></path>
      </svg>
    );

  return (
    <StyledOptionItem onClick={onClick}>
      {element} {title}
    </StyledOptionItem>
  );
};

export default OptionItem;
