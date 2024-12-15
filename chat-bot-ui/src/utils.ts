import { Message } from "./types";
import { v4 as uuidv4 } from "uuid";

const CONVERSATION_SESSION_KEY = "conversation";
const CONVERSATION_SESSION_ID = "conv_id";

export const getSessionConversation = (): Message[] => {
  const conversationSessionString = localStorage.getItem(
    CONVERSATION_SESSION_KEY
  );
  try {
    if (!conversationSessionString) {
      return [];
    }
    return JSON.parse(conversationSessionString) as Message[];
  } catch (error: any) {
    console.error("error getting conversation from session storage", {
      error,
      conversationSessionString,
    });
    return [];
  }
};

export const addMessageToSessionConversation = (newMessage: Message) => {
  try {
    localStorage.setItem(
      CONVERSATION_SESSION_KEY,
      JSON.stringify([...getSessionConversation(), newMessage])
    );
  } catch (error: any) {
    console.error("error adding conversation to session storage", {
      error,
      newMessage,
    });
  }
};

export const resetConversationSessionHistory = () => {
  try {
    localStorage.setItem(CONVERSATION_SESSION_KEY, JSON.stringify([]));
  } catch (error: any) {
    console.error("error initiating conversation session storage", {
      error,
    });
  }
};

export const setSessionConversationId = (convId: number) => {
  try {
    localStorage.setItem(CONVERSATION_SESSION_ID, convId.toString());
  } catch (error: any) {
    console.error("Error setting conversation Id from session", { error });
  }
};

export const getSessionConversationId = () => {
  try {
    return Number(localStorage.getItem(CONVERSATION_SESSION_ID));
  } catch (error: any) {
    console.error("Error getting conversation Id from session", { error });
    return null;
  }
};

export const deleteSessionConversationId = () => {
  try {
    return Number(localStorage.removeItem(CONVERSATION_SESSION_ID));
  } catch (error: any) {
    console.error("Error deleting conversation Id from session", { error });
    return null;
  }
};

export const generateConversationId = () => {
  try {
    const uuid = uuidv4().replace(/[^0-9]/g, "");
    const numericId = BigInt(uuid) % 10n ** 15n;
    return Number(numericId);
  } catch (error: any) {
    console.error("Error generating conversation Id", { error });
    const timestamp = Date.now();
    const randomComponent = Math.floor(Math.random() * 10000);
    const conversationId = parseInt(`${timestamp}${randomComponent}`);
    return conversationId;
  }
};

export const initConversationId = () => {
  let convId = getSessionConversationId();
  if (!convId) {
    convId = generateConversationId();
    setSessionConversationId(convId);
  }
  return convId;
};
