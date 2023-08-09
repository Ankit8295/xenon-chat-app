import { io } from "socket.io-client";

export const socket = io("http://43.204.31.141:3001", {
  autoConnect: false,
});
