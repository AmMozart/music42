export type FetchData<T = any> = {
  status: number;
  message: string;
  data: T;
};
export type FetchState = 'idle' | 'success' | 'error' | 'loading';
export type PaymentMethod = 'PayPal' | 'Stripe';
export type PictureData = {
  id: number;
  user_id: number;
  url: string;
  name: string;
};
export interface VideoData {
  id: number;
  url: string;
  title: string;
}
export type UserData = {
  username: string;
  email: string;
  admin: number;
};
export type LangsData = {
  [key: string]: string;
};
