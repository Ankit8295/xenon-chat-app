export type MessageType = {
  messageId: string;
  messageBy: string;
  messageTo: string;
  messageText: string;
  messageTime: Date | number;
  messageType: "text" | "image" | "audio" | "video";
};

export type FriendsDb = {
  userName: string;
  friends: string[];
};
export type MessagesDb = {
  userName: string;
  messages: any;
};
export type UserDb = {
  emailId: string;
  userName: string;
  fullName: string;
  photo?: string;
  about?: string;
};
