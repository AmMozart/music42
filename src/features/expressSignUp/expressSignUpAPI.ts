import { getHashID } from '../../utils/getHashID';

const expressSignup = (username: string, email: string, password = '') => {
  const fd = new FormData();
  fd.append('username', username);
  fd.append('email', email);
  fd.append('password', password);
  fd.append('hash_id', getHashID());

  return fetch('https://music42.com/endpoints/user/express-signup', {
    method: 'POST',
    body: fd,
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch(function (error) {
      console.error('Error:', error);
    });
};

export { expressSignup };
