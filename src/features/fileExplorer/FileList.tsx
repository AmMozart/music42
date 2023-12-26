import React from 'react';

import styled from 'styled-components';

import FileItem from './FileItem';

import { ExplorerData } from '../../app/types';
import { ItemsNoFound } from '../../components';
import { useLangs } from '../../hooks/useLangs';

const StyledFileList = styled.ul`
  padding: 10px 0;
`;

interface FileListProps {
  explorerData: ExplorerData;
}

const FileList: React.FC<FileListProps> = ({ explorerData }) => {
  const langs = useLangs();
  const isEmptyFolder = () => explorerData.items.length === 0;

  return (
    <StyledFileList>
      {[...explorerData.items]
        .sort((a, b) => (a.type === b.type ? 0 : a.type === 'folder' ? -1 : 1))
        .map((item) => (
          <FileItem key={item.name} file={item} type={item.type} />
        ))}
      {isEmptyFolder() && <ItemsNoFound title={langs('Empty')} />}
    </StyledFileList>
  );
};

export default FileList;
