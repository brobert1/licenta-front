'use client';

import { MultiplayerProvider } from '@contexts/MultiplayerContext';

const ClientSocketProvider = ({ children }) => <MultiplayerProvider>{children}</MultiplayerProvider>;

export default ClientSocketProvider;
