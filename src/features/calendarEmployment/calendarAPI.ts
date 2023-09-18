import { CalendarEmploymentData } from './calendarSlice';

import { getHashID } from '../../utils/getHashID';

const getCalendarEmploymentData: (
  username: string
) => Promise<CalendarEmploymentData[]> = async (username) => {
  const response = await fetch(
    'https://music42.com/endpoints/calendar_employment?' +
      new URLSearchParams({
        username: username,
        hash_id: getHashID(),
      }).toString(),
    {
      method: 'GET',
    }
  );

  if (response.ok) {
    const data = (await response.json()) as {
      result: CalendarEmploymentData[];
    };
    return data.result;
  }
  return [];
};

export { getCalendarEmploymentData };
