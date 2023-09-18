import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import {
  buyPayPal,
  buyStripe,
  buyInfo,
  changeBuyTicketCount,
  changeBuyTicketEventId,
  getEventData,
  setPaymentMethod,
  setUserEmail,
  setUserName,
} from './ticketBuySlice';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Message } from '../../components';
import { configFromDB } from '../config/configSlice';
import {
  fetchExpressSignup,
  userId,
} from '../expressSignUp/expressSignUpSlice';

const StyledTicketBuy = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  margin-top: -30px;

  & button {
    margin-bottom: 30px;
    padding: 25px 60px;
  }

  & p {
    text-align: center;
  }

  & .pay-method {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  & .paypal-method,
  & .stripe-method {
    cursor: pointer;
    padding: 0 20px 20px 0;
  }

  & .total-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    width: 220px;
    padding: 20px 0;

    border-top: 1px dashed;
  }

  & .total-container .total-sum {
    padding: 0 5px;
    font: 400 normal 22px Arial, sans-serif;
    text-align: right;
  }

  & .total-container .commission {
    padding: 0 5px;
    font: 300 italic 12px Arial, sans-serif;
    text-align: right;
  }

  & > * {
    width: 300px;
  }
`;

const TicketBuy: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const { eventId } = useParams();
  const dispatch = useAppDispatch();
  const buyTicketInfo = useAppSelector(buyInfo);
  const config = useAppSelector(configFromDB);
  const currentUserId = useAppSelector(userId);

  useEffect(() => {
    if (eventId) {
      dispatch(changeBuyTicketEventId(+eventId));
      dispatch(getEventData(+eventId));
    }
  }, [eventId]);

  useEffect(() => {
    if (currentUserId) {
      if (buyTicketInfo.paymentMethod === 'PayPal') {
        dispatch(
          buyPayPal({
            price: buyTicketInfo.finalPrice,
            eventId: buyTicketInfo.eventId,
            userId: currentUserId,
            countTickets: buyTicketInfo.count,
          })
        );
      }
      if (buyTicketInfo.paymentMethod === 'Stripe') {
        dispatch(
          buyStripe({
            stripeKey: config.stripe_id,
            price: buyTicketInfo.finalPrice,
            eventId: buyTicketInfo.eventId,
            userId: currentUserId,
            countTickets: buyTicketInfo.count,
          })
        );
      }
    }
  }, [currentUserId]);

  useEffect(() => {
    if (buyTicketInfo.paymentUrl) {
      location.href = buyTicketInfo.paymentUrl;
    }
  }, [buyTicketInfo]);

  const changeTicketCount: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = +e.currentTarget.value;
    if (value > 0 && value <= buyTicketInfo.availableCount)
      dispatch(changeBuyTicketCount(value));
  };

  const handleBlur: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.currentTarget.value = buyTicketInfo.count.toString();
  };

  const buyTicket: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (buyTicketInfo.userName && buyTicketInfo.userEmail) {
      dispatch(
        fetchExpressSignup({
          username: buyTicketInfo.userName,
          email: buyTicketInfo.userEmail,
        })
      );
      return;
    }

    setShowMessage(true);
  };

  const changeUserName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setShowMessage(false);
    dispatch(setUserName(e.currentTarget.value));
  };

  const changeUserEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setShowMessage(false);
    dispatch(setUserEmail(e.currentTarget.value));
  };

  const setPayPalMethod: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.currentTarget.checked) dispatch(setPaymentMethod('PayPal'));
  };

  const setStripeMethod: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.currentTarget.checked) dispatch(setPaymentMethod('Stripe'));
  };

  return (
    <StyledTicketBuy>
      <h3>Оформление заказа</h3>
      {showMessage && (
        <Message value='Ошибка! Заполните все поля' type='error' />
      )}
      <div className='form-group mat_input float'>
        <input
          type='number'
          min={1}
          max={buyTicketInfo.availableCount}
          name='ticket_count'
          className='form-control'
          defaultValue={buyTicketInfo.count}
          onChange={changeTicketCount}
          onBlur={handleBlur}
        />
        <label className='col-md-3 col-form-label' htmlFor='ticket_count'>
          Колличество Билетов (всего: {buyTicketInfo.availableCount})
        </label>
      </div>
      <div className='form-group mat_input float'>
        <input
          type='text'
          name='username'
          className='form-control'
          placeholder=' '
          value={buyTicketInfo.userName}
          onChange={changeUserName}
        />
        <label className='col-md-3 col-form-label' htmlFor='username'>
          Имя покупателя
        </label>
      </div>
      <div className='form-group mat_input float'>
        <input
          type='email'
          name='email'
          className='form-control'
          placeholder=' '
          onChange={changeUserEmail}
          value={buyTicketInfo.userEmail}
        />
        <label className='col-md-3 col-form-label' htmlFor='email'>
          Email покупателя
        </label>
      </div>
      <p>Выберите метод оплаты:</p>
      <div className='pay-method'>
        <div className='paypal-method'>
          <input
            type={'radio'}
            id='payPalMethod'
            name={'payMethod'}
            value={'PayPal'}
            onChange={setPayPalMethod}
            checked={buyTicketInfo.paymentMethod === 'PayPal'}
          />
          <label htmlFor='payPalMethod'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
            >
              <path
                fill='#283593'
                d='M8.32,21.97C8.21,21.92 8.08,21.76 8.06,21.65C8.03,21.5 8,21.76 8.66,17.56C9.26,13.76 9.25,13.82 9.33,13.71C9.46,13.54 9.44,13.54 10.94,13.53C12.26,13.5 12.54,13.5 13.13,13.41C16.38,12.96 18.39,11.05 19.09,7.75C19.13,7.53 19.17,7.34 19.18,7.34C19.18,7.33 19.25,7.38 19.33,7.44C20.36,8.22 20.71,9.66 20.32,11.58C19.86,13.87 18.64,15.39 16.74,16.04C15.93,16.32 15.25,16.43 14.05,16.46C13.25,16.5 13.23,16.5 13,16.65C12.83,16.82 12.84,16.79 12.45,19.2C12.18,20.9 12.08,21.45 12.04,21.55C11.97,21.71 11.83,21.85 11.67,21.93L11.56,22H10C8.71,22 8.38,22 8.32,21.97V21.97M3.82,19.74C3.63,19.64 3.5,19.47 3.5,19.27C3.5,19 6.11,2.68 6.18,2.5C6.27,2.32 6.5,2.13 6.68,2.06L6.83,2H10.36C14.27,2 14.12,2 15,2.2C17.62,2.75 18.82,4.5 18.37,7.13C17.87,10.06 16.39,11.8 13.87,12.43C13,12.64 12.39,12.7 10.73,12.7C9.42,12.7 9.32,12.71 9.06,12.85C8.8,13 8.59,13.27 8.5,13.6C8.46,13.67 8.23,15.07 7.97,16.7C7.71,18.33 7.5,19.69 7.5,19.72L7.47,19.78H5.69C4.11,19.78 3.89,19.78 3.82,19.74V19.74Z'
              ></path>
            </svg>
            PayPal
          </label>
        </div>
        <div className='stripe-method'>
          <input
            type={'radio'}
            id='stripeMethod'
            name={'payMethod'}
            value='Stripe'
            onChange={setStripeMethod}
            checked={buyTicketInfo.paymentMethod === 'Stripe'}
          />
          <label htmlFor='stripeMethod'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
            >
              <path
                fill='#6BBEA1'
                d='M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z'
              ></path>
            </svg>
            Credit Card
          </label>
        </div>
      </div>
      <div className={'total-container'}>
        {buyTicketInfo.paymentMethod === 'PayPal' && (
          <span className={'commission'}>
            Комиссия : {buyTicketInfo.commission} {config?.currency_symbol}
          </span>
        )}
        <span className={'total-sum'}>
          Итого: {buyTicketInfo.finalPrice} {config?.currency_symbol}
        </span>
      </div>
      <button
        className='btn btn-primary btn-mat'
        onClick={buyTicket}
        disabled={buyTicketInfo.isLoading !== 'idle'}
      >
        {buyTicketInfo.isLoading !== 'idle'
          ? 'Пожалуйста Подождите...'
          : 'Оформить Заказ'}
      </button>
    </StyledTicketBuy>
  );
};

export default TicketBuy;
