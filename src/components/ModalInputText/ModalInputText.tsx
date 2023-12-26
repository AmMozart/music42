import styled from 'styled-components';

const StyledModalInputText = styled.div`
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

interface ModalInputTextProps extends React.HTMLAttributes<HTMLElement> {
  inputTitle: string;
  buttonTitle: string;
  value: string;
}

const ModalInputText: React.FC<ModalInputTextProps> = ({
  inputTitle,
  buttonTitle,
  value,
  ...props
}) => {
  return (
    <StyledModalInputText>
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
        <button className='btn btn-primary btn-mat' onClick={props.onClick}>
          {buttonTitle}
        </button>
      </div>
    </StyledModalInputText>
  );
};

export default ModalInputText;
