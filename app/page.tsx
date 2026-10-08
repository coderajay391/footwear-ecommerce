import React from 'react';
import { StoreProvider } from '@/context/StoreContext';
import MainApp from '@/components/MainApp';

export default function Page() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}
