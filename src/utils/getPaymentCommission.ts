import { PaymentMethod } from '../app/types';

const ONE_HUNDRED_PERCENT = 100;

const PAY_PAL_COMMISSION_PERCENT = 3.59;
const PAY_PAL_COMMISSION_MINIMUM_FEE = 0.5;

const STRIPE_COMMISSION_PERCENT = 3; //2.9;
const STRIPE_COMMISSION_MINIMUM_FEE = 0; //0.3;

const MAIB_COMMISSION_PERCENT = 2.5;
const MAIB_COMMISSION_MINIMUM_FEE = 0;

type GetPaymentCommission = (
  amount: number,
  paymentMethod: PaymentMethod
) => number;

const getPaymentCommission: GetPaymentCommission = (amount, paymentMethod) => {
  if (amount < 0) {
    return 0;
  }

  let commissionPercent = 0;
  let commissionMinimumFee = 0;

  if (paymentMethod === 'PayPal') {
    commissionPercent = PAY_PAL_COMMISSION_PERCENT;
    commissionMinimumFee = PAY_PAL_COMMISSION_MINIMUM_FEE;
  }
  if (paymentMethod === 'Stripe') {
    commissionPercent = STRIPE_COMMISSION_PERCENT;
    commissionMinimumFee = STRIPE_COMMISSION_MINIMUM_FEE;
  }
  if (paymentMethod === 'Maib') {
    commissionPercent = MAIB_COMMISSION_PERCENT;
    commissionMinimumFee = MAIB_COMMISSION_MINIMUM_FEE;
  }

  return +(
    (Number(amount) / ONE_HUNDRED_PERCENT) * commissionPercent +
    commissionMinimumFee
  ).toFixed(2);
};

export { getPaymentCommission };
