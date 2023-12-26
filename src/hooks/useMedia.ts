import { useEffect, useRef, useState } from 'react';

import { useAppSelector } from '../app/hooks';

import { peerConnections } from '../features/rooms/rooms.slice';

const useMedia = () => {
  const peers = useAppSelector(peerConnections);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const stream = useRef<MediaStream>();
  const [error, setError] = useState('');

  useEffect(() => {
    return () => stream.current?.getTracks().forEach((track) => track.stop());
  }, []);

  useEffect(() => {
    if (peers.length > 0 && stream.current) {
      for (const track of stream.current.getTracks()) {
        peers.forEach((peer) => {
          const senders = peer.rtcPeerConnection.getSenders();
          if (!senders.find((sender) => sender?.track?.id === track.id)) {
            stream.current &&
              peer.rtcPeerConnection.addTrack(track, stream.current);
          }
        });
      }
    }
  }, [peers]);

  const startLocalVideo = async () => {
    const constraints = {
      audio: {
        sampleSize: 16,
        channelCount: 2,
      },
      video: {
        width: { max: 640 },
        height: { max: 640 },
        frameRate: { max: 30 },
        facingMode: { exact: 'user' },
      },
    };
    try {
      stream.current = stream.current
        ? stream.current
        : await navigator.mediaDevices.getUserMedia(constraints);

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream.current;
      }
    } catch (error: any) {
      console.error('Media error: ', error);
      setError(`Media error: ${error.message}`);
    }
  };

  return {
    startLocalVideo,
    localVideoRef,
    error,
    stream: stream.current,
  };
};

export { useMedia };
