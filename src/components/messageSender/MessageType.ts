export type MessageType = {
  messageId: string;
  messageBy: string;
  messageTo: string;
  messageText: string;
  messageTime: Date | number;
  messageType: "text" | "image" | "audio" | "video";
};
