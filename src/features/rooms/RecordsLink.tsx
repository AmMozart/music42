import React from 'react';

import styled from 'styled-components';

import { device } from '../../device';
import { useLangs } from '../../hooks/useLangs';

const StyledRecordsLink = styled.div`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 120px;
  height: 50px;
  margin: 10px;
  padding: 0 20px;

  background: rgb(32 32 32);
  border-radius: 10px;

  &:hover {
    color: white;
    background: #272727;
  }

  & svg {
    margin-right: 10px;
  }

  @media ${device.mobileL} {
    min-width: 80px;

    & span {
      display: none;
    }

    & svg {
      margin-right: 0;
    }
  }
`;

interface RecordsLinkProps {
  onClick: () => void;
}

const RecordsLink: React.FC<RecordsLinkProps> = ({ onClick }) => {
  const langs = useLangs();

  return (
    <StyledRecordsLink onClick={onClick}>
      <svg
        width='24px'
        height='24px'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M22 12C22 14.2091 20.2091 16 18 16C15.7909 16 14 14.2091 14 12C14 9.79086 15.7909 8 18 8C20.2091 8 22 9.79086 22 12Z'
          stroke-width='1.5'
        />
        <path
          d='M10 12C10 14.2091 8.20914 16 6 16C3.79086 16 2 14.2091 2 12C2 9.79086 3.79086 8 6 8C8.20914 8 10 9.79086 10 12Z'
          stroke-width='1.5'
        />
        <path d='M6 16H18' stroke-width='1.5' stroke-linecap='round' />
      </svg>
      <span>{langs('Go to records')}</span>
    </StyledRecordsLink>
  );
};

export default React.memo(RecordsLink);
