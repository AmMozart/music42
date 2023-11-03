import styled from 'styled-components';

import Item from './Item';

import { GarageItemData } from '../../app/types';

const StyledItemsList = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

interface ItemListProps {
  items: GarageItemData[];
}

const ItemsList: React.FC<ItemListProps> = ({ items }) => {
  return (
    <StyledItemsList>
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </StyledItemsList>
  );
};

export default ItemsList;
