import React from 'react';

import styled from 'styled-components';

const StyledYoutubeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  &:hover {
    opacity: 0.8;
    background: #00000080;
  }
`;

interface YoutubeContainerProps {
  src: string;
}

const YoutubeContainer: React.FC<YoutubeContainerProps> = ({ src }) => (
  <StyledYoutubeContainer>
    <iframe
      width='100%'
      height='100%'
      src={src}
      frameBorder='0'
      allowFullScreen
    ></iframe>
  </StyledYoutubeContainer>
);

export default YoutubeContainer;
