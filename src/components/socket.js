import { io } from 'socket.io-client';
import { backendHost } from './routes';

const URL = backendHost;

export const socket = io(URL, {
    autoConnect: false
});
  