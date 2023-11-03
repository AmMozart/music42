import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import styled from 'styled-components';

import {
  confirmJoinRequest,
  getJoinGarage,
  joinData,
  rejectJoinRequest,
} from './garage.slice';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useLangs } from '../../hooks/useLangs';

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;

  height: 500px;

  & > h4 {
    text-align: center;
  }

  & > div {
    display: flex;
    gap: 30px;
    justify-content: flex-end;
  }
`;

const ConsiderationGarage: React.FC = () => {
  const { id } = useParams();
  const langs = useLangs();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const join = useAppSelector(joinData);

  useEffect(() => {
    if (id) {
      dispatch(getJoinGarage(+id));
    }
  }, [id]);

  const reject = () => {
    if (id) {
      dispatch(rejectJoinRequest(+id));
      navigate('/garage');
    }
  };

  const confirm = () => {
    if (id) {
      dispatch(confirmJoinRequest(+id));
      navigate('/garage');
    }
  };

  return (
    <StyledContent>
      <h4>{langs('Do you want to hire this musician?')}</h4>
      <div className='artist_for_event_container'>
        <div className='artist_for_event'>
          <a
            href={'https://music42.com/' + join?.userData.username}
            data-load={'/' + join?.userData.username}
          >
            <img src={join?.userData.avatar} />
          </a>
        </div>
        <label>{join?.userData.name}</label>
      </div>

      <div>
        <Button variant='danger' size='lg' onClick={reject}>
          {langs('Reject')}
        </Button>
        <Button variant='success' size='lg' onClick={confirm}>
          {langs('Confirm')}
        </Button>
      </div>
    </StyledContent>
  );
};

export default ConsiderationGarage;
