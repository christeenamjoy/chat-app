import { useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import { Message } from "./interfaces/interface";
import { GlobalContext } from "./utils/context";

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const lastMessageId = messages?.slice(-1)[0]?.messageId;
  return (
    <GlobalContext.Provider value={{ messages, setMessages, lastMessageId }}>
      <Chat />
    </GlobalContext.Provider>
  );
}
