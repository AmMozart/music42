import React from 'react';

import styled from 'styled-components';

import { getSiteUrl } from '../../utils/getSiteUrl';

const StyledFileViewer = styled.iframe`
  width: 100%;
  height: 100%;
`;

interface FileViewerProps {
  path: string;
}

const FileViewer: React.FC<FileViewerProps> = ({ path }) => {
  return (
    <StyledFileViewer
      src={`https://docs.google.com/gview?url=${getSiteUrl()}/${path}&embedded=true`}
    ></StyledFileViewer>
  );
};

export default FileViewer;
