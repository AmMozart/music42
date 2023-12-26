import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import {
  getGarageItem,
  getJoinGarage,
  items,
  join,
  joinData,
} from './garage.slice';

import MusicalInstruments from './MusicalInstruments';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { GarageItemData, SearchType } from '../../app/types';
import { DateTimeTablo } from '../../components';
import { device } from '../../device';
import { useLangs } from '../../hooks/useLangs';
import { getCountryNameById } from '../../models/countryOptions';
import { getUserData, user } from '../user/userSlice';

const StyledViewGarage = styled.section`
  margin-top: -40px;

  & .garage-view-instruments {
    position: relative;

    width: 100%;
    height: 70px;
    margin-top: 20px;
    padding: 10px;

    text-align: right;
  }
`;

const StyledImage = styled.div`
  position: relative;

  overflow: hidden;
  display: block;

  height: 0;
  min-height: 100%;
  max-height: 100%;
  padding: 0;
  padding-bottom: 40%;

  & img {
    position: absolute;
    inset: 50% 0 0 50%;
    transform: translate(-50%, -50%);

    display: block;

    width: 100%;
    height: 100%;

    object-fit: contain;
  }

  @media ${device.laptop} {
    padding-bottom: 40%;
  }

  @media ${device.tabletM} {
    padding-bottom: 65%;
  }
`;

const StyledContainer = styled.div`
  width: 100%;
  max-width: 540px;
  margin-right: auto;
  margin-left: auto;
  padding: 15px;

  background: #161616;
  border-radius: 8px;

  @media ${device.laptopL} {
    max-width: 786px;
  }

  @media ${device.laptop} {
    max-width: 940px;
  }

  @media ${device.tabletL} {
    max-width: 720px;
  }

  @media ${device.tabletM} {
    max-width: 540px;
  }
`;

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButtonList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
`;

const StyledUserName = styled.div`
  cursor: pointer;
  transition: color 0.3s ease-in;

  &:hover {
    color: white;
  }
