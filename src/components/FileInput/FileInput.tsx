import React, { useRef } from 'react';
import styled from 'styled-components';

const StyledFileInput = styled.div`
  cursor: pointer;

  position: relative;

  display: block;

  max-width: 100%;
  height: 200px;
  margin-bottom: 20px;
  padding: 0;

  border: 0;
  box-shadow: none;
`;

const StyledButton = styled.button`
  cursor: pointer;

  position: absolute;
  right: 30px;
  bottom: 30px;

  padding: 0 18px;

  font: normal normal 500 16px/40px Montserrat, sans-serif;
  color: var(--main-color);
  letter-spacing: 0;

  background: #fff;
  border: 0;
  border-radius: 2em;
`;

const StyledHiddenFileInput = styled.input`
  position: absolute;
  visibility: hidden;
  opacity: 0;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface FileInputProps {
  src?: string;
}

const FileInput: React.FC<FileInputProps> = ({
  src = 'https://music42.com/themes/volcano/img/events/create.jpg',
}) => {
  const refInputFile = useRef<HTMLInputElement>(null);
  const refPoster = useRef<HTMLImageElement>(null);

  const openFileExplorer = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (refInputFile.current) {
      refInputFile.current.click();
    }
  };

  const handleChangeImage = () => {
    if (
      refPoster.current &&
      refInputFile.current &&
      refInputFile.current.files &&
      refInputFile.current.files.length
    ) {
      refPoster.current.src = window.URL.createObjectURL(
        refInputFile.current.files[0]
      );
    }
  };

  return (
    <StyledFileInput>
      <StyledImg ref={refPoster} src={src} alt='Picture' />
      <StyledButton onClick={openFileExplorer}>
        <svg
          width='17.01'
          height='15.21'
          viewBox='0 0 17.01 15.21'
          xmlns='http://www.w3.org/2000/svg'
        >
          {' '}
          <path
            id='Path_215837'
            d='M-12213.892-2767.992a.431.431,0,0,1-.285-.116.432.432,0,0,1-.117-.285v-6.7h.8v6.3h15.406v-6.3h.8v6.7a.422.422,0,0,1-.113.285.42.42,0,0,1-.285.116Zm7.7-4.711v-6.305h-3.795l4.2-4.19,4.2,4.19h-3.795v6.305Zm.4-10.5v0Z'
            transform='translate(12214.294 2783.203)'
            fill='currentColor'
          ></path>{' '}
        </svg>
        &nbsp;&nbsp;Обложка мероприятия
      </StyledButton>

      <StyledHiddenFileInput
        ref={refInputFile}
        onChange={handleChangeImage}
        type='file'
        name='image'
        accept='image/x-png, image/jpeg'
      />
    </StyledFileInput>
  );
};

export default FileInput;
