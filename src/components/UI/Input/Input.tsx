import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.section`
  position: relative;
  margin-bottom: 15px;

  & > input {
    resize: none;

    width: 100%;
    height: calc(3.5rem + 2px);

    font: normal normal 500 18px/1.25 Montserrat, sans-serif;
    color: #d7d7d7;

    appearance: none;
    background: transparent;
    border: 1px solid #4f4f4f;
    border-radius: 5px;

    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
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

  & > input:focus,
  & > input:not(:placeholder-shown) {
    padding: 1.625rem 0.75rem 0.375rem;
    border-color: var(--main-color);
    outline: 0;
    box-shadow: 0 0 8px var(--second-color);
  }

  & > input:focus ~ label,
  & > input:not(:placeholder-shown) ~ label {
    transform: scale(0.85) translateY(-0.6rem) translateX(0.15rem);
    font-size: 0.9rem;
    opacity: 0.65;
  }
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
}

const Input: React.FC<InputProps> = ({ value, type, onChange, title }) => {
  return (
    <StyledInput>
      <input type={type} placeholder=' ' onChange={onChange} value={value} />
      <label>{title}</label>
    </StyledInput>
  );
};

export default React.memo(Input);
