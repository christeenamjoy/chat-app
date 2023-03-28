import { createContext, useContext } from "react";
import { ContextData } from "../interfaces/interface";

export const GlobalContext = createContext<ContextData>({
  messages: [],
  lastMessageId: '',
  setMessages: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);
