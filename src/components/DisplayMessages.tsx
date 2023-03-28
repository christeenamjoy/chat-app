import { useQuery } from "@apollo/client";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { DownArrow, Loader, UpArrow } from "../assets/icons";
import { Message, MessagesData } from "../interfaces/interface";
import MessageItem from "./MessageItem";
import { useGlobalContext } from "../utils/context";
import { buttonStyle, getSortedMessages } from "../utils/helper";
import { FETCH_LATEST_MESSAGES, FETCH_MORE_MESSAGES } from "../utils/queries";

const DisplayMessages = memo(
  ({ channelId, user }: { channelId: string; user: string }) => {
    const { messages, setMessages, lastMessageId } = useGlobalContext();
    const [moreMessageLoadError, setMoreMessageLoadError] =
      useState<string>("");
    const [moreMessageLoading, setMoreMessageLoading] =
      useState<boolean>(false);
    const [isOld, setIsOld] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesStartRef = useRef<HTMLDivElement>(null);

    const {
      loading: latestLoading,
      data: latestData,
      error: latestError,
      refetch: fetchLatestData,
    } = useQuery<MessagesData>(FETCH_LATEST_MESSAGES, {
      variables: { channelId },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    });

    const { refetch: fetchMoreData } = useQuery<MessagesData>(
      FETCH_MORE_MESSAGES,
      {
        variables: { channelId },
        skip: true, // skip initial query
      }
    );

    useEffect(() => {
      fetchLatestData();
    }, [channelId, fetchLatestData]);

    const scrollToMessage = (element: HTMLDivElement) => {
      element?.scrollIntoView({ behavior: "smooth" });
    };

    const getFetchMoreMessagesVariables = useCallback(
      (old: boolean) => {
        const messageId = old ? messages[0]?.messageId : lastMessageId;
        return { channelId, messageId, old };
      },
      [channelId, lastMessageId, messages]
    );

    const handleMoreMessages = useCallback(
      async (old: boolean) => {
        // since the failed messages doesn't have a valid message id API will fail, So preventing API call
        if (!old && parseFloat(lastMessageId) < 1) return;
        setIsOld(old);
        const variables = getFetchMoreMessagesVariables(old);
        setMoreMessageLoading(true);

        try {
          const { data: newMoreData } = await fetchMoreData(variables);

          if (newMoreData?.fetchMoreMessages) {
            const messageElement = old
              ? messagesStartRef?.current
              : messagesEndRef?.current;
            if (messageElement) scrollToMessage(messageElement);
            if (newMoreData?.fetchMoreMessages.length === 0) {
              setMoreMessageLoadError("No more messages available");
              setTimeout(() => {
                setMoreMessageLoadError("");
              }, 2000);
              return;
            }
            const sortedMessages = getSortedMessages([
              ...newMoreData?.fetchMoreMessages,
              ...messages,
            ]);
            setMessages(sortedMessages);
          }
        } catch (error) {
          setMoreMessageLoadError("An error occurred");
        } finally {
          setMoreMessageLoading(false);
        }
      },
      [fetchMoreData, getFetchMoreMessagesVariables, messages, setMessages]
    );

    const handleReadMoreOld = useCallback(() => {
      handleMoreMessages(true);
    }, [handleMoreMessages]);

    const handleReadMoreNew = useCallback(() => {
      handleMoreMessages(false);
    }, [handleMoreMessages]);

    useEffect(() => {
      if (latestData?.fetchLatestMessages) {
        const sortedMessages: Message[] = getSortedMessages([
          ...latestData?.fetchLatestMessages,
        ]);
        setMessages(sortedMessages);
      }
    }, [latestData, setMessages]);

    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [lastMessageId]);

    return (
      <>
        <button className={`${buttonStyle} mt-2`} onClick={handleReadMoreOld}>
          Read More
          <span>{isOld && moreMessageLoading ? Loader : UpArrow}</span>
        </button>
        {moreMessageLoadError && isOld && <div>{moreMessageLoadError}</div>}
        <div className="overflow-auto h-[55vh] my-5">
          {latestLoading && <p>Loading...</p>}
          {latestError && <p>Error : {latestError.message}</p>}
          <div ref={messagesStartRef} />
          {messages?.length > 0 ? (
            messages?.map((message: Message) => (
              <MessageItem
                message={message}
                user={user}
                key={message.messageId}
              />
            ))
          ) : !latestLoading ? (
            <div>No messages available</div>
          ) : (
            ""
          )}
          <div ref={messagesEndRef} />
        </div>
        {moreMessageLoadError && !isOld && <div>{moreMessageLoadError}</div>}
        <button className={`${buttonStyle} my-2`} onClick={handleReadMoreNew}>
          Read More
          <span> {!isOld && moreMessageLoading ? Loader : DownArrow}</span>
        </button>
      </>
    );
  }
);

export default DisplayMessages;
