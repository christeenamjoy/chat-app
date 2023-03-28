import { gql } from "@apollo/client";

export const FETCH_LATEST_MESSAGES = gql`
  query FetchLatestMessages($channelId: String!) {
    fetchLatestMessages(channelId: $channelId) {
      messageId
      text
      datetime
      userId
    }
  }
`;

export const POST_MESSAGES = gql`
  mutation ($channelId: String!, $text: String!, $userId: String!) {
    postMessage(channelId: $channelId, text: $text, userId: $userId) {
      datetime
      messageId
      text
    }
  }
`;

export const FETCH_MORE_MESSAGES = gql`
  query FetchMoreMessages($channelId: String!,
    $messageId: String!,
    $old: Boolean!) {
    fetchMoreMessages(channelId: $channelId ,messageId: $messageId,old:$old) {
      messageId
      text
      datetime
      userId
    }
  }
`;
