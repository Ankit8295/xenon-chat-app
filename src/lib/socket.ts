import { io } from "socket.io-client";

export const socket = io("https://xenons.ankitdev.in:443", {
  autoConnect: false,
  secure: true,
});
