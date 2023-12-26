import React, { useEffect, useState } from 'react';

import { Button } from 'react-bootstrap';
import styled from 'styled-components';

import AddFileButton from './AddFileButton';
import AddFolderButton from './AddFolderButton';
import {
  createFolder,
  explorerData,
  getFilesByRoomId,
  getFilesByFolderId,
  upload,
} from './fileExplorer.slice';
import FileList from './FileList';

import Navigation from './Navigation';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CloseButton, Message } from '../../components';
import { Input, Modal } from '../../components/UI';
import { device } from '../../device';
import { useLangs } from '../../hooks/useLangs';

const StyledFileExplorer = styled.section`
  width: 100%;
  max-width: 800px;
  padding: 10px;

  background: #29292945;
  border-radius: 10px;
`;

const Title = styled.h5`
  text-align: center;
  text-transform: uppercase;
`;

const StyledButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  @media ${device.mobileL} {
    & button {
      font-size: 10px;
    }
  }
`;

interface FileExplorerProps {
  roomId: number;
}

const UPDATE_FOLDER_MS = 2_000;

const FileExplorer: React.FC<FileExplorerProps> = ({ roomId }) => {
  const dispatch = useAppDispatch();
  const langs = useLangs();
  const explorer = useAppSelector(explorerData);
  const [folderName, setFolderName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    dispatch(getFilesByRoomId(roomId));
  }, []);

  useEffect(() => {
    let timerId: ReturnType<typeof setInterval>;
    if (explorer.folderId) {
      dispatch(getFilesByFolderId(explorer.folderId));
      timerId = setInterval(() => {
        dispatch(getFilesByFolderId(explorer.folderId));
      }, UPDATE_FOLDER_MS);
    }

    return () => {
      timerId && clearInterval(timerId);
    };
  }, [explorer.folderId]);

  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      dispatch(
        upload({ file: event.target.files[0], folderId: explorer.folderId })
      );
    }
  };

  const openInput = () => {
    setShowModal(true);
  };

  const closeInput = () => {
    setShowModal(false);
  };

  const uploadFolder = () => {
    if (folderName === '') {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 5_000);
      return;
    }
    setShowModal(false);
    dispatch(createFolder({ name: folderName, folderId: explorer.folderId }));
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(event.target.value);
  };

  return (
    <StyledFileExplorer>
      <Title>{langs('File Explorer')}</Title>
      <Navigation roomId={roomId} currentFolderId={explorer.folderId} />
      <FileList explorerData={explorer} />
      <StyledButtons>
        <AddFileButton
          title={langs('Add File')}
          onChange={uploadFile}
          accept='.doc, .docx, .pdf'
        />
        <AddFolderButton title={langs('Add Folder')} onClick={openInput} />
      </StyledButtons>
      <Modal show={showModal}>
        {showMessage && <Message type='error' value={langs('Enter name')} />}
        <Input
          value={folderName}
          onChange={handleChangeName}
          title={langs('name')}
        />
        <Button onClick={uploadFolder} style={{ float: 'right' }}>
          {langs('Create')}
        </Button>
        <CloseButton onClick={closeInput} />
      </Modal>
    </StyledFileExplorer>
  );
};

export default FileExplorer;
