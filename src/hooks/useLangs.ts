import { useAppSelector } from '../app/hooks';
import { langs as languages } from '../features/langs/langs.slice';

const useLangs = () => {
  const langsData = useAppSelector(languages);

  const langs = (text: string) =>
    langsData[text.toLowerCase().replace(/[^a-zA-Z]/g, '_')] || text;

  return langs;
};

export { useLangs };
