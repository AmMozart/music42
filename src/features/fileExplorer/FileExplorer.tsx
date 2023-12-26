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
  fileExplorerActions,
} from './fileExplorer.slice';
import FileList from './FileList';

import Navigation from './Navigation';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CloseButton, FileViewer, Message } from '../../components';
import { Input, Modal } from '../../components/UI';
import { device } from '../../device';
import { useLangs } from '../../hooks/useLangs';

const StyledFileExplorer = styled.section`
  position: relative;
  width: 100%;
  max-width: 800px;
  padding: 10px;
  margin-bottom: 100px;

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

const StyledFileViewer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  height: 600px;
  position: absolute;
  top: 0px;
  left: 0;
  z-index: 1;
  background: #0d0d0d;
`;

const StyledBack = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 60px;
  height: 64px;
  border-radius: 50%;
  background: #151515;
  transition: background 0.3s linear;
  font-size: 0.5em;
  user-select: none;
  padding: 5px;
  margin: 5px;

  &:hover {
    background: #22313f;
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
  const fileId = useAppSelector((state) => state.fileExplorer.viewFileId);
  const [folderName, setFolderName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [path, setPath] = useState('');

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

  useEffect(() => {
    const viewFile = explorer.items.find((item) => item.id === fileId);
    if (viewFile) {
      setPath(`/${viewFile.path}`);
    }
  }, [fileId]);

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

  const closeFile = () => {
    dispatch(fileExplorerActions.closeFile());
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
      {fileId && (
        <StyledFileViewer>
          <StyledBack onClick={closeFile}>
            <svg
              width='35px'
              height='35px'
              viewBox='0 0 1024 1024'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
            >
              <path d='M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z'></path>
            </svg>
            <span>{langs('Close')}</span>
          </StyledBack>
          <FileViewer path={path} />
        </StyledFileViewer>
      )}
    </StyledFileExplorer>
  );
};

export default FileExplorer;
