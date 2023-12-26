import { useEffect, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  STUN_URL,
  TURN_PASSWORD,
  TURN_URL,
  TURN_USERNAME,
} from '../features/rooms/config';
import {
  clearInfo,
  currentRoom,
  fetchCandidate,
  fetchDescription,
  fetchRemoteData,
  peerConnections,
  roomConnection,
  roomsActions,
} from '../features/rooms/rooms.slice';
import { user } from '../features/user/userSlice';

const useWebRTC = (roomId: number) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(user);
  const peers = useAppSelector(peerConnections);
  const roomConnections = useAppSelector(roomConnection);
  const room = useAppSelector(currentRoom);
  const timerId = useRef<ReturnType<typeof window.setInterval>>();
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const ping = useRef(0);
  const [latency, setLatency] = useState(0);
  const [offerIsSended, setOfferIsSended] = useState(false);

  useEffect(() => {
    return () => {
      clearInterval(timerId.current);
      dispatch(clearInfo());
    };
  }, []);

  useEffect(() => {
    if (timerId.current) clearInterval(timerId.current);
    timerId.current = setInterval(() => {
      dispatch(fetchRemoteData(roomId));
    }, 2_000);

    if (currentUser.id && room) {
      room.userIds.forEach((userId) => {
        if (userId !== currentUser.id) {
          createConnection(userId);
        }
      });
      // if (room.userIds.length < 2) {
      //   setOfferIsSended(true);
      // }
    }
  }, [room, currentUser]);

  useEffect(() => {
    // console.log(room?.userIds.length, ' : ', peers.length + 1);
    // if (room?.userIds.length === peers.length + 1) {
    if (peers.length) {
      if (!offerIsSended) {
        makeOffer();
        setOfferIsSended(true);
      }
    }
    // }
  }, [peers]);

  useEffect(() => {
    console.log('roomConnections: ', roomConnections);
    if (roomConnections.length === 0) {
      peers.forEach((connection) => {
        dispatch(roomsActions.removeRtcPeerConnection(connection));
      });
    }

    roomConnections.forEach((item) => {
      let description: RTCSessionDescriptionInit;
      let iceCandidates: RTCIceCandidateInit[];

      if (item.receiver_user_id === currentUser.id && item.state === 'offer') {
        if (peers.length === 0) {
          createConnection(item.sender_user_id);
        }
        description = item.sender_description;
        iceCandidates = item.sender_ice_candidat;
      }
      if (item.sender_user_id === currentUser.id && item.state === 'answer') {
        description = item.receiver_description;
        iceCandidates = item.receiver_ice_candidat;
      }

      if (
        (item.receiver_user_id === currentUser.id && item.state === 'offer') ||
        (item.sender_user_id === currentUser.id && item.state === 'answer')
      ) {
        console.log('peers: ', peers);
        peers.forEach((connection) => {
          const p1 =
            connection.rtcPeerConnection.setRemoteDescription(description);

          const p2: Promise<any>[] = [];
          iceCandidates.forEach((candidate) => {
            p2.push(connection.rtcPeerConnection.addIceCandidate(candidate));
          });
          console.log('item.state: ', item.state);
          if (item.state === 'offer') {
            Promise.all([p1, ...p2]).then(() => {
              makeAnswer();
            });
          }
        });
      }
    });
  }, [roomConnections]);

  const makeOffer = () => {
    peers.forEach((connection) => {
      connection.rtcPeerConnection
        .createOffer()
        .then((offer) =>
          connection.rtcPeerConnection.setLocalDescription(offer)
        )
        .then(() => {
          dispatch(
            fetchDescription({
              description: connection.rtcPeerConnection.localDescription,
              roomId,
              receiverUserId: connection.receiverUserId,
            })
          );
        })
        .catch((reason) => {
          console.log('offer create error: ', reason);
          setError(`Offer create error: ${reason}`);
        });
    });
  };

  const makeAnswer = () => {
    peers.forEach((connection) => {
      connection.rtcPeerConnection
        .createAnswer()
        .then((answer) => {
          return connection.rtcPeerConnection.setLocalDescription(answer);
        })
        .then(() => {
          dispatch(
            fetchDescription({
              description: connection.rtcPeerConnection.localDescription,
              roomId,
              receiverUserId: connection.receiverUserId,
            })
          );
        })
        .catch((error: any) => {
          console.log('answer error ', error);
          setError(`Answer error: ${error.message}`);
        });
    });
  };

  const createConnection = (receiverUserId: number) => {
    const config = {
      iceServers: [
        { urls: STUN_URL },
        {
          urls: TURN_URL,
          username: TURN_USERNAME,
          credential: TURN_PASSWORD,
        },
      ],
    };

    const peerConnection = new RTCPeerConnection(config);
    peerConnection.ontrack = ({ track, streams }) => {
      track.onunmute = () => {
        dispatch(
          roomsActions.setStreamToPeerConnection({
            receiverUserId,
            stream: streams[0],
          })
        );
      };
    };
    peerConnection.onicecandidate = ({ candidate }) => {
      dispatch(
        fetchCandidate({
          candidate: candidate,
          roomId,
          receiverUserId,
        })
      );
    };
    peerConnection.onconnectionstatechange = () => {
      console.log('state: ', peerConnection.connectionState);
      setStatus(peerConnection.connectionState);
      switch (peerConnection.connectionState) {
        case 'failed':
          location.reload();
          break;
        case 'disconnected':
          break;
        case 'connected':
          break;
      }
    };

    let timerId: any;
    peerConnection.ondatachannel = (e) => {
      (peerConnection as any).dataChannel = e.channel;
      e.channel.onmessage = () => {
        setLatency(Math.round((performance.now() - ping.current) / 2));
      };
      e.channel.onopen = () => {
        console.log('Data channel openned');
        timerId = setInterval(() => {
          (peerConnection as any).dataChannel.send('ping');
          ping.current = performance.now();
        }, 5_000);
      };
      e.channel.onclose = () => {
        console.log('close channel');
        setLatency(0);
        clearInterval(timerId);
      };
    };

    const dataChannel = peerConnection.createDataChannel('Channel');
    dataChannel.onmessage = (e) => {
      switch (e.data) {
        case 'start rec':
          dispatch(roomsActions.startRecord());
          break;
        case 'stop rec':
          dispatch(roomsActions.stopRecord());
          break;
        case 'save rec':
          dispatch(roomsActions.saveRecord());
          break;
        case 'ping':
          dataChannel.send('pong');
          break;
        case 'pong':
          setLatency(Math.round((performance.now() - ping.current) / 2));
          break;
      }
      console.log('message: ', e.data);
    };
    dataChannel.onopen = () => console.log('open connection');

    (peerConnection as any).dataChannel = dataChannel;

    dispatch(
      roomsActions.addRtcPeerConnection({
        receiverUserId,
        rtcPeerConnection: peerConnection,
      })
    );
  };

  return {
    error,
    status,
    latency,
    peers,
  };
};

export { useWebRTC };
