import React from 'react';

import styled from 'styled-components';

import { getFilesByRoomId } from './fileExplorer.slice';

import { useAppDispatch } from '../../app/hooks';
import { useLangs } from '../../hooks/useLangs';

const StyledNavigation = styled.section`
  user-select: none;
  font-size: 0.5em;
`;

const StyledBack = styled.div`
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 60px;
  height: 60px;

  background: #151515;
  border-radius: 50%;

  transition: background 0.3s linear;

  &:hover {
    background: #22313f;
  }
`;

interface NavigationProps {
  roomId: number;
  currentFolderId: number;
}

const Navigation: React.FC<NavigationProps> = ({ roomId }) => {
  const dispatch = useAppDispatch();
  const langs = useLangs();

  // const openFolder = () => {};
  const goBack = () => {
    dispatch(getFilesByRoomId(roomId));
  };

  return (
    <StyledNavigation>
      <StyledBack onClick={goBack}>
        <svg
          width='35px'
          height='35px'
          viewBox='0 0 32 32'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g id='icomoon-ignore'></g>
          <path
            d='M14.389 7.956v4.374l1.056 0.010c7.335 0.071 11.466 3.333 12.543 9.944-4.029-4.661-8.675-4.663-12.532-4.664h-1.067v4.337l-9.884-7.001 9.884-7zM15.456 5.893l-12.795 9.063 12.795 9.063v-5.332c5.121 0.002 9.869 0.26 13.884 7.42 0-4.547-0.751-14.706-13.884-14.833v-5.381z'
            fill='currentColor'
          ></path>
        </svg>
        <span>{langs('Back')}</span>
      </StyledBack>
    </StyledNavigation>
  );
};

export default React.memo(Navigation);
