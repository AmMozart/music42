export type FetchData<T = any> = {
  status: number;
  message: string;
  data: T;
};
export type FetchState = 'idle' | 'success' | 'error' | 'loading';
export type PaymentMethod = 'PayPal' | 'Stripe' | 'Maib';
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
  id: number;
  username: string;
  email: string;
  name: string;
  admin: number;
  avatar: string;
};
export type LangsData = {
  [key: string]: string;
};

export interface GarageItemData {
  id: number;
  userId: number;
  title: string;
  image: string;
  description: string;
  peopleCount: number | null;
  existPeopleCount: number | null;
  countryId: number;
  city: string;
  address: string | null;
  startDate: string | null;
  endDate: string | null;
  userData: UserData | null;
  types: Instruments[];
  searchType: SearchType;
}

export interface GarageJoinData {
  garageId: number;
  isJoin: number;
  userData: UserData;
}

export enum Instruments {
  Bassist = 'Bassist',
  GuitarPlayer = 'Guitar Player',
  Vocalist = 'Vocalist',
  Drummer = 'Drummer',
  Keyboardist = 'Keyboardist',
}

export enum SearchType {
  AvailableToPlay = 'Available to play',
  LookingFor = 'Looking for',
}
