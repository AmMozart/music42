import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { deleteGarageItem } from './garage.slice';

import MusicalInstruments from './MusicalInstruments';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { GarageItemData, SearchType } from '../../app/types';
import { OptionButton, OptionItem, OptionsWindow } from '../../components';
import { device } from '../../device';
import { useLangs } from '../../hooks/useLangs';
import { getCountryNameById } from '../../models/countryOptions';
import { user } from '../user/userSlice';

const StyledItem = styled.div`
  cursor: pointer;

  position: relative;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: space-between;

  width: 280px;
  height: 400px;

  background: #1c1c1c;
  border: 1px solid #000;
  border-radius: 15px;
  box-shadow: rgb(55 55 55) 0 0 10px 0;
  box-shadow: 0 0 10px #1c1c1c;

  & .top-part {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 375px;
  }

  & .place {
    display: flex;
    flex-direction: column;
    gap: 10px;

    width: 100%;

    font-size: 12px;
  }

  & .people {
    display: flex;
    gap: 10px;
    align-items: center;
    align-self: flex-end;
    justify-content: space-between;

    width: 100%;
    padding: 0 10px;

    color: var(--second-color);

    fill: var(--main-color);
  }

  & .people .count {
    display: flex;
    gap: 10px;
  }

  & img {
    width: 100%;
    max-width: 100%;
    height: 180px;
    max-height: 180px;

    object-fit: cover;
  }

  &:hover {
    transform: scale(1.01);
    background: #0f03;
    border: 1px solid #00ff004d;
  }

  & h6 {
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & .description {
    overflow: hidden;

    width: 100%;
    height: 50px;

    font-weight: 300;
    text-overflow: ellipsis;
  }

  & .place div span {
    padding-left: 10px;
  }

  & .garage-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 100%;
    height: 100%;
  }

  & .garage-banner {
    position: relative;
  }

  @media ${device.tabletM} {
    width: 100%;
  }
`;

const StyledInfo = styled.div`
  width: 100%;
  padding: 10px;
`;

const StyledDate = styled.div`
  display: flex;

  & > div {
    display: flex;
    flex-direction: column;
  }
`;

const StyledUserName = styled.div`
  overflow: hidden;

  width: 150px;

  font-size: 10px;
  color: #d2d2d2;
  word-wrap: break-word;
`;

interface ItemProps {
  item: GarageItemData;
}

