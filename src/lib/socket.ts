import { io } from "socket.io-client";

export const socket = io("http://xenons.ankitdev.in:3001", {
  autoConnect: false,
  secure:true,
});
