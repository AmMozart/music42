import flatpickr from 'flatpickr';
import { BaseOptions } from 'flatpickr/dist/types/options';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const StyledDateTime = styled.div`
  position: relative;
  margin-bottom: 15px;

  & > input {
    resize: none;

    width: 100%;
    height: calc(3.5rem + 2px);
    padding: 1.625rem 0.75rem 0.375rem;

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

  & > input:focus {
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

interface DateTimeProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  options?: Partial<BaseOptions>;
}

const DateTime: React.FC<DateTimeProps> = ({
  value,
  onChange,
  title,
  options,
  ...props
}) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      flatpickr(ref.current, options);
    }
  });

  return (
    <StyledDateTime>
      <input
        ref={ref}
        placeholder=' '
        onChange={onChange}
        value={value}
        {...props}
      />
      <label>{title}</label>
    </StyledDateTime>
  );
};

export default React.memo(DateTime);