const Item: React.FC<ItemProps> = ({ item }) => {
  const [showOptions, setShowOptions] = useState(false);
  const currentUser = useAppSelector(user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const langs = useLangs();

  const openOptions = () => {
    setShowOptions(true);
  };

  const handleEditClick = () => {
    setShowOptions(false);
    navigate(`${location.pathname}/edit/${item.id}`);
  };

  const handleDeleteClick = () => {
    setShowOptions(false);
    dispatch(deleteGarageItem(item.id));
  };

  const openItem = () => {
    navigate(`/garage/view/${item.id}`);
  };

  return (
    <StyledItem>
      <div className='garage-card' onClick={openItem}>
        <div className='top-part'>
          <div className='garage-banner'>
            <img src={item.image} alt='Poster' />
            <MusicalInstruments types={item.types} />
          </div>
          <StyledInfo>
            <h6>{item.title}</h6>
            <div className='description'>{item.description}</div>
            <div className='place'>
              <div>
                <svg
                  width='22'
                  height='22'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill='currentColor'
                    d='M12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0L12 23.728zm4.95-7.778a7 7 0 1 0-9.9 0L12 20.9l4.95-4.95zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z'
                  ></path>
                </svg>
                <span>{getCountryNameById(item.countryId)}, </span>
                <span>{item.city}, </span>
                <span>{item.address}</span>
              </div>
              {item.searchType === SearchType.LookingFor && (
                <StyledDate>
                  <svg
                    width='22'
                    height='22'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill='currentColor'
                      d='M17 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2v2h6V1h2v2zm3 8H4v8h16v-8zm-5-6H9v2H7V5H4v4h16V5h-3v2h-2V5zm-9 8h2v2H6v-2zm5 0h2v2h-2v-2zm5 0h2v2h-2v-2z'
                    ></path>
                  </svg>
                  <span>
                    {langs('Start')}:{' '}
                    {new Date(item.startDate || '').toLocaleTimeString([], {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  <span>
                    {langs('End')}:{' '}
                    {new Date(item.endDate || '').toLocaleTimeString([], {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </StyledDate>
              )}
            </div>
          </StyledInfo>
        </div>

        <div className='people'>
          <StyledUserName>{item.userData?.name}</StyledUserName>
          {item.searchType === SearchType.LookingFor && (
            <div className='count'>
              <svg
                width='24px'
                height='24px'
                viewBox='0 0 32 32'
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M23.313 26.102l-6.296-3.488c2.34-1.841 2.976-5.459 2.976-7.488v-4.223c0-2.796-3.715-5.91-7.447-5.91-3.73 0-7.544 3.114-7.544 5.91v4.223c0 1.845 0.78 5.576 3.144 7.472l-6.458 3.503s-1.688 0.752-1.688 1.689v2.534c0 0.933 0.757 1.689 1.688 1.689h21.625c0.931 0 1.688-0.757 1.688-1.689v-2.534c0-0.994-1.689-1.689-1.689-1.689zM23.001 30.015h-21.001v-1.788c0.143-0.105 0.344-0.226 0.502-0.298 0.047-0.021 0.094-0.044 0.139-0.070l6.459-3.503c0.589-0.32 0.979-0.912 1.039-1.579s-0.219-1.32-0.741-1.739c-1.677-1.345-2.396-4.322-2.396-5.911v-4.223c0-1.437 2.708-3.91 5.544-3.91 2.889 0 5.447 2.44 5.447 3.91v4.223c0 1.566-0.486 4.557-2.212 5.915-0.528 0.416-0.813 1.070-0.757 1.739s0.446 1.267 1.035 1.589l6.296 3.488c0.055 0.030 0.126 0.063 0.184 0.089 0.148 0.063 0.329 0.167 0.462 0.259v1.809zM30.312 21.123l-6.39-3.488c2.34-1.841 3.070-5.459 3.070-7.488v-4.223c0-2.796-3.808-5.941-7.54-5.941-2.425 0-4.904 1.319-6.347 3.007 0.823 0.051 1.73 0.052 2.514 0.302 1.054-0.821 2.386-1.308 3.833-1.308 2.889 0 5.54 2.47 5.54 3.941v4.223c0 1.566-0.58 4.557-2.305 5.915-0.529 0.416-0.813 1.070-0.757 1.739 0.056 0.67 0.445 1.267 1.035 1.589l6.39 3.488c0.055 0.030 0.126 0.063 0.184 0.089 0.148 0.063 0.329 0.167 0.462 0.259v1.779h-4.037c0.61 0.46 0.794 1.118 1.031 2h3.319c0.931 0 1.688-0.757 1.688-1.689v-2.503c-0.001-0.995-1.689-1.691-1.689-1.691z'></path>
              </svg>
              <span>{item.peopleCount}</span> /{' '}
              <span> {item.existPeopleCount}</span>
            </div>
          )}
        </div>
      </div>
      {(currentUser.id === item.userId || currentUser.admin > 0) && (
        <>
          <OptionButton onClick={openOptions} />
          <OptionsWindow show={showOptions}>
            <OptionItem
              title={langs('Edit')}
              type='edit'
              onClick={handleEditClick}
            />
            <OptionItem
              title={langs('Delete')}
              type='delete'
              onClick={handleDeleteClick}
            />
          </OptionsWindow>
        </>
      )}
    </StyledItem>
  );
};

export default Item;
