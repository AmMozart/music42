import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.div`
  position: relative;
  margin-bottom: 15px;

  & > select {
    cursor: pointer;
    resize: none;

    width: 100%;
    height: calc(3.5rem + 2px);

    font: 500 18px / 1.25 Montserrat, sans-serif;
    color: rgb(215 215 215);

    appearance: none;
    background: transparent;
    border: 1px solid rgb(79 79 79);
    border-radius: 5px;

    transition: border-color 0.15s ease-in-out 0s,
      box-shadow 0.15s ease-in-out 0s;
  }

  & > select option {
    cursor: pointer;
    background: #161616;
  }

  & > label {
    pointer-events: none;

    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    transform-origin: 0 0;

    flex: auto;

    width: 100%;
    max-width: 100%;
    height: 100%;
    padding: 1rem 0.75rem;

    font: normal normal 500 16px/25px Montserrat, sans-serif;
    text-align: left;

    border: 1px solid transparent;

    transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
  }

  & > select:focus {
    color: inherit;

    background: transparent;
    border-color: var(--main-color);
    outline: 0;
    box-shadow: 0 0 8px var(--second-color);
  }

  & > select:not(:placeholder-shown) {
    padding: 1.625rem 0.75rem 0.375rem;
  }

  & > select:focus ~ label,
  & > select:not(:placeholder-shown) ~ label {
    transform: scale(0.85) translateY(-0.6rem) translateX(0.15rem);
    font-size: 0.9rem;
    opacity: 0.65;
  }
`;

interface Option {
  value: string | number;
  name: string | number;
}

interface InputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  title: string;
  options: readonly Option[];
  selectedOptionIdx?: number;
}

const Input: React.FC<InputProps> = ({
  options,
  onChange,
  title,
  selectedOptionIdx = 0,
  ...props
}) => {
  return (
    <StyledSelect>
      <select onChange={onChange} {...props}>
        {options.map((opt, i) => (
          <option value={opt.value} selected={selectedOptionIdx === i}>
            {opt.name}
          </option>
        ))}
      </select>
      <label htmlFor={props.name}>{title}</label>
    </StyledSelect>
  );
};

export default React.memo(Input);
