import { io } from "socket.io-client";

export const socket = io("xenons.ankitdev.in:3001", {
  autoConnect: false,
  secure: true,
});
