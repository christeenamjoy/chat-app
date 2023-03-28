import React, { useCallback, useEffect, useReducer } from "react";
import { useMutation } from "@apollo/client";
import { useGlobalContext } from "../utils/context";
import DisplayMessages from "./DisplayMessages";
import { POST_MESSAGES } from "../utils/queries";
import { buttonStyle, channels, getCurrentTime } from "../utils/helper";
import { SendIcon } from "../assets/icons";
import {
  Channel,
  PostMessageData,
  PostMessageVariables,
} from "../interfaces/interface";

const initialState = {
  text: "",
  channelId: "General",
  userId: "Russell",
};

const reducer = (state: any, action: { type: string; payload?: any }) => {
  switch (action.type) {
    case "setText":
      return { ...state, text: action.payload };
    case "setChannelId":
      return { ...state, channelId: action.payload };
    case "setUserId":
      return { ...state, userId: action.payload };
    case "reset":
      return initialState;
    default:
      return state;
  }
};

const Chat: React.FC = () => {
  const { messages, setMessages } = useGlobalContext();
  /*Use the useReducer hook to manage the component's state instead of the useState hook.
   *  This helps avoid inconsistencies that may arise when updating multiple states at once. */
  const [state, dispatch] = useReducer(reducer, initialState);

  const [
    postMessage,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation<PostMessageData, PostMessageVariables>(POST_MESSAGES);

  // Retrieve the message from localStorage when the component mounts
  useEffect(() => {
    const { channelId, userId, text } = JSON.parse(
      localStorage.getItem("message") || "{}"
    );
    if (!text) return;
    dispatch({ type: "setText", payload: text });
    dispatch({ type: "setChannelId", payload: channelId });
    dispatch({ type: "setUserId", payload: userId });
  }, []);

  useEffect(() => {
    localStorage.setItem("message", JSON.stringify({ ...state }));
  }, [state]);

  const handleUserChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch({ type: "setUserId", payload: event.target.value });
    },
    []
  );

  const onSend = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (state?.text?.trim().length === 0) return;

      postMessage({
        variables: { ...state },
      });
    },
    [postMessage, state]
  );

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch({ type: "setText", payload: e.target.value });
    },
    []
  );

  const handleChannelClick = useCallback((channel: Channel) => {
    dispatch({ type: "setChannelId", payload: channel });
  }, []);

  useEffect(() => {
    if (mutationError) {
      setMessages([
        ...messages,
        {
          text: state.text,
          messageId: Math.random().toString(),
          userId: state.userId,
          datetime: getCurrentTime(),
          failed: true,
        },
      ]);
    } else if (mutationData) {
      setMessages([
        ...messages,
        { ...mutationData.postMessage, userId: state.userId },
      ]);
      dispatch({ type: "setText", payload: "" });
    }
  }, [mutationData, mutationError]);

  return (
    <div
      className="md:grid md:grid-flow-col md:grid-cols-12 flex flex-wrap 
    bg-[#f4f5fb] p-2 md:mx-20 mx-10 my-5 h-full divide-x text-xs sm:text-sm xl:text-base"
    >
      <div className="md:col-span-4 lg:col-span-3 w-full p-4 ">
        <div>1. Choose Your user:</div>
        <select
          id="users"
          value={state.userId}
          onChange={handleUserChange}
          aria-label="select"
          className="w-full h-10 p-1 my-3"
          data-testid="select"
        >
          <option value="Russell">Russell</option>
          <option value="Sam">Sam</option>
          <option value="Joyse">Joyse</option>
        </select>
        <div className="my-4">2. Choose Your channel:</div>
        {channels.map((channel: Channel) => (
          <div
            key={channel}
            className={` p-4 cursor-pointer hover:bg-gray-200 ${
              channel === state.channelId ? "bg-white" : ""
            }`}
            onClick={() => handleChannelClick(channel)}
            data-testid="channel"
          >
            {channel} Channel
          </div>
        ))}
      </div>
      <div className="relative md:col-span-8 lg:col-span-9 p-4 w-full h-full">
        <div className="border-b pb-4 mb-4">{state.channelId} Channel</div>

        <DisplayMessages channelId={state.channelId} user={state.userId} />
        <form onSubmit={onSend} className="w-full">
          <textarea
            aria-label="text-area"
            rows={4}
            value={state.text}
            onChange={handleTextChange}
            className="w-full p-2 mb-2"
          />

          <button className={buttonStyle} disabled={!state.text}>
            Send Message<span>{SendIcon}</span>
          </button>
        </form>
        {mutationLoading && <div>Sending....</div>}
      </div>
    </div>
  );
};

export default Chat;
