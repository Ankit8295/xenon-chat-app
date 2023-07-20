import { Server as NetServerHttp } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer, Socket } from "net";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};
export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: ServerIO;
    };
  };
};

export async function handler(res: NextApiResponseServerIO) {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    console.log(`New Socket.io server... to ${path}`);
    // adapt Next's net Server to http Server
    const httpServer: NetServerHttp = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
      cors: {
        origin: "http://localhost:3000",
      },
    });
    // append SocketIO server to Next.js socket server response
    res.socket.server.io = io;
  }
  NextResponse.json("connected server");
}

export { handler as GET, handler as POST };
