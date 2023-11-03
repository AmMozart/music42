import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { addGarageItem, fetchNewItemData, resetNewItem } from './garage.slice';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Instruments, SearchType } from '../../app/types';
import { FileInput, Message } from '../../components';
import { DateTime, Input, Select, TextArea } from '../../components/UI';
import { device } from '../../device';
import { useLangs } from '../../hooks/useLangs';
import { getCountryOptions } from '../../models/countryOptions';

const StyledCreateGarage = styled.form`
  width: 730px;
  margin: 40px;

  background: #161616;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 20%);

  /* overflow: hidden; */

  @media ${device.tabletM} {
    margin: 0;
  }
`;

const StyledFormField = styled.section`
  margin: 0 40px 40px;

  & > button {
    float: right;
    margin: 20px;
    padding: 15px 70px;
    border-radius: 40px;
  }

  @media ${device.tabletM} {
    margin: 20px;
  }
`;

const StyledRow = styled.div`
  display: flex;
  gap: 20px;

  & > * {
    flex-grow: 1;
  }

  @media ${device.tabletL} {
    flex-direction: column;
    gap: 0;
  }
`;

const StyledSwitchContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 15px;

  & > div {
    margin: 5px 0 5px 50px;
  }
`;

const StyledSearchType = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 40px;

  & > label {
    cursor: pointer;
  }

  & span {
    padding: 10px 20px;
    transition: color 0.3s ease-in, 'border-borrom' 0.3s ease-in;
  }

  & input[type='radio']:checked ~ span {
    color: #25ff07bd;
    border-bottom: 1px solid;
  }
`;

const CreateGarage: React.FC = () => {
  const dispatch = useAppDispatch();
  const fetchNewItemState = useAppSelector(fetchNewItemData);
  const navigate = useNavigate();
  const langs = useLangs();
  const [searchType, setSearchType] = useState(SearchType.LookingFor);

  useEffect(() => {
    if (fetchNewItemState.status === 200) {
      setTimeout(() => {
        navigate('/garage');
        dispatch(resetNewItem());
      }, 3000);
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [fetchNewItemState]);

  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.target instanceof HTMLFormElement) {
      dispatch(addGarageItem(e.target));
    }
  };

  const dataTimeOptions = {
    enableTime: true,
    dateFormat: 'Y-m-d H:i',
    minDate: 'today',
  };

  const changeSearchType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchType(e.target.value as SearchType);
  };

  return (
    <StyledCreateGarage onSubmit={submitHandle}>
      <FileInput />
      {fetchNewItemState.status === 400 && (
        <Message value={fetchNewItemState.message} type={'error'} />
      )}
      {fetchNewItemState.status === 200 && (
        <Message value={fetchNewItemState.message} type={'success'} />
      )}
      <StyledFormField>
        <StyledSearchType>
          <label>
            <input
              type='radio'
              name='searchType'
              value={SearchType.LookingFor}
              checked={searchType === SearchType.LookingFor}
              onChange={changeSearchType}
              hidden
            />
            <span>{langs(SearchType.LookingFor)}</span>
          </label>
          <label>
            <input
              type='radio'
              name='searchType'
              value={SearchType.AvailableToPlay}
              checked={searchType === SearchType.AvailableToPlay}
              onChange={changeSearchType}
              hidden
            />
            <span>{langs(SearchType.AvailableToPlay)}</span>
          </label>
        </StyledSearchType>
        <Input
          type='text'
          title={langs('Title')}
          name='title'
          maxLength={100}
        />
        <StyledRow>
          <Select
            title={langs('Country')}
            options={getCountryOptions()}
            selectedOptionIdx={0}
            name='country_id'
          />
          <Input
            type='text'
            title={langs('City')}
            name='city'
            maxLength={100}
          />
        </StyledRow>
        {searchType === SearchType.LookingFor && (
          <>
            <Input
              type='text'
              title={langs('Address')}
              name='address'
              maxLength={100}
            />
            <StyledRow>
              <DateTime
                title={langs('Start Date')}
                name='startDate'
                options={dataTimeOptions}
              />
              <DateTime
                title={langs('End Date')}
                name='endDate'
                options={dataTimeOptions}
              />
            </StyledRow>

            <StyledRow>
              <Input
                type='number'
                title={langs('People Count')}
                name='peopleCount'
                min={0}
                max={100}
              />

              <Input
                type='number'
                title={langs('Exist People Count')}
                name='existPeopleCount'
                min={0}
                max={100}
              />
            </StyledRow>
          </>
        )}

        {searchType === SearchType.LookingFor && (
          <h5>{langs('What kind of musicians are needed:')}</h5>
        )}
        {searchType === SearchType.AvailableToPlay && (
          <h5>{langs('Who you are:')}</h5>
        )}
        <StyledSwitchContainer>
          <Form.Check
            type='switch'
            label={langs(Instruments.Bassist)}
            value={Instruments.Bassist}
            id='basist-switch'
            name='types[]'
          />
          <Form.Check
            type='switch'
            label={langs(Instruments.GuitarPlayer)}
            value={Instruments.GuitarPlayer}
            id='guitar-switch'
            name='types[]'
          />
          <Form.Check
            type='switch'
            label={langs(Instruments.Vocalist)}
            value={Instruments.Vocalist}
            id='vocalist-switch'
            name='types[]'
          />
          <Form.Check
            type='switch'
            label={langs(Instruments.Drummer)}
            value={Instruments.Drummer}
            id='drummer-switch'
            name='types[]'
          />
          <Form.Check
            type='switch'
            label={langs(Instruments.Keyboardist)}
            value={Instruments.Keyboardist}
            id='keyboardist-switch'
            name='types[]'
          />
        </StyledSwitchContainer>

        <TextArea
          title={langs('Description')}
          name='description'
          maxLength={500}
        />
        <Button type='submit'>{langs('Create')}</Button>
      </StyledFormField>
    </StyledCreateGarage>
  );
};

export default CreateGarage;
