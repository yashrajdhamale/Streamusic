import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';

// preview-start
const providers = [
  { id: 'spotify', name: 'Spotify' },
  { id: 'jiosaavn', name: 'JioSaavn' },
  { id: 'gaana', name: 'Gaana' },
  { id: 'youtube', name: 'YouTube Music' }
];

// preview-end

const signIn = async (provider) => {
  // preview-start
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Sign in with ${provider.id}`);
      resolve({ error: 'This is a fake error' });
    }, 500);
  });
  // preview-end
  return promise;
};

export default function OAuthSignInPage() {
  const theme = useTheme();
  return (
    // preview-start
    <AppProvider theme={theme}>
      <SignInPage signIn={signIn} providers={providers} />
    </AppProvider>
    // preview-end
  );
}
