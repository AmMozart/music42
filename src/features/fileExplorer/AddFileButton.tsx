import React, { useRef } from 'react';

import styled, { css } from 'styled-components';

const StyledAddButton = styled.button<{ disabled: boolean }>`
  cursor: pointer;
  user-select: none;

  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-evenly;

  padding: 0 20px;

  font: normal normal 500 18px/50px Montserrat, sans-serif;
  color: #dadada;

  background: #161616;
  border: none;
  border-radius: 8px;
  box-shadow: 0 0 15px rgb(0 0 0 / 7%);

  transition: all 0.15s;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.3;
    `}

  &:hover {
    color: ${({ disabled }) => (disabled ? 'inherit' : '#ffffff')};
    background: ${({ disabled }) => (disabled ? 'inherit' : '#353535')};
  }
`;

interface AddFileButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  disabled?: boolean;
}

const AddFileButton: React.FC<AddFileButtonProps> = ({
  title,
  disabled = false,
  onChange,
  ...props
}) => {
  const refInputFile = useRef<HTMLInputElement>(null);

  const showFileExplorer: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (refInputFile.current && e.currentTarget === e.target) {
      refInputFile.current.click();
    }
  };

  return (
    <StyledAddButton onClick={showFileExplorer} disabled={disabled}>
      <svg
        width='20px'
        height='20px'
        viewBox='0 0 45.402 45.402'
        fill='#10ce92'
      >
        <g>
          <path
            d='M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141
              c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27
              c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435
              c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z'
          />
        </g>
      </svg>
      {title}
      <input
        ref={refInputFile}
        type='file'
        // multiple
        className='hidden'
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
    </StyledAddButton>
  );
};

export default AddFileButton;
