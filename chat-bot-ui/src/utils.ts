import { Message } from "./types";

const CONVERSATION_SESSION_KEY = "conversation";

export const getSessionConversation = (): Message[] => {
  const conversationSessionString = sessionStorage.getItem(
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
    sessionStorage.setItem(
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
