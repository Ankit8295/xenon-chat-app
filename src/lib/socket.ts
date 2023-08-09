import { io } from "socket.io-client";

export const socket = io("http://13.126.102.15:3001", {
  autoConnect: false,
});