`;

const ViewGarage: React.FC = () => {
  const [item, setItem] = useState<GarageItemData>();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const allGarages = useAppSelector(items);
  const joinGarageData = useAppSelector(joinData);
  const currentUser = useAppSelector(user);
  const langs = useLangs();

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getGarageItem(+id));
      dispatch(getJoinGarage(+id));
    }
  }, [id]);

  useEffect(() => {
    if (allGarages && id) {
      const findItem = allGarages.find((garage) => garage.id === +id);

      if (findItem) {
        setItem(findItem);
      }
    }
  }, [allGarages]);

  const handleJoin = useCallback(() => {
    if (item) {
      dispatch(join(item.id));
    }
  }, [item]);

  if (!item) return null;

  return (
    <StyledViewGarage>
      <StyledImage>
        <img src={'/' + item.image} alt='User Cover' id='cover' />
      </StyledImage>
      <StyledContainer>
        <StyledMain className='d-flex align-items-start'>
          <h4>{item.title}</h4>
          <StyledUserName
            className='mt-2'
            data-load={'/' + item.userData?.username}
          >
            <svg
              width='24px'
              height='24px'
              viewBox='0 0 24 24'
              fill='currentColor'
              opacity='0.5'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M7 20H4.6C4.03995 20 3.75992 20 3.54601 19.891C3.35785 19.7951 3.20487 19.6422 3.10899 19.454C3 19.2401 3 18.9601 3 18.4V9.0398C3 8.66343 3 8.47524 3.05919 8.31095C3.1115 8.16573 3.19673 8.03458 3.30819 7.9278C3.43428 7.80699 3.60625 7.73056 3.95018 7.5777L12 4L20.0498 7.5777C20.3938 7.73056 20.5657 7.80699 20.6918 7.9278C20.8033 8.03458 20.8885 8.16573 20.9408 8.31095C21 8.47524 21 8.66343 21 9.0398V18.4C21 18.9601 21 19.2401 20.891 19.454C20.7951 19.6422 20.6422 19.7951 20.454 19.891C20.2401 20 19.9601 20 19.4 20H17M7 20H17M7 20V14M17 20V14M7 14V10H17V14M7 14H17'
                stroke='#000000'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
              ></path>
            </svg>{' '}
            <span>{item.userData?.username}</span>
          </StyledUserName>
          {item.searchType === SearchType.LookingFor && (
            <>
              <div className='mt-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='mr-1'
                  opacity='0.5'
                  width='22'
                  height='22'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M17 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2v2h6V1h2v2zm3 8H4v8h16v-8zm-5-6H9v2H7V5H4v4h16V5h-3v2h-2V5zm-9 8h2v2H6v-2zm5 0h2v2h-2v-2zm5 0h2v2h-2v-2z'
                  ></path>
                </svg>{' '}
                <span className='event-time'>
                  <span>
                    {new Date(item.startDate || '').toLocaleTimeString([], {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  &nbsp;&nbsp;•&nbsp;&nbsp;
                  <span>
                    {new Date(item.endDate || '').toLocaleTimeString([], {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </span>
              </div>

              <div className='mt-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='mr-1'
                  opacity='0.5'
                  width='22'
                  height='22'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M9.55 11.5a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5zm.45 8.248V16.4c0-.488.144-.937.404-1.338a6.473 6.473 0 0 0-5.033 1.417A8.012 8.012 0 0 0 10 19.749zM4.453 14.66A8.462 8.462 0 0 1 9.5 13c1.043 0 2.043.188 2.967.532.878-.343 1.925-.532 3.033-.532 1.66 0 3.185.424 4.206 1.156a8 8 0 1 0-15.253.504zm14.426 1.426C18.486 15.553 17.171 15 15.5 15c-2.006 0-3.5.797-3.5 1.4V20a7.996 7.996 0 0 0 6.88-3.914zM12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm3.5-9.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4z'
                  ></path>
                </svg>{' '}
                <span id='joined_people_count'>
                  {item.peopleCount} / {item.existPeopleCount}
                </span>{' '}
                {langs('members')}
              </div>
            </>
          )}
          <div className='mt-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='mr-1'
              opacity='0.5'
              width='22'
              height='22'
              viewBox='0 0 24 24'
            >
              <path
                fill='currentColor'
                d='M12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0L12 23.728zm4.95-7.778a7 7 0 1 0-9.9 0L12 20.9l4.95-4.95zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z'
              ></path>
            </svg>{' '}
            Расположение: {getCountryNameById(item.countryId)}, {item.city},{' '}
            {item.address}
          </div>

          <div className='garage-view-instruments'>
            {item.searchType === SearchType.LookingFor && (
              <span>{langs('The following musicians are needed:')}</span>
            )}
            {item.searchType === SearchType.AvailableToPlay && (
              <span>{langs('I play on:')}</span>
            )}
            <MusicalInstruments types={item.types} />
          </div>

          <StyledButtonList className='ap_options view_event_btns'>
            {item.searchType === SearchType.LookingFor && (
              <span id='going-219'>
                {currentUser.username ? (
                  joinGarageData === null && (
                    <button
                      onClick={handleJoin}
                      type='button'
                      className='btn btn-primary btn-mat'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                      >
                        <path
                          fill='currentColor'
                          d='M10.74,11.72C11.21,12.95 11.16,14.23 9.75,14.74C6.85,15.81 6.2,13 6.16,12.86L10.74,11.72M5.71,10.91L10.03,9.84C9.84,8.79 10.13,7.74 10.13,6.5C10.13,4.82 8.8,1.53 6.68,2.06C4.26,2.66 3.91,5.35 4,6.65C4.12,7.95 5.64,10.73 5.71,10.91M17.85,19.85C17.82,20 17.16,22.8 14.26,21.74C12.86,21.22 12.8,19.94 13.27,18.71L17.85,19.85M20,13.65C20.1,12.35 19.76,9.65 17.33,9.05C15.22,8.5 13.89,11.81 13.89,13.5C13.89,14.73 14.17,15.78 14,16.83L18.3,17.9C18.38,17.72 19.89,14.94 20,13.65Z'
                        ></path>
                      </svg>{' '}
                      <span className='button-text'>{langs('Join')}</span>
                    </button>
                  )
                ) : (
                  <button
                    data-toggle='modal'
                    data-target='#login_box'
                    type='button'
                    className='btn btn-primary btn-mat'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M10.74,11.72C11.21,12.95 11.16,14.23 9.75,14.74C6.85,15.81 6.2,13 6.16,12.86L10.74,11.72M5.71,10.91L10.03,9.84C9.84,8.79 10.13,7.74 10.13,6.5C10.13,4.82 8.8,1.53 6.68,2.06C4.26,2.66 3.91,5.35 4,6.65C4.12,7.95 5.64,10.73 5.71,10.91M17.85,19.85C17.82,20 17.16,22.8 14.26,21.74C12.86,21.22 12.8,19.94 13.27,18.71L17.85,19.85M20,13.65C20.1,12.35 19.76,9.65 17.33,9.05C15.22,8.5 13.89,11.81 13.89,13.5C13.89,14.73 14.17,15.78 14,16.83L18.3,17.9C18.38,17.72 19.89,14.94 20,13.65Z'
                      ></path>
                    </svg>{' '}
                    <span className='button-text'>{langs('Join')}</span>
                  </button>
                )}

                {joinGarageData?.isJoin === null && (
                  <button type='button' className='btn btn-warning btn-mat'>
                    <span className='button-text'>
                      {langs('On Consideration')}
                    </span>
                  </button>
                )}

                {joinGarageData?.isJoin === 0 && (
                  <button type='button' className='btn btn-danger btn-mat'>
                    <span className='button-text'>{langs('You Denied')}</span>
                  </button>
                )}

                {joinGarageData?.isJoin === 1 && (
                  <button type='button' className='btn btn-info btn-mat'>
                    <span className='button-text'>{langs('You Accept')}</span>
                  </button>
                )}
              </span>
            )}

            {currentUser.username ? (
              currentUser.id !== item.userId && (
                <button
                  className='btn btn-message'
                  data-id={item.userData && item.userData.username}
                  data-load={`messages/${
                    item.userData && item.userData.username
                  }`}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill='currentColor'
                      d='M12,3C17.5,3 22,6.58 22,11C22,15.42 17.5,19 12,19C10.76,19 9.57,18.82 8.47,18.5C5.55,21 2,21 2,21C4.33,18.67 4.7,17.1 4.75,16.5C3.05,15.07 2,13.13 2,11C2,6.58 6.5,3 12,3M17,12V10H15V12H17M13,12V10H11V12H13M9,12V10H7V12H9Z'
                    ></path>
                  </svg>{' '}
                  {langs('Message')}
                </button>
              )
            ) : (
              <button
                className='btn btn-message'
                data-toggle='modal'
                data-target='#login_box'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M12,3C17.5,3 22,6.58 22,11C22,15.42 17.5,19 12,19C10.76,19 9.57,18.82 8.47,18.5C5.55,21 2,21 2,21C4.33,18.67 4.7,17.1 4.75,16.5C3.05,15.07 2,13.13 2,11C2,6.58 6.5,3 12,3M17,12V10H15V12H17M13,12V10H11V12H13M9,12V10H7V12H9Z'
                  ></path>
                </svg>{' '}
                {langs('Message')}
              </button>
            )}
          </StyledButtonList>
        </StyledMain>

        <hr className='my-4' />
        <div className='col-lg-9'>
          <div className='feed_post_block'>{item.description}</div>
        </div>
        {item.searchType === SearchType.LookingFor && (
          <DateTimeTablo date={new Date(item.startDate || '')} />
        )}
      </StyledContainer>
    </StyledViewGarage>
  );
};

export default ViewGarage;
