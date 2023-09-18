import React, { useCallback, useRef, useState } from 'react';

import styled, { keyframes } from 'styled-components';

import {
  deletePictureFromCollection,
  editPictureId,
  inEditProcessing,
  savePicture,
  setEditPictureId,
  setShowCarousel,
  username,
} from './profilePictures.slice';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  IncreaseImage,
  Modal,
  OptionButton,
  OptionItem,
  OptionsWindow,
} from '../../components';
import { user } from '../user/userSlice';

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const StyledPicture = styled.div`
  cursor: pointer;

  position: relative;

  width: 100%;
  margin-bottom: 15px;

  border-radius: 5px;

  stroke: #d7d7d7;

  & .image {
    width: 100%;
    height: 100%;
  }

  & .image:hover {
    opacity: 0.8;
    background: #00000080;
  }

  & .image img {
    width: 100%;
    object-fit: contain;
  }

  & .rotate {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    fill: #00000080;

    animation: ${rotation} 2s infinite linear;
  }
`;

interface PictureProps {
  id: number;
  url: string;
  index: number;
}

const Picture: React.FC<PictureProps> = ({ id, url, index }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(user);
  const selectedUsername = useAppSelector(username);
  const inEdit = useAppSelector(inEditProcessing);
  const inEditId = useAppSelector(editPictureId);
  const ref = useRef<HTMLImageElement>(null);

  const toggleOptions = () => {
    setShowOptions(true);
  };

  const deletePicture = useCallback(() => {
    setShowDeleteModal(true);
    setShowOptions(false);
  }, []);

  const increasePicture = useCallback(() => {
    dispatch(setShowCarousel({ isShow: true, item: index }));
  }, [index]);

  const isMyVideo = () => currentUser.username === selectedUsername;

  const handleClose = () => {
    setShowDeleteModal(false);
  };

  const handleDelete = useCallback(() => {
    dispatch(deletePictureFromCollection(id));
  }, [id]);

  const rotate = () => {
    const img = new Image();
    let mimeType = 'image/jpeg';
    if (ref.current) {
      const matches = ref.current.src.match(/\.[a-zA-Z]*$/);
      if (matches) {
        switch (matches[0]) {
          case '.jpg':
          case '.jpeg': {
            mimeType = 'image/jpeg';
            break;
          }
          case '.png': {
            mimeType = 'image/png';
            break;
          }
          case '.gif': {
            mimeType = 'image/gif';
            break;
          }
          case '.webp': {
            mimeType = 'image/webp';
            break;
          }
        }
      }
      img.src = ref.current.src.replace('_small.', '.');
    }

    const canvas = document.createElement('canvas');
    img.onload = function () {
      rotateImage();
      saveImage();
    };

    const rotateImage = () => {
      const ctx = canvas.getContext('2d');

      canvas.width = img.height;
      canvas.height = img.width;

      if (ctx) {
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(Math.PI / 2);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
      }
    };

    const saveImage = () => {
      canvas.toBlob(
        (blob) => {
          dispatch(setEditPictureId(id));
          blob && dispatch(savePicture({ id: id, picture: blob }));
        },
        mimeType,
        1
      );
    };
  };
  if (inEdit && inEditId === id)
    return (
      <StyledPicture>
        <div className='rotate'>
          <svg
            width='70px'
            height='70px'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M4.06189 13C4.02104 12.6724 4 12.3387 4 12C4 7.58172 7.58172 4 12 4C14.5006 4 16.7332 5.14727 18.2002 6.94416M19.9381 11C19.979 11.3276 20 11.6613 20 12C20 16.4183 16.4183 20 12 20C9.61061 20 7.46589 18.9525 6 17.2916M9 17H6V17.2916M18.2002 4V6.94416M18.2002 6.94416V6.99993L15.2002 7M6 20V17.2916'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        </div>
      </StyledPicture>
    );

  return (
    <StyledPicture>
      <div className={'image'}>
        <img src={url} alt='Picture' ref={ref} />
      </div>
      {isMyVideo() && <OptionButton onClick={toggleOptions} />}
      {showOptions && (
        <OptionsWindow>
          <OptionItem onClick={deletePicture} title='Delete' type='delete' />
          <OptionItem onClick={rotate} title='Rotate' type='rotate' />
        </OptionsWindow>
      )}
      <IncreaseImage onClick={increasePicture} />

      {showDeleteModal && (
        <Modal
          message='Are you sure you want to delete?'
          rejectText='Cancel'
          confirmText='Delete'
          onConfirm={handleDelete}
          onReject={handleClose}
        />
      )}
    </StyledPicture>
  );
};

export default Picture;
