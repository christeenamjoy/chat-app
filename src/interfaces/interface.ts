
export interface ContextData {
  messages: Message[];
  lastMessageId : string;
  setMessages: (c: Message[]) => void;
}

export interface Message {
  messageId: string;
  text: string;
  datetime: string; // represented as ISO-8601 string
  userId: string;
  failed?: boolean;
}

export interface MessagesData {
  fetchMoreMessages: Message[];
  fetchLatestMessages: Message[];
}


export interface PostMessageData {
    postMessage: {
      messageId: string;
      text: string;
      datetime: string;
      userId: string;
    };
  }
  
  export interface PostMessageVariables {
    channelId: string;
    text: string;
    userId: string;
  }

 export type Channel = "General" | "Technology" | "LGTM";
