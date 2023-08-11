import { io } from "socket.io-client";

export const socket = io(
  "http://ec2-13-126-102-15.ap-south-1.compute.amazonaws.com:3001",
  {
    autoConnect: false,
  }
);
