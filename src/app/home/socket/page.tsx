"use client";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
function App() {
  useEffect(() => {
    const newSocket = io("http://localhost:3001");

    newSocket.on("connection", (socket) => {
      console.log("user connected", socket.id);
    });
  }, []);

  return <p>Its</p>;
}

export default App;
