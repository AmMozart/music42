import React from 'react';

import styled from 'styled-components';

const StyledItemsNoFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: 100px 10px;

  font-weight: 500;

  background-color: rgb(22 22 22);
  border-radius: 10px;

  & svg {
    display: block;

    width: 70px;
    height: 70px;
    margin: 0 auto 15px;
    padding: 15px;

    color: #10ce92;

    background-color: rgb(255 255 255 / 5%);
    border-radius: 50%;

    fill: #10ce92;
  }
`;

interface ItemsNoFoundProps {
  title: string;
}

const ItemsNoFound: React.FC<ItemsNoFoundProps> = ({ title }) => {
  return (
    <StyledItemsNoFound>
      <svg viewBox='0 0 1920 1920' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M960 0c530.193 0 960 429.807 960 960s-429.807 960-960 960S0 1490.193 0 960 429.807 0 960 0Zm0 101.053c-474.384 0-858.947 384.563-858.947 858.947S485.616 1818.947 960 1818.947 1818.947 1434.384 1818.947 960 1434.384 101.053 960 101.053Zm-9.32 1221.49c-80.024 0-145.128 65.105-145.128 145.129 0 80.024 65.104 145.128 145.128 145.128 80.024 0 145.128-65.104 145.128-145.128 0-80.024-65.104-145.128-145.128-145.128Zm192.785-968.859h-385.57l93.901 851.327h197.768l93.901-851.327Z'
          fill-rule='evenodd'
        />
      </svg>
      {title}
    </StyledItemsNoFound>
  );
};

export default ItemsNoFound;
