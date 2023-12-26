import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { Equalizer } from '../../components';

const StyledControls = styled.div`
  position: absolute;
  z-index: 3;
  bottom: 20px;

  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

type VariantButton = 'gray' | 'blue' | 'red';
const StyledButton = styled.div<{ variant?: VariantButton }>`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  color: #7b7b7b;

  background: ${({ variant = 'gray' }) =>
    variant === 'blue' ? '#0050a8' : variant === 'red' ? '#782727' : '#212529'};
  border: 1px solid rgb(123 123 123);
  border: none;
  border-radius: 50%;

  &:hover {
    color: #fff;
    background: ${({ variant = 'gray' }) =>
      variant === 'blue'
        ? '#007bff'
        : variant === 'red'
        ? '#ff005d'
        : '#2c3136'};
  }
`;

interface ControlsProps {
  streams?: MediaStream[];
  remoteVideoRefs?: React.RefObject<HTMLVideoElement>[];
}

const Controls: React.FC<ControlsProps> = ({
  streams = [],
  remoteVideoRefs = [],
}) => {
  const navigate = useNavigate();
  const [microphone, setMicrophone] = useState(true);
  const [speaker, setSpeaker] = useState(true);
  const [camera, setCamera] = useState(true);
  const [showEqualizer, setShowEqualizer] = useState(false);

  const toggleMicrophoneMute = () => {
    streams.forEach((stream) => {
      if (stream) {
        stream.getAudioTracks()[0].enabled =
          !stream?.getAudioTracks()[0]?.enabled;
        setMicrophone(stream.getAudioTracks()[0].enabled);
      }
    });
  };

  const toggleSpeakerMute = () => {
    remoteVideoRefs.forEach((ref) => {
      if (ref && ref.current) {
        ref.current.muted = !ref.current.muted;
        setSpeaker(!ref.current.muted);
      }
    });
  };

  const toggleCameraMute = () => {
    streams.forEach((stream) => {
      if (stream) {
        stream.getVideoTracks()[0].enabled =
          !stream?.getVideoTracks()[0]?.enabled;
        setCamera(stream.getVideoTracks()[0].enabled);
      }
    });
  };

  const hangUp = () => {
    navigate('/rooms');
  };

  const toggleEqualizer = () => {
    setShowEqualizer(!showEqualizer);
  };

  const hideEqualizer = () => {
    setShowEqualizer(false);
  };

  return (
    <StyledControls>
      <StyledButton variant='red' onClick={hangUp}>
        <svg
          fill='currentColor'
          width='24px'
          height='24px'
          viewBox='0 0 32 32'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M29.209 14.391c-3.383-3.375-8.052-5.462-13.208-5.462s-9.825 2.087-13.208 5.462l0-0c-0.941 0.952-1.522 2.261-1.522 3.706 0 1.443 0.58 2.751 1.519 3.703l-0.001-0.001 0.002 0.002c0.204 0.21 0.428 0.398 0.671 0.561l0.015 0.009c0.408 0.299 0.886 0.532 1.402 0.673l0.030 0.007c0.054 0.013 0.116 0.021 0.18 0.021h0c0 0 0.001 0 0.001 0 0.165 0 0.318-0.053 0.441-0.144l-0.002 0.001 5.891-4.277c0.188-0.138 0.309-0.359 0.31-0.607v-0c-0.002-0.797-0.187-1.551-0.515-2.221l0.013 0.030c1.41-0.598 3.050-0.945 4.771-0.945s3.361 0.347 4.854 0.976l-0.082-0.031c-0.316 0.641-0.501 1.394-0.502 2.191v0c0 0.248 0.121 0.469 0.307 0.606l0.002 0.001 5.891 4.277c0.125 0.088 0.28 0.14 0.448 0.14 0.061 0 0.121-0.007 0.179-0.020l-0.005 0.001c0.833-0.248 1.546-0.681 2.121-1.252l-0 0c0.939-0.952 1.519-2.26 1.519-3.703s-0.581-2.753-1.521-3.706l0.001 0.001zM28.146 20.74c-0.147 0.151-0.308 0.285-0.483 0.401l-0.011 0.007c-0.177 0.129-0.378 0.243-0.591 0.334l-0.020 0.008-5.252-3.813c0.076-0.658 0.313-1.249 0.672-1.747l-0.008 0.011c0.086-0.12 0.137-0.27 0.137-0.432 0-0.295-0.17-0.55-0.418-0.672l-0.004-0.002c-1.8-0.901-3.922-1.428-6.167-1.428s-4.367 0.527-6.249 1.465l0.081-0.037c-0.252 0.125-0.421 0.38-0.421 0.675 0 0.161 0.051 0.31 0.137 0.432l-0.002-0.002c0.35 0.488 0.588 1.079 0.662 1.72l0.002 0.017-5.252 3.813c-0.247-0.107-0.46-0.229-0.657-0.372l0.010 0.007c-0.171-0.115-0.32-0.241-0.454-0.38l-0.001-0.001c-0.672-0.68-1.088-1.616-1.088-2.648 0-1.031 0.414-1.965 1.085-2.645l-0 0c3.111-3.104 7.404-5.023 12.146-5.023s9.036 1.919 12.147 5.023l-0-0c0.671 0.68 1.085 1.614 1.085 2.645s-0.414 1.965-1.085 2.645l0-0z'></path>
        </svg>
      </StyledButton>
      <StyledButton variant='blue' onClick={toggleMicrophoneMute}>
        {microphone ? (
          <svg
            width='24px'
            height='24px'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M19 10V12C19 15.866 15.866 19 12 19M5 10V12C5 15.866 8.13401 19 12 19M12 19V22M8 22H16M12 15C10.3431 15 9 13.6569 9 12V5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5V12C15 13.6569 13.6569 15 12 15Z'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        ) : (
          <svg
            width='24px'
            height='24px'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M15 9.4V5C15 3.34315 13.6569 2 12 2C10.8224 2 9.80325 2.67852 9.3122 3.66593M12 19V22M8 22H16M3 3L21 21M5.00043 10C5.00043 10 3.50062 19 12.0401 19C14.51 19 16.1333 18.2471 17.1933 17.1768M19.0317 13C19.2365 11.3477 19 10 19 10M12 15C10.3431 15 9 13.6569 9 12V9L14.1226 14.12C13.5796 14.6637 12.8291 15 12 15Z'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        )}
      </StyledButton>
      <StyledButton variant='blue' onClick={toggleSpeakerMute}>
        {speaker ? (
          <svg
            width='24px'
            height='24px'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M16 9C16.5 9.5 17 10.5 17 12C17 13.5 16.5 14.5 16 15M19 6C20.5 7.5 21 10 21 12C21 14 20.5 16.5 19 18M13 3L7 8H5C3.89543 8 3 8.89543 3 10V14C3 15.1046 3.89543 16 5 16H7L13 21V3Z'
              stroke-width='1.5'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        ) : (
          <svg
            width='24px'
            height='24px'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10.6 5L13 3V8M3 3L21 21M13 18V21L7 16H5C3.89543 16 3 15.1046 3 14V10C3 9.63571 3.09739 9.29417 3.26756 9'
              stroke-width='1.5'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        )}
      </StyledButton>
      <StyledButton variant='blue' onClick={toggleCameraMute}>
        {camera ? (
          <svg
            width='24px'
            height='24px'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M16 10L18.5768 8.45392C19.3699 7.97803 19.7665 7.74009 20.0928 7.77051C20.3773 7.79703 20.6369 7.944 20.806 8.17433C21 8.43848 21 8.90095 21 9.8259V14.1741C21 15.099 21 15.5615 20.806 15.8257C20.6369 16.056 20.3773 16.203 20.0928 16.2295C19.7665 16.2599 19.3699 16.022 18.5768 15.5461L16 14M6.2 18H12.8C13.9201 18 14.4802 18 14.908 17.782C15.2843 17.5903 15.5903 17.2843 15.782 16.908C16 16.4802 16 15.9201 16 14.8V9.2C16 8.0799 16 7.51984 15.782 7.09202C15.5903 6.71569 15.2843 6.40973 14.908 6.21799C14.4802 6 13.9201 6 12.8 6H6.2C5.0799 6 4.51984 6 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3 7.51984 3 8.07989 3 9.2V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18Z'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        ) : (
          <svg
            width='24px'
            height='24px'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M11.65 6H12.8C13.9201 6 14.4802 6 14.908 6.21799C15.2843 6.40973 15.5903 6.71569 15.782 7.09202C16 7.51984 16 8.0799 16 9.2V10L18.5768 8.45392C19.3699 7.97803 19.7665 7.74009 20.0928 7.77051C20.3773 7.79703 20.6369 7.944 20.806 8.17433C21 8.43848 21 8.90095 21 9.8259V14.1741C21 14.679 21 15.0462 20.9684 15.3184M3 3L6.00005 6.00005M21 21L15.9819 15.9819M6.00005 6.00005C5.01167 6.00082 4.49359 6.01337 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3 7.51984 3 8.07989 3 9.2V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18H12.8C13.9201 18 14.4802 18 14.908 17.782C15.2843 17.5903 15.5903 17.2843 15.782 16.908C15.9049 16.6668 15.9585 16.3837 15.9819 15.9819M6.00005 6.00005L15.9819 15.9819'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        )}
      </StyledButton>
      <StyledButton variant='gray' onClick={toggleEqualizer}>
        {showEqualizer ? (
          <svg
            width='24px'
            height='24px'
            viewBox='0 0 1024 1024'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill='currentColor'
              d='M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z'
            />
          </svg>
        ) : (
          <svg
            width='24px'
            height='24px'
            viewBox='0 0 24 24'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M18 3a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4ZM2 7a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2H2ZM2 11a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2H2ZM10 11a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4ZM17 12a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1ZM2 15a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2H2ZM9 16a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1ZM18 15a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4ZM1 20a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1ZM10 19a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4ZM17 20a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1ZM17 8a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1Z' />
          </svg>
        )}
      </StyledButton>

      {showEqualizer && streams && (
        <Equalizer onClose={hideEqualizer} streams={streams} />
      )}
    </StyledControls>
  );
};

export default Controls;
