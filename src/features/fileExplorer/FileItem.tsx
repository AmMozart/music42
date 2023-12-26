import React, { useState } from 'react';

import styled from 'styled-components';

import {
  deleteFile,
  deleteFolder,
  fileExplorerActions,
} from './fileExplorer.slice';

import { useAppDispatch } from '../../app/hooks';
import { ExplorerItemData } from '../../app/types';
import { OptionButton, OptionItem, OptionsWindow } from '../../components';
import { device } from '../../device';

const StyledFileItem = styled.ol`
  cursor: pointer;
  user-select: none;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 60px;
  margin: 10px 0;
  padding: 5px 15px;

  background: #121212;
  border-radius: 10px;

  transition: background 0.3s linear 0s, color 0.3s linear 0s;

  -webkit-box-align: center;
  -webkit-box-pack: justify;

  &:hover {
    color: #fff;
    background: #22313f;
  }

  @media ${device.mobileL} {
    padding: 5px;
  }
`;

const StyledName = styled.span`
  overflow: hidden;
  width: 50%;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledOptionContainer = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
`;

type ItemType = 'file' | 'folder';

interface FileListProps {
  type: ItemType;
  file: ExplorerItemData;
}

const FileItem: React.FC<FileListProps> = ({ file, type }) => {
  const dispatch = useAppDispatch();
  const [showOptions, setShowOptions] = useState(false);

  const toggleShow = () => {
    setShowOptions((x) => !x);
  };

  const downloadItem = () => {
    setShowOptions(false);
  };

  const deleteItem = () => {
    setShowOptions(false);
    if (type === 'folder') {
      dispatch(deleteFolder(file.id));
    }
    if (type === 'file') {
      dispatch(deleteFile(file.id));
    }
  };

  const openItem = () => {
    if (type === 'folder') {
      dispatch(fileExplorerActions.changeFolderById(file.id));
    }
    if (type === 'file') {
      dispatch(fileExplorerActions.openFileById(file.id));
    }
  };

  const stopHoisting = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <StyledFileItem onClick={openItem}>
      {type === 'file' ? (
        <svg
          width='55px'
          height='55px'
          viewBox='0 0 1024 1024'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M768 960H256c-35.3 0-64-28.7-64-64V128c0-35.3 28.7-64 64-64h512c35.3 0 64 28.7 64 64v768c0 35.3-28.7 64-64 64z'
            fill='#3D5AFE'
          />
          <path d='M256 128h512v768H256z' fill='#FFEA00' />
          <path
            d='M672.1 831.8h-320c-17.7 0-32-14.3-32-32s14.3-32 32-32h320c17.7 0 32 14.3 32 32s-14.4 32-32 32zM768 64H192c-35.3 0-64 28.7-64 64h192c0 35.3 28.7 64 64 64h256c35.3 0 64-28.7 64-64h128c0-35.3-28.7-64-64-64z'
            fill='#3D5AFE'
          />
          <path
            d='M192 64zM192 896V128h-64v768c0 35.3 28.7 64 64 64 84.5 0 163.4-23.4 230.9-64H192z'
            fill='#536DFE'
          />
          <path
            d='M288.1 831.8c-17.7 0-32-14.3-32-32s14.3-32 32-32h271.7C610.4 695.3 640 607.1 640 512c0-125.4-51.5-238.7-134.5-320H320c-35.3 0-64-28.7-64-64h-64v768h230.9c30.1-18.1 57.9-39.7 82.8-64.2H288.1z'
            fill='#FFFF8D'
          />
          <path
            d='M256.1 799.8c0 17.7 14.3 32 32 32h217.6c20-19.6 38.1-41 54.1-64H288.1c-17.7 0-32 14.4-32 32zM422.9 128C355.4 87.4 276.5 64 192 64c-35.3 0-64 28.7-64 64h128c0 35.3 28.7 64 64 64h185.5c-24.9-24.4-52.6-45.9-82.6-64z'
            fill='#536DFE'
          />
        </svg>
      ) : type === 'folder' ? (
        <svg
          width='55px'
          height='55px'
          viewBox='0 0 1024 1024'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M242.3 743.4h603.4c27.8 0 50.3-22.5 50.3-50.3V192H192v501.1c0 27.8 22.5 50.3 50.3 50.3z'
            fill='#FFEA00'
          />
          <path
            d='M178.3 807.4h603.4c27.8 0 50.3-22.5 50.3-50.3V256H128v501.1c0 27.8 22.5 50.3 50.3 50.3z'
            fill='#FFFF8D'
          />
          <path
            d='M960 515v384c0 35.3-28.7 64-64 64H128c-35.3 0-64-28.7-64-64V383.8c0-35.3 28.7-64 64-64h344.1c24.5 0 46.8 13.9 57.5 35.9l46.5 95.3H896c35.3 0 64 28.7 64 64z'
            fill='#3D5AFE'
          />
          <path
            d='M704 512c0-20.7-1.4-41.1-4.1-61H576.1l-46.5-95.3c-10.7-22-33.1-35.9-57.5-35.9H128c-35.3 0-64 28.7-64 64V899c0 6.7 1 13.2 3 19.3C124.4 945 188.5 960 256 960c247.4 0 448-200.6 448-448z'
            fill='#536DFE'
          />
        </svg>
      ) : null}
      <StyledName>{file.name}</StyledName>
      <StyledOptionContainer onClick={stopHoisting}>
        <OptionButton onClick={toggleShow} style={{ top: '2px' }} />
        {showOptions && (
          <OptionsWindow>
            <OptionItem
              onClick={downloadItem}
              title='Download'
              type='download'
            />
            <OptionItem onClick={deleteItem} title='Delete' type='delete' />
          </OptionsWindow>
        )}
      </StyledOptionContainer>
    </StyledFileItem>
  );
};

export default FileItem;
