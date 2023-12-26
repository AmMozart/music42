import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { getGarageItems, items } from './garage.slice';
import ItemsList from './ItemList';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { GarageItemData, SearchType } from '../../app/types';
import { AddButton, ItemsNoFound } from '../../components';
import { useLangs } from '../../hooks/useLangs';
import { user } from '../user/userSlice';

const StyledGarage = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  width: 100%;
  min-height: 90vh;

  & > .title {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;

    margin-bottom: 15px;
    padding-bottom: 15px;

    font-size: 24px;
    color: #d2d2d2;

    border-bottom: 1px solid #313437;
  }
`;

const StyledGarageFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  width: 100%;
  max-width: 400px;
  height: 40px;
  margin-bottom: 10px;

  & > label {
    cursor: pointer;
  }

  & span {
    padding: 10px 0;
    transition: color 0.3s ease-in, 'border-borrom' 0.3s ease-in;
  }

  & input[type='radio']:checked ~ span {
    color: #25ff07bd;
    border-bottom: 1px solid;
  }
`;

const Garage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const garageItems = useAppSelector(items);
  const currentUser = useAppSelector(user);
  const langs = useLangs();
  const [filter, setFilter] = useState<SearchType | 'All'>('All');

  useEffect(() => {
    dispatch(getGarageItems());
  }, []);

  const handleAdd = () => {
    navigate(location.pathname + '/create');
  };

  const filteredItems: GarageItemData[] = useMemo(
    () =>
      garageItems.filter(
        (item) => item.searchType === filter || filter === 'All'
      ),
    [filter, garageItems]
  );

  const changeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value as SearchType | 'All');
  };

  return (
    <StyledGarage>
      <>
        <div className='title'>
          <svg
            width='40px'
            height='40px'
            viewBox='0 0 24 24'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M7 20H4.6C4.03995 20 3.75992 20 3.54601 19.891C3.35785 19.7951 3.20487 19.6422 3.10899 19.454C3 19.2401 3 18.9601 3 18.4V9.0398C3 8.66343 3 8.47524 3.05919 8.31095C3.1115 8.16573 3.19673 8.03458 3.30819 7.9278C3.43428 7.80699 3.60625 7.73056 3.95018 7.5777L12 4L20.0498 7.5777C20.3938 7.73056 20.5657 7.80699 20.6918 7.9278C20.8033 8.03458 20.8885 8.16573 20.9408 8.31095C21 8.47524 21 8.66343 21 9.0398V18.4C21 18.9601 21 19.2401 20.891 19.454C20.7951 19.6422 20.6422 19.7951 20.454 19.891C20.2401 20 19.9601 20 19.4 20H17M7 20H17M7 20V14M17 20V14M7 14V10H17V14M7 14H17'
              stroke='#000000'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            ></path>
          </svg>
          <span>{langs('Garage')}</span>
        </div>
        {currentUser.username ? (
          <AddButton title={langs('Create')} onClick={handleAdd} />
        ) : (
          <AddButton
            title={langs('Create')}
            data-toggle='modal'
            data-target='#login_box'
          />
        )}
        <StyledGarageFilter>
          <label>
            <input
              type='radio'
              name='filter'
              value={'All'}
              checked={filter === 'All'}
              onChange={changeFilter}
              hidden
            />
            <span>{langs('All')}</span>
          </label>
          <label>
            <input
              type='radio'
              name='filter'
              value={SearchType.LookingFor}
              checked={filter === SearchType.LookingFor}
              onChange={changeFilter}
              hidden
            />
            <span>{langs(SearchType.LookingFor)}</span>
          </label>
          <label>
            <input
              type='radio'
              name='filter'
              value={SearchType.AvailableToPlay}
              checked={filter === SearchType.AvailableToPlay}
              onChange={changeFilter}
              hidden
            />
            <span>{langs(SearchType.AvailableToPlay)}</span>
          </label>
        </StyledGarageFilter>
        {filteredItems.length === 0 ? (
          <ItemsNoFound title={langs('No Garages Found')} />
        ) : (
          <ItemsList items={filteredItems} />
        )}
      </>
    </StyledGarage>
  );
};

export default Garage;
