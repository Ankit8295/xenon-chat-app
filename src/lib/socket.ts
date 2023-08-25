import { io } from "socket.io-client";

export const socket = io("https://35.154.79.146:8443/", {
  autoConnect: false,
  secure: true,
});
