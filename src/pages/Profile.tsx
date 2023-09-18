import React, { useEffect } from 'react';
import { Root, createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { useParams } from 'react-router-dom';

import { store } from '../app/store';
import ProfilePictures from '../features/profilePictures/ProfilePictures';
import ProfileVideo from '../features/profileVideo/ProfileVideo';

const Profile: React.FC = () => {
  const { option } = useParams();
  const pages = ['pictures', 'video'];

  useEffect(() => {
    const containerProfile = document.getElementById(
      'container_content_profile'
    ) as HTMLElement;

    let rootProfile: Root | null = null;

    if (option && pages.includes(option)) {
      rootProfile = createRoot(containerProfile);

      rootProfile.render(
        <React.StrictMode>
          <Provider store={store}>
            {option == 'pictures' && <ProfilePictures />}
            {option == 'video' && <ProfileVideo />}
          </Provider>
        </React.StrictMode>
      );
    }

    return () => {
      rootProfile && rootProfile.unmount();
    };
  }, [option]);

  return null;
};

export default Profile;
