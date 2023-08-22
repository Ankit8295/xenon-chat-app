import { io } from "socket.io-client";

export const socket = io("https://socket.ankitdev.in:3001", {
  autoConnect: false,
});
