import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import {
  fetchNewItemData,
  getGarageItem,
  items,
  resetNewItem,
  updateGarageItem,
} from './garage.slice';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { GarageItemData, Instruments, SearchType } from '../../app/types';
import { FileInput, Message } from '../../components';
import { DateTime, Input, Select, TextArea } from '../../components/UI';
import { device } from '../../device';
import { useLangs } from '../../hooks/useLangs';
import {
  getCountryIndexById,
  getCountryOptions,
} from '../../models/countryOptions';

const StyledEditGarage = styled.form`
  overflow: hidden;

  width: 730px;
  margin: 40px;

  background: #161616;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 20%);

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

const EditGarage: React.FC = () => {
  const [item, setItem] = useState<GarageItemData>();
  const dispatch = useAppDispatch();
  const allItems = useAppSelector(items);
  const { id } = useParams();
  const fetchNewItemState = useAppSelector(fetchNewItemData);
  const navigate = useNavigate();
  const langs = useLangs();

  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [peopleCount, setPeopleCount] = useState(0);
  const [existPeopleCount, setExistPeopleCount] = useState(0);
  const [description, setDescription] = useState('');
  const [countryId, setCountryId] = useState(0);
  const [image, setImage] = useState('');
  const [types, setTypes] = useState<string[]>([]);
  const [searchType, setSearchType] = useState(SearchType.LookingFor);

  useEffect(() => {
    if (id) {
      dispatch(getGarageItem(+id));
    }
  }, []);

  useEffect(() => {
    if (allItems) {
      const findItem = allItems.find((item) => item.id === Number(id));
      if (findItem) {
        setItem(findItem);
        setTitle(findItem.title);
        setCity(findItem.city);
        setAddress(findItem.address || '');
        setPeopleCount(findItem.peopleCount || 0);
        setExistPeopleCount(findItem.existPeopleCount || 0);
        setDescription(findItem.description);
        setCountryId(findItem.countryId);
        setImage('/' + findItem.image);
        setTypes(findItem.types);
        setSearchType(findItem.searchType);
      }
    }
  }, [allItems]);

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
    if (e.target instanceof HTMLFormElement && item) {
      dispatch(updateGarageItem({ id: item.id, form: e.target }));
    }
  };

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const changeCity = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const changeAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const changePeopleCount = (e: ChangeEvent<HTMLInputElement>) => {
    setPeopleCount(+e.target.value);
  };

  const changeExistPeopleCount = (e: ChangeEvent<HTMLInputElement>) => {
    setExistPeopleCount(+e.target.value);
  };

  const changeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const changeCountryId = (e: ChangeEvent<HTMLSelectElement>) => {
    setCountryId(+e.target.value);
  };

  const changeTypes = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setTypes([...types, e.target.value]);
    } else {
      setTypes(types.filter((t) => t !== e.target.value));
    }
  };

  const changeSearchType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchType(e.target.value as SearchType);
  };

  const dataTimeOptions = {
    enableTime: true,
    dateFormat: 'Y-m-d H:i',
    minDate: 'today',
  };

  return (
    <StyledEditGarage onSubmit={submitHandle}>
      <FileInput src={image} />
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
          value={title}
          onChange={changeTitle}
          maxLength={100}
        />
        <StyledRow>
          <Select
            title={langs('Country')}
            options={getCountryOptions()}
            selectedOptionIdx={getCountryIndexById(countryId)}
            name='country_id'
            onChange={changeCountryId}
          />
          <Input
            type='text'
            title={langs('City')}
            name='city'
            value={city}
            onChange={changeCity}
            maxLength={100}
          />
        </StyledRow>
        {searchType === SearchType.LookingFor && (
          <>
            <Input
              type='text'
              title={langs('Address')}
              name='address'
              value={address}
              onChange={changeAddress}
              maxLength={100}
            />
            <StyledRow>
              <DateTime
                title={langs('Start Date')}
                name='startDate'
                options={dataTimeOptions}
                value={(item?.startDate && item.startDate) || ''}
              />
              <DateTime
                title={langs('End Date')}
                name='endDate'
                options={dataTimeOptions}
                value={(item?.endDate && item.endDate) || ''}
              />
            </StyledRow>

            <StyledRow>
              <Input
                type='number'
                title={langs('People Count')}
                name='peopleCount'
                value={peopleCount}
                onChange={changePeopleCount}
                min={0}
                max={100}
              />
              <Input
                type='number'
                title={langs('Exist People Count')}
                name='existPeopleCount'
                value={existPeopleCount}
                onChange={changeExistPeopleCount}
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
            checked={types.includes(Instruments.Bassist)}
            onChange={changeTypes}
          />
          <Form.Check
            type='switch'
            label={langs(Instruments.GuitarPlayer)}
            value={Instruments.GuitarPlayer}
            id='guitar-switch'
            name='types[]'
            checked={types.includes(Instruments.GuitarPlayer)}
            onChange={changeTypes}
          />
          <Form.Check
            type='switch'
            label={langs(Instruments.Vocalist)}
            value={Instruments.Vocalist}
            id='vocalist-switch'
            name='types[]'
            checked={types.includes(Instruments.Vocalist)}
            onChange={changeTypes}
          />
          <Form.Check
            type='switch'
            label={langs(Instruments.Drummer)}
            value={Instruments.Drummer}
            id='drummer-switch'
            name='types[]'
            checked={types.includes(Instruments.Drummer)}
            onChange={changeTypes}
          />
          <Form.Check
            type='switch'
            label={langs(Instruments.Keyboardist)}
            value={Instruments.Keyboardist}
            id='keyboardist-switch'
            name='types[]'
            checked={types.includes(Instruments.Keyboardist)}
            onChange={changeTypes}
          />
        </StyledSwitchContainer>

        <TextArea
          title={langs('Description')}
          name='description'
          value={description}
          onChange={changeDescription}
          maxLength={500}
        />
        <Button type='submit'>Submit</Button>
      </StyledFormField>
    </StyledEditGarage>
  );
};

export default EditGarage;
