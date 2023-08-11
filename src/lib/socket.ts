import { io } from "socket.io-client";

export const socket = io("https://13-126-102-15.nip.io", {
  autoConnect: false,
});
