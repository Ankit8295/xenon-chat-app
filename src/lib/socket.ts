import { io } from "socket.io-client";

export const socket = io("3.6.108.237:3001", {
  autoConnect: false,
  secure:true,
});
