import { io } from "socket.io-client";

export const socket = io("https://xenons.ankitdev.in:3001", {
  autoConnect: false,
  secure: true,
});
