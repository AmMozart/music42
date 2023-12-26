import React from 'react';
import styled from 'styled-components';

const StyledRange = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 30px;
  height: 150px;

  font-size: 0.8em;
  color: #6c6c6c;

  & input {
    cursor: pointer;

    width: 100%;

    color: #6c6c6c;

    appearance: slider-vertical;
    background: #6c6c6c;
  }
`;

interface RangeItemProps {
  min: number;
  max: number;
  frequencie: number;
  value: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RangeItem: React.FC<RangeItemProps> = ({
  min,
  max,
  frequencie,
  value,
  onChange,
}) => {
  const title = frequencie > 999 ? `${frequencie / 1000}k` : frequencie;

  return (
    <StyledRange>
      <span>{title}</span>
      <input
        type='range'
        min={min}
        max={max}
        step={1}
        value={value}
        data-frequencie={frequencie}
        onChange={onChange}
        list='steplist'
      />
      <span>{title}</span>
    </StyledRange>
  );
};

export default RangeItem;
