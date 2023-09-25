import { io } from "socket.io-client";

export const socket = io("http://localhost:8443/", {
  autoConnect: false,
  secure: true,
});
