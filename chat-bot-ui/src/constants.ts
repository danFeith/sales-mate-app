import { Message } from "./types";

export const initialMessages: Message[] = [
  { type: "assistant", text: "How can we help you today? 👋" },
  {
    type: "user",
    text: "Can you explain your shipping and return policy?",
    isButton: true,
  },
  {
    type: "user",
    text: "Help me find the perfect product for my needs",
    isButton: true,
  },
  {
    type: "user",
    text: "What sets your brand apart from others?",
    isButton: true,
  },
];
