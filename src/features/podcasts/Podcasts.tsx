import { useEffect, useState } from 'react';
import styled from 'styled-components';

import {
  changeLink,
  changeTitle,
  getPodcasts,
  link,
  postVideoLink,
  setLoadingVideoState,
  title,
  videos,
} from './podcasts.slice';
import Video from './Video';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AddButton, ItemsNoFound } from '../../components';
import { Input, Modal } from '../../components/UI';
import { useLangs } from '../../hooks/useLangs';
import { user } from '../user/userSlice';

const StyledPodcasts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;

  & > .title {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;

    margin-bottom: 40px;
    padding-bottom: 30px;

    font-size: 24px;
    color: #d2d2d2;

    border-bottom: 1px solid #313437;
  }

  & > .podcasts-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    align-items: center;
    justify-content: center;

    width: 100%;
  }
`;

const Podcasts: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const podcastVideos = useAppSelector(videos);
  const videoLink = useAppSelector(link);
  const videoTitle = useAppSelector(title);
  const currentUser = useAppSelector(user);
  const langs = useLangs();

  useEffect(() => {
    podcastVideos.length === 0 && dispatch(getPodcasts());
    return () => {
      setLoadingVideoState('idle');
    };
  }, []);

  const handleAddVideo = () => {
    setShowModal(true);
  };

  const setLink: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(changeLink(e.currentTarget.value));
  };

  const setTitle: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(changeTitle(e.currentTarget.value));
  };

  const handleModalButtonClick = () => {
    addVideo();
    clearModalInput();
    closeModal();
  };

  const addVideo = () =>
    dispatch(postVideoLink({ link: videoLink, title: videoTitle }));

  const clearModalInput = () => {
    dispatch(changeLink(''));
    dispatch(changeTitle(''));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <StyledPodcasts>
      <div className='title'>
        <svg
          fill='currentColor'
          height='40px'
          width='40px'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 512 512'
        >
          <g>
            <g>
              <path d='m439.5,236c0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,70-64,126.9-142.7,126.9-78.7,0-142.7-56.9-142.7-126.9 0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,86.2 71.5,157.4 163.1,166.7v57.5h-23.6c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h88c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4h-23.6v-57.5c91.6-9.3 163.1-80.5 163.1-166.7z' />
              <path d='m256,323.5c51,0 92.3-41.3 92.3-92.3v-127.9c0-51-41.3-92.3-92.3-92.3s-92.3,41.3-92.3,92.3v127.9c0,51 41.3,92.3 92.3,92.3zm-52.3-220.2c0-28.8 23.5-52.3 52.3-52.3s52.3,23.5 52.3,52.3v127.9c0,28.8-23.5,52.3-52.3,52.3s-52.3-23.5-52.3-52.3v-127.9z' />
            </g>
          </g>
        </svg>
        <span>{langs('Podcasts')}</span>
      </div>

      {currentUser.admin > 0 && (
        <AddButton title={langs('Add Video')} onClick={handleAddVideo} />
      )}

      <Modal show={showModal} onClose={closeModal}>
        <form>
          <Input
            title={langs('Enter Youtube Link')}
            type='url'
            onChange={setLink}
            value={videoLink}
            maxLength={300}
          />
          <Input
            title={langs('Enter Title')}
            type='text'
            onChange={setTitle}
            value={videoTitle}
            maxLength={300}
          />

          <div className='last-sett-btn d-flex align-items-center justify-content-between import_ado_footer'>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='48'
                height='48'
                fill='none'
                viewBox='0 0 48 48'
              >
                <rect width='48' height='48' fill='#FF0000' rx='24'></rect>
                <path
                  fill='#fff'
                  fill-rule='evenodd'
                  d='M35.7379 14.1401C37.0229 14.486 38.0361 15.4992 38.3821 16.7842C39.0246 19.1318 38.9999 24.0247 38.9999 24.0247C38.9999 24.0247 38.9999 28.8929 38.3821 31.2405C38.0361 32.5255 37.0229 33.5387 35.7379 33.8846C33.3903 34.5024 23.9999 34.5024 23.9999 34.5024C23.9999 34.5024 14.6342 34.5024 12.2619 33.8599C10.9769 33.5139 9.96375 32.5008 9.61779 31.2158C9 28.8929 9 24 9 24C9 24 9 19.1318 9.61779 16.7842C9.96375 15.4992 11.0016 14.4613 12.2619 14.1153C14.6095 13.4976 23.9999 13.4976 23.9999 13.4976C23.9999 13.4976 33.3903 13.4976 35.7379 14.1401ZM28.8187 24L21.0098 28.4975V19.5025L28.8187 24Z'
                  clip-rule='evenodd'
                ></path>
              </svg>
            </div>
            <button
              className='btn btn-primary btn-mat'
              onClick={handleModalButtonClick}
              disabled={!videoLink}
            >
              {langs('Add Video')}
            </button>
          </div>
        </form>
      </Modal>

      {podcastVideos.length === 0 ? (
        <ItemsNoFound title={langs('No Podcasts Found')} />
      ) : (
        <section className='podcasts-grid'>
          {podcastVideos.map((video) => (
            <Video
              key={video.id}
              url={video.url}
              id={video.id}
              title={video.title}
            />
          ))}
        </section>
      )}
    </StyledPodcasts>
  );
};

export default Podcasts;
