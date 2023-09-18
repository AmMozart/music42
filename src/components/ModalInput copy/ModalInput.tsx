import styled from 'styled-components';

const StyledModalInput = styled.div`
  position: relative;

  width: 100%;
  max-width: 810px;
  padding: 30px;

  background: #161616;

  & .input input {
    resize: none;

    height: calc(3.5rem + 2px);

    font: normal normal 500 18px/1.25 Montserrat, sans-serif;

    appearance: none;
    border: 1px solid #4f4f4f;
    border-radius: 5px;

    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  & .input label {
    pointer-events: none;

    position: absolute;
    top: 15px;
    right: 0;
    left: 30px;
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

  & .input input:active {
    color: inherit;

    background: transparent;
    border-color: var(--main-color);
    outline: 0;
    box-shadow: 0 0 8px var(--second-color);
  }
`;

interface ModalInputProps extends React.HTMLAttributes<HTMLElement> {
  inputTitle: string;
  buttonTitle: string;
  value: string;
}

const ModalInput: React.FC<ModalInputProps> = ({
  inputTitle,
  buttonTitle,
  value,
  ...props
}) => {
  return (
    <StyledModalInput>
      <div className='input'>
        <input
          type='url'
          className='form-control'
          placeholder=' '
          onChange={props.onChange}
          value={value}
        />
        <label>{inputTitle}</label>
      </div>

      <div className='last-sett-btn d-flex align-items-center justify-content-between import_ado_footer'>
        <div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='48'
            height='48'
            fill='none'
            viewBox='0 0 48 48'
          >
            <rect width='48' height='48' fill='#FF0000' rx='24'></rect>
            <path
              fill='#fff'
              fill-rule='evenodd'
              d='M35.7379 14.1401C37.0229 14.486 38.0361 15.4992 38.3821 16.7842C39.0246 19.1318 38.9999 24.0247 38.9999 24.0247C38.9999 24.0247 38.9999 28.8929 38.3821 31.2405C38.0361 32.5255 37.0229 33.5387 35.7379 33.8846C33.3903 34.5024 23.9999 34.5024 23.9999 34.5024C23.9999 34.5024 14.6342 34.5024 12.2619 33.8599C10.9769 33.5139 9.96375 32.5008 9.61779 31.2158C9 28.8929 9 24 9 24C9 24 9 19.1318 9.61779 16.7842C9.96375 15.4992 11.0016 14.4613 12.2619 14.1153C14.6095 13.4976 23.9999 13.4976 23.9999 13.4976C23.9999 13.4976 33.3903 13.4976 35.7379 14.1401ZM28.8187 24L21.0098 28.4975V19.5025L28.8187 24Z'
              clip-rule='evenodd'
            ></path>
          </svg>
        </div>
        <button className='btn btn-primary btn-mat' onClick={props.onClick}>
          {buttonTitle}
        </button>
      </div>
    </StyledModalInput>
  );
};

export default ModalInput;
