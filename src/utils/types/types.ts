export type MessageType = {
  messageId: string;
  messageBy: string;
  messageTo: string;
  messageText: string;
  messageTime: Date | number;
  messageType: "text" | "image" | "audio" | "video";
};

export type MessagesDb = {
  userName: string;
  messages: {
    [userId: string]: {
      [messageId: string]: {};
    };
  };
};
export type UserDb = {
  emailId: string;
  userName: string;
  fullName: string;
  photo?: string;
  about?: string;
};
