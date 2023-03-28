import { memo } from "react";
import { ErrorIcon, SuccessIcon } from "../assets/icons";
import { Message } from "../interfaces/interface";
import { getLocalizedTime } from "../utils/helper";

const MessageItem = memo(
  ({ message, user }: { message: Message; user: string }) => {
    const { messageId, text, userId, datetime, failed } = message;
    const isUserMessage = userId === user;

    return (
      <div
        key={messageId}
        className={`flex m-5 ${
          isUserMessage ? "justify-items-end flex-row-reverse	" : "justify-start"
        }`}
      >
        <div className="grid place-items-center bg-gray-500 text-black rounded-full md:h-12 md:w-12 h-6 w-6 text-xs md:text-sm">
          {userId.slice(0, 2).toUpperCase()}
        </div>
        <div className="bg-white p-3 mr-4 ml-2 rounded-lg lg:max-w-3/4 max-w-1/2">
          <p>{text}</p>
        </div>
        {isUserMessage ? (
          <div className="w-5 flex items-center ml-1">
            {failed ? ErrorIcon : SuccessIcon}
          </div>
        ) : failed ? (
          <div className="w-5 flex items-center mr-1">
            {ErrorIcon}
          </div>
        ) : null}
        <p className="sm:text-sm text-xs flex items-center">
          {getLocalizedTime(datetime)}
        </p>
      </div>
    );
  }
);

export default MessageItem;
