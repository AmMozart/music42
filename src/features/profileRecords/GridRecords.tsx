import React from 'react';

import styled from 'styled-components';

import Record from './Record';

import { RecordData } from '../../app/types';
import { ItemsNoFound } from '../../components';
import { useLangs } from '../../hooks/useLangs';

const StyledGridRecords = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;

  margin-top: 20px;
`;

interface GridRecordsProps {
  records: RecordData[];
}

const GridRecords: React.FC<GridRecordsProps> = ({ records }) => {
  const langs = useLangs();

  if (records.length === 0) {
    return <ItemsNoFound title={langs('No Records Found')} />;
  }

  return (
    <StyledGridRecords>
      {records.length > 0 &&
        records.map((record) => (
          <Record key={record.id} url={record.url} id={record.id} />
        ))}
    </StyledGridRecords>
  );
};

export default GridRecords;
