import React from 'react';

import styled from 'styled-components';

import { ExplorerItemData } from '../../app/types';
import { getSiteUrl } from '../../utils/getSiteUrl';

const StyledFileViewer = styled.iframe`
  width: 100%;
  height: 100%;
`;

const StyledVideoFileViewer = styled.div`
  width: 100%;
  height: 100%;
`;

interface FileViewerProps {
  file: ExplorerItemData;
}

const FileViewer: React.FC<FileViewerProps> = ({ file }) => {
  if (file.type === 'video') {
    return (
      <StyledVideoFileViewer>
        <video controls width='100%' height='420px' preload='yes'>
          <source
            src={'/' + file.url.replace('.webm', '.mp4')}
            type='video/mp4'
          />
          <source src={'/' + file.url} type='video/webm' />
          Your browser doesn't support HTML5 video tag.
        </video>
      </StyledVideoFileViewer>
    );
  }
  return (
    <StyledFileViewer
      src={`https://docs.google.com/gview?url=${getSiteUrl()}/${
        file.path
      }&embedded=true`}
    ></StyledFileViewer>
  );
};

export default FileViewer;
