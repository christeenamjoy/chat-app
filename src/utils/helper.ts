import { Channel, Message } from "../interfaces/interface";

export const getLocalizedTime = (datetime: string): string => {
  const timestamp: number = Date.parse(datetime);
  const date: Date = new Date(timestamp);

  const localizedTime: string = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return localizedTime;
};

export const getCurrentTime = (): string => {
  return new Date().toISOString();
};

export const buttonStyle =
  "flex w-40 bg-[#17a2b8] p-2 text-white justify-between border-[#17a2b8] rounded-lg items-center";

export const channels: Channel[] = ["General", "Technology", "LGTM"];

export const  getSortedMessages = (messages: Message[]): Message[] => {
  return messages.sort(
    (m1, m2) => Date.parse(m1.datetime) - Date.parse(m2.datetime)
  );
};

