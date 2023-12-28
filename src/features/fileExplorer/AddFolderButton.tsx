import React from 'react';

import styled from 'styled-components';

const StyledAddFolderButton = styled.button`
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

  &:hover {
    color: #fff;
    background: #353535;
  }
`;

interface AddButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  title: string;
}

const AddFolderButton: React.FC<AddButtonProps> = ({ title, ...props }) => {
  return (
    <StyledAddFolderButton {...props}>
      <svg
        width='32px'
        height='32px'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M9 13H15M12 10V16M12.0627 6.06274L11.9373 5.93726C11.5914 5.59135 11.4184 5.4184 11.2166 5.29472C11.0376 5.18506 10.8425 5.10425 10.6385 5.05526C10.4083 5 10.1637 5 9.67452 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V10.2C21 9.0799 21 8.51984 20.782 8.09202C20.5903 7.71569 20.2843 7.40973 19.908 7.21799C19.4802 7 18.9201 7 17.8 7H14.3255C13.8363 7 13.5917 7 13.3615 6.94474C13.1575 6.89575 12.9624 6.81494 12.7834 6.70528C12.5816 6.5816 12.4086 6.40865 12.0627 6.06274Z'
          stroke='#10ce92'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </svg>
      {title}
    </StyledAddFolderButton>
  );
};

export default React.memo(AddFolderButton);
