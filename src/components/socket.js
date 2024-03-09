import { io } from 'socket.io-client';
import { backendHost } from './routes';

const URL = process.env.NODE_ENV === 'production' ? undefined : backendHost;

export const socket = io(URL, {
    autoConnect: false
});
  