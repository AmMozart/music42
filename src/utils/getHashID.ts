export const getHashID = () => {
  const mainSession = document.querySelector(
    '.main_session'
  ) as HTMLInputElement | null;

  return mainSession ? mainSession.value : '';
};
