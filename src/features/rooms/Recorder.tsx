import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from 'react-bootstrap';
import styled from 'styled-components';

import { MAX_RECORD_TIME_SEC } from './config';
import People from './People';
import RecordsLink from './RecordsLink';
import RecordTimer from './RecordTimer';
import {
  currentRoom,
  fetchTrack,
  isRecording,
  isSavingRecord,
  isUploadingRecord,
  peerConnections,
  roomsActions,
} from './rooms.slice';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Countdown, Loader } from '../../components';
import { Modal } from '../../components/UI';
import { useLangs } from '../../hooks/useLangs';
import { user } from '../user/userSlice';

const StyledRecorder = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledButtons = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledButton = styled.button<{ variant: 'rec' | 'stop' }>`
  cursor: pointer;

  width: 120px;
  height: 50px;
  max-height: 400px;
  margin: 10px;

  color: #efefef;
  text-transform: uppercase;

  background: ${({ variant }) => (variant === 'rec' ? '#7d0303' : '#007697')};
  border: none;
  border-radius: 10px;
`;

const StyledModalContent = styled.section`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;

  & button {
    width: 100px;
    height: 50px;

    color: white;

    background: green;
    border: none;
    border-radius: 10px;
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

interface RecorderProps {
  stream: MediaStream;
  onClickGoToRecords: () => void;
}

const Recorder: React.FC<RecorderProps> = ({ stream, onClickGoToRecords }) => {
  const dispatch = useAppDispatch();
  const langs = useLangs();
  const [showCountdown, setShowCountdown] = useState(false);
  const [isRec, setIsRec] = useState(false);
  const chunks = useRef<Blob[]>([]);
  const mediaRecorder = useRef<MediaRecorder>();
  const timerRef = useRef(null);
  const timerId = useRef<ReturnType<typeof setInterval>>();
  const [time, setTime] = useState(0);
  const currentUser = useAppSelector(user);
  const room = useAppSelector(currentRoom);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const peers = useAppSelector(peerConnections);
  const isRecordingBegin = useAppSelector(isRecording);
  const isUploading = useAppSelector(isUploadingRecord);
  const saving = useAppSelector(isSavingRecord);

  useEffect(() => {
    return () => {
      clearInterval(timerId.current);
    };
  }, []);

  useEffect(() => {
    if (time >= MAX_RECORD_TIME_SEC) {
      stop();
      setShowConfirm(true);
    }
  }, [time]);

  useEffect(() => {
    if (isRecordingBegin) {
      setShowCountdown(true);
    } else {
      stop();
      saveRecord();
    }
  }, [isRecordingBegin]);

  useEffect(() => {
    if (saving) {
      saveRecord();
      dispatch(roomsActions.breakSavingRecord());
    }
  }, [saving]);

  const record = () => {
    if (isGuest()) {
      return setShowModal(true);
    }

    if (peers) {
      if (
        (peers[0]?.rtcPeerConnection as any)?.dataChannel?.readyState === 'open'
      ) {
        (peers[0]?.rtcPeerConnection as any)?.dataChannel?.send('start rec');
      }
    }
    setShowCountdown(true);
  };

  const stop = () => {
    if (isRec) {
      if (peers) {
        if (
          (peers[0]?.rtcPeerConnection as any)?.dataChannel?.readyState ===
          'open'
        ) {
          (peers[0]?.rtcPeerConnection as any)?.dataChannel?.send('stop rec');
        }
      }
      setIsRec(false);
      clearInterval(timerId.current);
      mediaRecorder.current?.stop();
    }
  };

  const startRecord = useCallback(() => {
    setShowCountdown(false);
    setIsRec(true);
    startTimer();

    chunks.current = [];
    const options = {
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 1280000,
      // mimeType: 'video/x-matroska',
    };

    mediaRecorder.current = new MediaRecorder(stream, options);
    mediaRecorder.current.start();

    mediaRecorder.current.ondataavailable = (e) => {
      chunks.current.push(e.data);
    };

    mediaRecorder.current.onstop = () => {
      console.log('stop record');
    };

    mediaRecorder.current.onerror = (e) => {
      alert(e);
    };
  }, [peers, room]);

  const saveRecord = () => {
    if (!chunks.current.length) {
      return;
    }

    if (peers) {
      if (
        (peers[0]?.rtcPeerConnection as any)?.dataChannel?.readyState === 'open'
      ) {
        (peers[0]?.rtcPeerConnection as any)?.dataChannel?.send('save rec');
      }
    }

    const blob = new Blob(chunks.current, {
      type: 'video/webm', //'video/webm', //'video/mp4;codecs=avc1,opus', //'video/x-matroska;codecs=avc1,opus',
    });

    if (blob.size) {
      const countMember = peers.reduce(
        (acc, val) =>
          val.rtcPeerConnection.connectionState === 'connected' ? acc + 1 : acc,
        1
      );

      chunks.current = [];
      dispatch(
        fetchTrack({
          blob,
          countMember,
          roomId: room?.id || 0,
        })
      );
    }
  };

  const startTimer = () => {
    const callback = () => {
      setTime((t) => t + 1);
    };

    setTime(0);
    timerId.current = setInterval(callback, 1_000);
  };

  const isGuest = () => room?.userId !== currentUser.id;

  return (
    <StyledRecorder>
      <StyledButtons>
        {isUploading ? (
          <Loader />
        ) : isRec ? (
          <StyledButton
            onClick={() => {
              stop();
              setShowConfirm(true);
            }}
            variant='stop'
          >
            {langs('stop')}
          </StyledButton>
        ) : (
          <StyledButton onClick={record} variant='rec'>
            {langs('rec')}
          </StyledButton>
        )}
        <RecordsLink onClick={onClickGoToRecords} />
        <People />
      </StyledButtons>
      <RecordTimer time={time} ref={timerRef} />
      {showCountdown && <Countdown seconds={5} callback={startRecord} />}
      <Modal show={showModal}>
        <StyledModalContent>
          <section>
            {langs('Only the user who created the room can start recording')}
          </section>
          <button onClick={() => setShowModal(false)}>OK</button>
        </StyledModalContent>
      </Modal>
      <Modal show={showConfirm}>
        <StyledModalContent>
          <section>{langs('Do you want to save the recording?')}</section>
          <StyledButtonContainer>
            <Button variant='error' onClick={() => setShowConfirm(false)}>
              {langs('Cancel')}
            </Button>
            <Button
              variant='success'
              onClick={() => {
                setShowConfirm(false);
                saveRecord();
              }}
            >
              {langs('Ok')}
            </Button>
          </StyledButtonContainer>
        </StyledModalContent>
      </Modal>
    </StyledRecorder>
  );
};

export default Recorder;
