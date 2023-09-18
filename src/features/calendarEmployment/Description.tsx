import React from 'react';

import styled from 'styled-components';

const StyledDescription = styled.div`
  & span {
    color: var(--info);
  }
`;

interface DescriptionProps {
  venueName: string;
  eventName: string;
}

const Description: React.FC<DescriptionProps> = ({ venueName, eventName }) => (
  <StyledDescription>
    Performance on the venue "<span>{venueName}</span>" at the event "
    <span>{eventName}</span>"
  </StyledDescription>
);

export default Description;
