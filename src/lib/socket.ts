import { io } from "socket.io-client";

export const socket = io("https://xenonchat.ankitdev.in:8443/", {
  autoConnect: false,
  secure: true,
});
