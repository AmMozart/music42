import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import styled, { css } from 'styled-components';

import Controls from './Controls';
import Recorder from './Recorder';

import {
  getRoomById,
  leaveRoom,
  roomsActions,
  successMessage,
} from './rooms.slice';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Message } from '../../components';
import { device } from '../../device';
import { useMedia } from '../../hooks/useMedia';
import { useWebRTC } from '../../hooks/useWebRTC';
import FileExplorer from '../fileExplorer/FileExplorer';

const StyledRoom = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  width: 100%;
  min-height: 90vh;
  margin-top: -35px;
`;

const StyledVideoContainer = styled.div`
  position: relative;

  display: flex;
  flex-flow: row wrap;
  gap: 5px;
  align-items: center;
  justify-content: center;

  width: 100%;

  @media ${device.mobileL} {
    flex-direction: column;
  }
`;

const StyledVideo = styled.div<{
  show?: boolean;
  isOnePeople?: boolean;
  self: boolean;
}>`
  position: relative;

  display: ${({ show = true }) => (show ? 'flex' : 'none')};
  justify-content: center;

  ${({ isOnePeople = false }) =>
    isOnePeople
      ? css`
          width: calc(100% - 8px);
        `
      : css`
          width: calc(50% - 4px);
        `};

  z-index: ${({ self }) => (self ? 3 : 2)};

  max-height: 74vh;

  & video {
    width: 100%;
    border-radius: 10px;
  }

  & .statusConnection {
    position: absolute;
    top: 0;
    right: 5px;
  }

  & .errorConnection {
    color: #9c1d1d;
  }

  @media ${device.mobileL} {
    width: calc(100% - 8px);

    ${({ isOnePeople = false, self }) =>
      isOnePeople
        ? css``
        : self
        ? css`
            position: absolute;
            right: 5px;
            bottom: 5px;

            max-width: 120px;
            max-height: 130px;
          `
        : ''};
  }
`;

const Room: React.FC = () => {
  const { id = 0 } = useParams();
  const dispatch = useAppDispatch();
  const message = useAppSelector(successMessage);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const {
    error: mediaError,
    localVideoRef,
    startLocalVideo,
    stream,
  } = useMedia();
  const { error, status, latency, peers } = useWebRTC(+id);

  useEffect(() => {
    startLocalVideo().then(() => {
      dispatch(getRoomById(+id));
    });
    return () => {
      dispatch(leaveRoom(+id));
    };
  }, []);

  useEffect(() => {
    if (message) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      setTimeout(() => dispatch(roomsActions.setSuccessMessage('')), 5_000);
    }
  }, [message]);

  const isOnePeople = () =>
    peers[0]?.rtcPeerConnection.connectionState === 'new' ||
    !peers[0]?.rtcPeerConnection.connectionState;

  useEffect(() => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = peers[0]?.stream || null;
    }
  }, [peers]);

  return (
    <StyledRoom>
      {message && <Message value={message} type='success' />}
      <StyledVideoContainer>
        <StyledVideo show={true} isOnePeople={isOnePeople()} self={true}>
          <video ref={localVideoRef} autoPlay playsInline muted />
        </StyledVideo>

        <StyledVideo show={!isOnePeople()} self={false}>
          <div className='statusConnection' title={status}>
            <span>{latency} ms </span>
            <svg
              width='10px'
              height='10px'
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle
                cx='6'
                cy='6'
                r='6'
                fill={
                  status == 'connected'
                    ? '#35ed02'
                    : status == 'connecting'
                    ? '#ffa600'
                    : '#ff0000'
                }
              />
            </svg>
          </div>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            poster='/themes/volcano/img/user.svg'
          />
        </StyledVideo>

        <Controls
          streams={stream && [stream]}
          remoteVideoRefs={[remoteVideoRef]}
        />
      </StyledVideoContainer>
      {mediaError && <div className='errorConnection'>{mediaError}</div>}
      {error && <div className='errorConnection'>{error}</div>}
      {stream && <Recorder stream={stream} />}
      <FileExplorer roomId={+id} />
    </StyledRoom>
  );
};

export default Room;
