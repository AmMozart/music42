import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { keyframes } from 'styled-components';

const rotating = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledLoader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  color: #23313a;

  & .loader {
    animation: ${rotating} 1s linear infinite;
  }
`;

interface LoaderProps {
  title?: string;
}

const Loader: React.FC<LoaderProps> = ({ title = '' }) => (
  <StyledLoader>
    <h2>{title}</h2>
    <FontAwesomeIcon className={'loader'} icon={faRotate} size={'4x'} />
  </StyledLoader>
);

export default Loader;
