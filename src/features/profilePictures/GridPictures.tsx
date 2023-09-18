import React, { memo, useEffect } from 'react';

import styled from 'styled-components';

import Picture from './Picture';

import { getPicturesFromCollection, username } from './profilePictures.slice';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { PictureData } from '../../app/types';
import { ItemsNoFound } from '../../components';
import { device } from '../../device';

const StyledGridPictures = styled.div`
  column-count: 3;
  margin-bottom: 20px;

  @media ${device.tabletM} {
    column-count: 2;
  }
`;

interface GridPicturesProps {
  pictures: PictureData[];
}

const GridPictures: React.FC<GridPicturesProps> = ({ pictures }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(username);

  useEffect(() => {
    if (user) {
      dispatch(getPicturesFromCollection(user));
    }
  }, [user]);

  if (pictures.length === 0) {
    return <ItemsNoFound title={'No Pictures Found'} />;
  }

  return (
    <StyledGridPictures>
      {pictures.length > 0 &&
        pictures.map((pictureData, i) => (
          <Picture
            key={pictureData.id}
            url={`https://music42.com/${pictureData.url.replace(
              /(.*)(\.)([a-zA-Z]+)$/,
              (...match) => `${match[1]}_small.${match[3]}`
            )}`}
            id={pictureData.id}
            index={i}
          />
        ))}
    </StyledGridPictures>
  );
};

export default memo(GridPictures);
