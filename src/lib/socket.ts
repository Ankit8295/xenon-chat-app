import { io } from "socket.io-client";

export const socket = io("52.54.204.49:3001", {
  autoConnect: false,
});
