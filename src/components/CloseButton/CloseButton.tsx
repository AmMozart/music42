import React from 'react';

import styled from 'styled-components';

import { device } from '../../device';

const StyledCloseButton = styled.div`
  cursor: pointer;

  position: absolute;
  z-index: 3;
  top: 0;
  right: 0;

  width: 80px;
  height: 80px;
  margin: 10px;
  padding: 10px;

  fill: #ffffff8a;

  &:hover {
    fill: #fffd;
  }

  @media ${device.mobileL} {
    width: 50px;
    height: 50px;
    padding: 0;
  }
`;

type CloseButtonProps = React.HTMLAttributes<HTMLDivElement>;

const CloseButton: React.FC<CloseButtonProps> = ({ ...props }) => {
  return (
    <StyledCloseButton {...props}>
      <svg
        width='100%'
        height='100%'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z'
        />
      </svg>
    </StyledCloseButton>
  );
};

export default CloseButton;
